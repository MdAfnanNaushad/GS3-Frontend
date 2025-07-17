import { Outlet } from "react-router-dom";
import {
  LogOut,
  UserPlus,
  Trash2,
  BarChart2,
  ClipboardList,
  Layers,
  Users,
  Mail,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";

const links = [
  { label: "Dashboard", href: "/admin", icon: <BarChart2 size={18} /> },
  {
    label: "Create Employee",
    href: "/admin/create-employee",
    icon: <UserPlus size={18} />,
  },
  {
    label: "Delete Employee",
    href: "/admin/delete-employee",
    icon: <Trash2 size={18} />,
  },
  {
    label: "Manage Timeline",
    href: "/admin/manage-timeline",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Manage Stats",
    href: "/admin/manage-stats",
    icon: <BarChart2 size={18} />,
  },
  {
    label: "View Contacts",
    href: "/admin/contacts",
    icon: <Layers size={18} />,
  },
];

const cards = [
  {
    title: "Team Members",
    image:
      "https://t4.ftcdn.net/jpg/01/78/08/57/240_F_178085721_ceP2CGi29yQDmdSUXoyFfhWvNprPC6Te.jpg",
    icon: <Users className="h-7 w-7 text-white" />,
    link: "/admin/employees",
  },
  {
    title: "Clients Served",
    image:
      "https://t4.ftcdn.net/jpg/12/71/27/03/240_F_1271270302_Ibu3OEpMDCXQHT7Yc32dTA317TzoXHA8.jpg",
    icon: <UserCheck className="h-7 w-7 text-white" />,
    link: "#",
  },
  {
    title: "Contacts Received",
    image:
      "https://t3.ftcdn.net/jpg/02/25/99/18/240_F_225991884_Zmd1KgpxFKw6GSit5Vd852KT7OwfVhNv.jpg",
    icon: <Mail className="h-7 w-7 text-white" />,
    link: "/admin/contacts",
  },
  {
    title: "Services Offered",
    image:
      "https://t4.ftcdn.net/jpg/03/03/49/75/240_F_303497515_ZHOwfTtuo5sYpAeoqWRZnkXZNZDKZeMz.jpg",
    icon: <Briefcase className="h-7 w-7 text-white" />,
    link: "/services",
  },
  {
    title: "Projects Ongoing",
    image:
      "https://t3.ftcdn.net/jpg/13/41/79/30/240_F_1341793017_flvtAXEE006h668uhLUJy8tA1TGMhwoP.jpg",
    icon: <Briefcase className="h-7 w-7 text-white" />,
    link: "/services",
  },
];

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-screen bg-transparent text-foreground mt-20">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-transparent">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Hello Admin 👍</h1>
          <button className="flex items-center gap-2 bg-white dark:bg-muted shadow px-4 py-2 rounded transition duration-300 hover:bg-red-500 text-white cursor-pointer hover:text-red-500 border border-red-500">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-md"
              style={{ minHeight: "14rem" }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-52 object-cover z-0"
              />
              <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-between p-5 z-10">
                <div className="flex justify-between items-center">
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {card.title}
                  </h2>
                  <a
                    href={card.link}
                    className="mt-3 inline-block text-sm bg-white text-black px-4 py-1 rounded font-medium"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Routed Page Content */}
        <Outlet />
      </main>
    </div>
  );
}
