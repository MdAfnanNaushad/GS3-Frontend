// src/components/DashboardCards.tsx
import {
  Users,
  Briefcase,
  MessageCircle,
  Wrench,
  Folder,
  BarChart,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Define a type for the card structure
interface CardData {
  title: string;
  icon: LucideIcon;
  bg: string;
  link: string;
  // This will be a key to look up the dynamic value from our state
  valueKey: keyof StatsData;
}

// Define a type for our dynamic stats state
interface StatsData {
  team: number | string;
  clients: number | string;
  contacts: number | string;
  services: number | string;
  projects: number | string;
  statistics: number | string;
}

// Keep the static part of the card data outside the component
const cardDefinitions: CardData[] = [
  {
    title: "Team Members",
    icon: Users,
    valueKey: "team",
    bg: "bg-gradient-to-r from-blue-500 to-blue-700",
    link: "/admin/employees",
  },
  {
    title: "Clients Served",
    icon: Briefcase,
    valueKey: "clients",
    bg: "bg-gradient-to-r from-green-500 to-green-700",
    link: "/admin/clients",
  },
  {
    title: "Contacts Received",
    icon: MessageCircle,
    valueKey: "contacts",
    bg: "bg-gradient-to-r from-rose-500 to-pink-600",
    link: "/admin/contacts",
  },
  {
    title: "Services Offered",
    icon: Wrench,
    valueKey: "services",
    bg: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    link: "/admin/services-offered",
  },
  {
    title: "Projects",
    icon: Folder,
    valueKey: "projects",
    bg: "bg-gradient-to-r from-purple-500 to-purple-700",
    link: "/admin/projects",
  },
  {
    title: "Project Statistics",
    icon: BarChart,
    valueKey: "statistics",
    bg: "bg-gradient-to-r from-gray-500 to-gray-700",
    link: "/admin/statistics",
  },
];

const DashboardCards = () => {
  // State to hold the dynamic counts
  const [stats, setStats] = useState<StatsData>({
    team: 0,
    clients: "0+",
    contacts: 0,
    services: 0,
    projects: 0,
    statistics: "--",
  });
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data points in parallel for better performance
        const [employeeRes, contactRes, serviceRes, projectRes, aboutRes] =
          await Promise.all([
            api.get("/employees/all"),
            api.get("/contact"),
            api.get("/services"),
            api.get("/work"),
            api.get("/about"),
          ]);

        // Find the "Clients Served" value from the about data stats array
        const clientsStat = aboutRes.data.data?.stats?.find(
          (stat: { label: string; value: string }) =>
            stat.label === "Clients Served"
        );

        // Update the state with the fetched data
        setStats({
          team: employeeRes.data.data?.length || 0,
          clients: clientsStat?.value || "0+",
          contacts: contactRes.data.data?.length || 0,
          services: serviceRes.data.data?.length || 0,
          projects: projectRes.data.data?.length || 0,
          statistics: "--",
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {cardDefinitions.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-5 text-white flex flex-col justify-between shadow-lg ${card.bg}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-zinc-100">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1">
                {/* Display a loading indicator or the fetched value */}
                {loading ? "..." : stats[card.valueKey]}
              </h3>
            </div>
            <card.icon size={32} className="opacity-90" />
          </div>

          {card.link && (
            <div className="mt-4 text-right">
              <Link
                to={card.link}
                className=" px-3 py-1 rounded-md bg-white text-zinc-800 hover:bg-gray-600 hover:text-gray-200 transition duration-500"
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
