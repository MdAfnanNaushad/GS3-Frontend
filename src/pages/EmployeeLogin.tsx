import { AuthForm } from "@/layout/components/Auth/AuthForm";
import Layout from "@/layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      navigate("/");
      toast.success("Login Successful")
    } catch (err) {
      console.error("Employee login failed:", err);
      toast.error("Invalid credentials")
    }
  };

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            title=""
            onSubmit={handleSubmit}
            header={
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src="/logo/GS3_logo.png"
                  alt="GS3 Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-3xl font-semibold font-orbitron text-border-white tracking-widest">
                  Employee Login
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

