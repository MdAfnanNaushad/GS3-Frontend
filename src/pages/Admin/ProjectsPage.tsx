"use client";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id?: string;
  title: string;
  liveLink: string;
  caseStudyLink: string;
  imageUrl?: string;
  logoUrl?: string;
  isSelected?: boolean;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    liveLink: "",
    caseStudyLink: "",
    isSelected: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/work");
      setProjects(res.data.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  });

  const resetForm = () => {
    setFormData({
      title: "",
      liveLink: "",
      caseStudyLink: "",
      isSelected: false,
    });
    setImage(null);
    setLogo(null);
    setEditingId(null);
    (document.getElementById("image-input") as HTMLInputElement).value = "";
    (document.getElementById("logo-input") as HTMLInputElement).value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("liveLink", formData.liveLink);
    form.append("caseStudyLink", formData.caseStudyLink);
    form.append("isSelected", String(formData.isSelected));
    if (image) form.append("image", image);
    if (logo) form.append("logo", logo);

    try {
      if (editingId) {
        await api.put(`/work/${editingId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project updated successfully!");
      } else {
        await api.post("/work", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project created successfully!");
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An error occurred while saving the project.");
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      liveLink: project.liveLink || "",
      caseStudyLink: project.caseStudyLink || "",
      isSelected: project.isSelected || false,
    });
    setEditingId(project._id || null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    const userIsSure = confirm("Are you sure you want to delete this project?");
    if (userIsSure) {
      try {
        await api.delete(`/work/${id}`);
        alert("Project deleted successfully!");
        fetchProjects();
      } catch (error) {
        console.error("Failed to delete project:", error);
              alert("An error occurred while deleting the project.");

      }
    }
  };

  return (
    <div className="w-full px-6 py-5">
      <h1 className="text-4xl tracking-widest text-border-white font-orbitron mb-3">
        {editingId ? "Edit Project" : "Create Project"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border-gray-500 border-2 bg-black/20 p-6 rounded-lg"
      >
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label>Live Link</Label>
          <Input
            name="liveLink"
            value={formData.liveLink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Case Study Link</Label>
          <Input
            name="caseStudyLink"
            value={formData.caseStudyLink}
            onChange={(e) =>
              setFormData({ ...formData, caseStudyLink: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Project Image</Label>
          <Input
            id="image-input"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <Label>Company Logo (Optional)</Label>
          <Input
            id="logo-input"
            type="file"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Label>Show in "Selected Works"?</Label>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={formData.isSelected}
            onChange={() =>
              setFormData((prev) => ({ ...prev, isSelected: !prev.isSelected }))
            }
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-200 hover:text-gray-900  px-6 py-2 rounded-md duration-500 font-semibold"
          >
            {editingId ? "Update Project" : "Save Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-md font-semibold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-black/20 p-4 border border-gray-500 rounded-md"
          >
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{p.title}</h2>
              {p.logoUrl && (
                <img
                  src={p.logoUrl}
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />
              )}
            </div>
            <p>Selected: {p.isSelected ? "Yes" : "No"}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id!)}
                className="text-red-500 bg-red-950/50 px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
