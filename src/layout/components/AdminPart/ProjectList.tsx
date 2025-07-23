// src/components/ProjectList.tsx
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // You’re using React Router

const projects = [
  {
    id: "1",
    name: "Dynamo Chess",
    status: "Ongoing",
    team: "Developers",
    startDate: "2024-11-01",
  },
  {
    id: "2",
    name: "Poster Generator",
    status: "Completed",
    team: " Devs",
    startDate: "2024-09-15",
  },
  {
    id: "3",
    name: "SEO Optimization",
    status: "Paused",
    team: "Marketing",
    startDate: "2025-01-10",
  },
  {
    id: "4",
    name: "GS# USA",
    status: "Ongoing",
    team: "FullStack Team",
    startDate: "2025-02-05",
  },
];

const statusColor = {
  Ongoing: "bg-blue-500 text-white",
  Completed: "bg-green-500 text-white",
  Paused: "bg-yellow-500 text-black",
};

const ProjectList = () => {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Project Ongoing</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-zinc-300">
          <thead className="bg-zinc-800 uppercase text-xs text-zinc-400">
            <tr>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, index) => (
              <tr
                key={index}
                className="border-b border-zinc-700 hover:bg-zinc-800 transition"
              >
                <td className="py-3 px-4">{proj.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs rounded-full font-medium",
                      statusColor[proj.status as keyof typeof statusColor]
                    )}
                  >
                    {proj.status}
                  </span>
                </td>
                <td className="py-3 px-4">{proj.team}</td>
                <td className="py-3 px-4">{proj.startDate}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <Link
                    to={`/admin/projects/view/${proj.id}`}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs px-3 py-1 rounded-md"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/projects/edit/${proj.id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-md"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
