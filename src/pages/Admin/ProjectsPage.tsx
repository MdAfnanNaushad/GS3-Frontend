"use client";

import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  liveLink: string;
  caseStudyLink: string;
  imageUrl: string;
}

const dummyProjects: Project[] = [
  {
    id: "1",
    title: "The Dawn Of Innovation",
    liveLink: "https://chatbot.com",
    caseStudyLink: "https://case-study.com/chatbot",
    imageUrl: "/project/default.png",
  },
  {
    id: "2",
    title: "The Joy of Creation",
    liveLink: "https://ecommerce.com",
    caseStudyLink: "https://case-study.com/ecommerce",
    imageUrl: "/project/default.png",
  },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    liveLink: "",
    caseStudyLink: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === editingId
            ? {
                ...proj,
                ...formData,
                imageUrl: imagePreview || proj.imageUrl,
              }
            : proj
        )
      );
      setEditingId(null);
    } else {
      setProjects((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...formData,
          imageUrl: imagePreview || "/project/default.png",
        },
      ]);
    }

    // Reset form
    setFormData({ title: "", liveLink: "", caseStudyLink: "" });
    setImagePreview(null);
  };

  const handleEdit = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (proj) {
      setEditingId(proj.id);
      setFormData({
        title: proj.title,
        liveLink: proj.liveLink,
        caseStudyLink: proj.caseStudyLink,
      });
      setImagePreview(proj.imageUrl);
    }
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-20 py-8 bg-transparent text-white">
      <h1 className="text-3xl font-semibold lg:text-4xl  tracking-widest font-orbitron text-start mb-6 text-border-white">
        Manage Projects
      </h1>

      {/* Form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-8"
          autoComplete="off"
        >
          {/* Title */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Title
            </Label>
            <Input
              name="title"
              type="text"
              placeholder="Enter Project Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Live Link */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Live Link
            </Label>
            <Input
              name="liveLink"
              type="url"
              placeholder="https://your-live-link.com"
              value={formData.liveLink}
              onChange={handleInputChange}
            />
          </div>

          {/* Case Study Link */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Case Study Link
            </Label>
            <Input
              name="caseStudyLink"
              type="url"
              placeholder="https://case-study-link.com"
              value={formData.caseStudyLink}
              onChange={handleInputChange}
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Project Image
            </Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-md border border-gray-600"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-300 w-full"
          >
            {editingId ? "Update Project" : "Save Project"}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-start">
          Existing Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group bg-black/30 border border-gray-700 rounded-xl overflow-hidden p-4 flex flex-col justify-between"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="rounded-md object-cover w-full h-40 mb-4 border border-gray-600"
              />
              <h3 className="text-lg font-bold mb-1">{project.title}</h3>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 underline"
              >
                Live Site
              </a>
              <a
                href={project.caseStudyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-400 underline"
              >
                Case Study
              </a>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
