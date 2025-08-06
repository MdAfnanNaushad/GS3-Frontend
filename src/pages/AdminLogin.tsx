import { AuthForm } from "@/layout/components/Auth/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios"; 
import Layout from "@/layout/Layout";

import axiosInstance from "@/API/axiosInstance"; 
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {

      await axiosInstance.post("/auth/login", { email, password });
      toast.success("LogIn Successful Welcome Back Admin")
      login();
      navigate("/admin");
    } catch (err) {
      if (isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          "Invalid admin credentials or server error.";
        setError(errorMessage);
        console.error("Admin login failed:", err.response?.data || err.message);
        toast.error("Invalid credentials")
      } else {
        setError("An unexpected error occurred.");
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm
            title=""
            onSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            header={
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src="/logo/GS3_logo.png"
                  alt="GS3 Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-3xl font-semibold font-orbitron text-border-white tracking-widest">
                  Admin Login
                </span>
              </div>
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;