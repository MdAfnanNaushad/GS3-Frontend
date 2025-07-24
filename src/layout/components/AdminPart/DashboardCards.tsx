// src/components/DashboardCards.tsx
import {
  Users,
  Briefcase,
  MessageCircle,
  Wrench,
  Folder,
  BarChart,
} from "lucide-react";
import { Link } from "react-router-dom";
const cards = [
  {
    title: "Team Members",
    icon: Users,
    value: 12,
    bg: "bg-gradient-to-r from-blue-500 to-blue-700",
    link: "/admin/employees",
  },
  {
    title: "Clients Served",
    icon: Briefcase,
    value: 152,
    bg: "bg-gradient-to-r from-green-500 to-green-700",
    link: "/admin/clients",
  },
  {
    title: "Contacts Received",
    icon: MessageCircle,
    value: 78,
    bg: "bg-gradient-to-r from-rose-500 to-pink-600",
    link: "/admin/contacts",
  },
  {
    title: "Services Offered",
    icon: Wrench,
    value: 9,
    bg: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    link: "/admin/services",
  },
  {
    title: "Projects Ongoing",
    icon: Folder,
    value: 6,
    bg: "bg-gradient-to-r from-purple-500 to-purple-700",
    link: "/admin/projects",
  },
  {
    title: "Project Statistics",
    icon: BarChart,
    value: "--",
    bg: "bg-gradient-to-r from-gray-500 to-gray-700",
    link: "/admin/statistics",
  },
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-5 text-white flex flex-col justify-between shadow-lg ${card.bg}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-zinc-100">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
            </div>
            <card.icon size={32} className="opacity-90" />
          </div>

          {card.link && (
            <div className="mt-4 text-right">
              <Link
                to={card.link}
                className="text-xs px-3 py-1 rounded-md bg-white text-zinc-800 hover:bg-zinc-100 transition"
              >
                View
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
