import { AuthForm } from "@/layout/components/Auth/AuthForm";
import Layout from "@/layout/Layout";

const AdminLogin = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin login logic here
  };

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <AuthForm
            title=""
            onSubmit={handleSubmit}
            header={
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src="/logo/GS3_logo.png"
                  alt="GS3 Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-3xl font-semibold font-orbitron text-border-white tracking-widest">Employee Login</span>
              </div>
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;

//to login hit baseurl/employee/login