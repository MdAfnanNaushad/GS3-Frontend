// src/components/AdminLayout.tsx
 import { type ReactNode } from "react";
import Sidebar from "../../../components/ui/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
