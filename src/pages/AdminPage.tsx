import DashboardCards from "../layout/components/AdminPart/DashboardCards";
import ProjectList from "@/layout/components/AdminPart/ProjectList";

const AdminPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Welcome back, Admin!</h1>
      <DashboardCards />
      <ProjectList />
    </>
  );
};

export default AdminPage;