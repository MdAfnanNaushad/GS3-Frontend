import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/ui/sidebar";
import {Toaster} from 'react-hot-toast';
const AdminLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-6 bg-transparent">
       <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b', // A dark zinc color
            color: '#e4e4e7', // A light zinc color
            border: '1px solid #3f3f46',
          },
        }}
      />
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;