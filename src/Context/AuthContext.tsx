import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import axiosInstance from '@/API/axiosInstance'; // Assuming you have a central axios instance

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state to handle initial load

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // This request will succeed if the user has a valid httpOnly cookie
        await axiosInstance.get('/auth/verify-token');
        setIsAuthenticated(true);
      } catch (error) {
        // If the request fails (e.g., 401 Unauthorized), the user is not logged in
        console.log(error)
        setIsAuthenticated(false);
      } finally {
        // No matter the outcome, the initial check is done
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []); // The empty array ensures this runs only once when the app starts

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
        await axiosInstance.post('/auth/logout');
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        setIsAuthenticated(false);
    }
  };

  const value = { isAuthenticated, login, logout };

  // Render nothing until the initial authentication check is complete
  // This prevents the "flicker" to the login page on refresh
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
