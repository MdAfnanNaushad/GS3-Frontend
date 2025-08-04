import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Folder,
  FileText,
  MessageCircle,
  CaseSensitive,
  UserCog,
  BrainCircuit,
  FileUser,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-muted font-semibold" : "";

  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4 dark:bg-zinc-950 hidden md:block h-screen sticky top-0">
      <div className="space-y-6">
        <div>
          <Link to="/">
          <h2 className="text-2xl font-semibold mb-2 px-2 flex items-center gap-2">
            <img
              className="h-8 w-8 object-contain"
              src="/logo/GS3_logo.png"
              alt="GS3 Logo"
            />
            GS3 Solution
          </h2>
          </Link>
        
          <div className="space-y-1">
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive(
                "/admin"
              )}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="w-full text-left px-3 py-2 font-medium text-sm hover:bg-muted rounded-md">
              Manage Sections
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              <Link
                to="/admin/employee"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/employees"
                )}`}
              >
                <Users size={16} />
                Employees
              </Link>
              <Link
                to="/admin/projects"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/projects"
                )}`}
              >
                <Folder size={16} />
                Projects
              </Link>
              <Link
                to="/admin/about"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/about"
                )}`}
              >
                <FileText size={16} />
                About Section
              </Link>
              <Link
                to="/admin/services"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/services"
                )}`}
              >
                <CaseSensitive size={16} />
                Services
              </Link>
              <Link
                to="/admin/case-studies"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/case-studies"
                )}`}
              >
                <Folder size={16} />
                Case Studies
              </Link>
              <Link
                to="/admin/contacts"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/contacts"
                )}`}
              >
                <MessageCircle size={16} />
                Contacts
              </Link>
              <Link
                to="/admin/team"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/team"
                )}`}
              >
                <FileUser size={16} />
                Team Member
              </Link>
              <Link
                to="/admin/ai-training"
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
                  "/admin/ai-training"
                )}`}
              >
                <BrainCircuit size={16} />
                AI Training
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <h2 className="text-sm text-muted-foreground px-2 mt-4">Account</h2>
          <Link
            to="/admin/active-employees"
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted ${isActive(
              "/admin/active-employees"
            )}`}
          >
            <UserCog size={16} />
            Status
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
