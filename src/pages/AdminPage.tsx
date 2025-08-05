import DashboardCards from "../layout/components/AdminPart/DashboardCards";
import ProjectList from "@/layout/components/AdminPart/ProjectList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { LogOut } from "lucide-react";

const AdminPage = () => {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    await logout();
    navigate("/admin/login");
  }
  return (
    <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-semibold mb-4 font-orbitron tracking-widest text-border-white">Hello, Admin!</h1>

      <button onClick={handleLogout} className="flex items-center justify-end gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
        <LogOut size={18}/>
        Logout
      </button>
      </div>
      <DashboardCards />
      <ProjectList />
    </>
  );
};

export default AdminPage;