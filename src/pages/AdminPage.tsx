// src/pages/AdminDashboard.tsx
import AdminLayout from "../layout/components/AdminPart/AdminLayout";
import DashboardCards from "../layout/components/AdminPart/DashboardCards";
import ProjectList from "@/layout/components/AdminPart/ProjectList";


const AdminPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">Welcome back, Admin!</h1>
      <DashboardCards />
      {/* We’ll add the dashboard cards and project list next */}
      <ProjectList/>
    </AdminLayout>
  );
};

export default AdminPage;
