import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  status: "Ongoing" | "Completed" | "Paused";
}

const statusColor = {
  Ongoing: "bg-blue-500 text-white",
  Completed: "bg-green-500 text-white",
  Paused: "bg-yellow-500 text-black",
};

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    withCredentials: true,
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/work");
      setProjects(res.data.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Could not load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  });

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const response = await api.post("/work", {
        title: newProjectName,
        status: "Ongoing",
      });
      setProjects([response.data.data, ...projects]);
      setNewProjectName("");
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add project:", err);
      setError("Could not add the project.");
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: Project["status"]
  ) => {
    setProjects(
      projects.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
    );

    try {
      await api.put(`/work/${id}`, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
      setError("Could not save status change.");

      fetchProjects();
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Are you sure you want to remove this project?")) return;

    try {
      await api.delete(`/work/${id}`);
      setProjects(projects.filter((p) => p._id !== id)); // Remove from list instantly
    } catch (err) {
      console.error("Failed to remove project:", err);
      setError("Could not remove the project.");
    }
  };

  return (
    <div className="border-gray-500 border-2 rounded-xl p-6 shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-white font-orbitron tracking-widest text-border-white">Project Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-md transition"
        >
          <PlusCircle size={16} />
          Add Project
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-zinc-300">
          <thead className="bg-zinc-800 uppercase text-xs text-zinc-400">
            <tr>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading projects...
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr
                  key={proj._id}
                  className="border-b border-zinc-700 hover:bg-zinc-800 transition"
                >
                  <td className="py-3 px-4 font-medium">{proj.title}</td>
                  <td className="py-3 px-4">
                    <select
                      value={proj.status}
                      onChange={(e) =>
                        handleStatusChange(
                          proj._id,
                          e.target.value as Project["status"]
                        )
                      }
                      className={cn(
                        "px-2 py-1 text-xs rounded-md font-medium border-none focus:ring-2 focus:ring-white/50",
                        statusColor[proj.status]
                      )}
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Paused">Paused</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRemove(proj._id)}
                      className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">
              Add a New Project
            </h3>
            <form onSubmit={handleAddProject}>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-200 duration-500 text-white hover:text-gray-900 font-semibold py-2 rounded-md"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
