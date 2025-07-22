import { Outlet } from "react-router-dom";
import {
  LogOut,
  UserPlus,
  BarChart2,
  ClipboardList,
  Layers,
  Users,
  Mail,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Plus,
  BookMarked,
} from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";

const links = [
  { label: "Employee", href: "/admin/employee", icon: <UserPlus size={18} /> },
  { label: "Projects", href: "/admin/projects", icon: <Plus size={18} /> },
  {
    label: "About Section",
    href: "/admin/About",
    icon: <ClipboardList size={18} />,
  },
  {
    label: "Manage Services",
    href: "/admin/services",
    icon: <BarChart2 size={18} />,
  },
  {
    label: "Contacts Recieved",
    href: "/admin/contacts",
    icon: <Layers size={18} />,
  },
  { label: "Logged In", href: "/admin/view", icon: <Plus size={18} /> },
  {
    label: "Add Case Studies",
    href: "/admin/add-case-studies",
    icon: <BookMarked size={18} />,
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
    <div className="flex min-h-screen w-screen bg-background text-foreground mt-16">
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
      <main className="flex-1 p-6 bg-background text-foreground">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-green-500" size={24} />
            Hello Admin
          </h1>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Card Grid */}
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-lg bg-muted dark:bg-muted/50"
              style={{ minHeight: "20rem" }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-60 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-between">
                <div className="flex justify-start">{card.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {card.title}
                  </h2>
                  <a
                    href={card.link}
                    className="mt-4 inline-block text-base bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Routed Page Content */}
        <div className="mt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
