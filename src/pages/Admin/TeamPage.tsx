"use client";

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  github?: string;
  linkedin?: string;
}

export default function TeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    github: "",
    linkedin: "",
    image: null as File | null,
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  const fetchTeam = async () => {
    try {
      const res = await api.get("/team/all");
      setTeamMembers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching team:", err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.bio) {
      return alert("Please fill all required fields");
    }

    const data = new FormData();
    // Safely append form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/team/update/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/team/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({
        name: "",
        position: "",
        bio: "",
        github: "",
        linkedin: "",
        image: null,
      });
      setEditingId(null);
      fetchTeam();
    } catch (err) {
      // 3. Use the 'isAxiosError' type guard for safer error handling
      if (isAxiosError(err)) {
        console.error(
          "Error saving member:",
          err.response?.data || err.message
        );
        alert(err.response?.data?.message || "An error occurred.");
      } else {
        console.error("An unexpected error occurred:", err);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      github: member.github || "",
      linkedin: member.linkedin || "",
      image: null,
    });
    setEditingId(member._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await api.delete(`/team/delete/${id}`);
      fetchTeam();
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(
          "Error deleting member:",
          err.response?.data || err.message
        );
        alert(err.response?.data?.message || "Could not delete member.");
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-orbitron tracking-widest text-border-white font-semibold mb-4">
        {editingId ? "Edit Team Member" : "Add Team Member"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-00 p-6 rounded-lg border-gray-500 border-2"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded text-white"
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImage}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-600 hover:bg-white hover:text-gray-800 duration-500 px-4 py-2 rounded col-span-2"
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Adding..."
            : editingId
            ? "Update Member"
            : "Add Member"}
        </button>
      </form>

      <h2 className=" font-orbitron tracking-widest text-3xl text-border-white font-semibold mt-8 mb-4">Existing Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member._id} className="border-gray-400 border-2 p-4 rounded-xl shadow">
            <img
              src={member.image || "/team/default.png"}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border border-gray-600"
            />
            <h3 className="text-center text-lg font-medium">{member.name}</h3>
            <p className="text-center text-sm text-gray-400">
              {member.position}
            </p>
            <p className="text-xs text-gray-300 mt-2">{member.bio}</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleEdit(member)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-sm rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
