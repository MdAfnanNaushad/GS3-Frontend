import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/ui/sidebar";

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-6 bg-transparent">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;