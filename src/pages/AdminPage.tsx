import DashboardCards from "../layout/components/AdminPart/DashboardCards";
import ProjectList from "@/layout/components/AdminPart/ProjectList";

const AdminPage = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4 font-orbitron tracking-widest text-border-white">Hello, Admin!</h1>
      <DashboardCards />
      <ProjectList />
    </>
  );
};

export default AdminPage;