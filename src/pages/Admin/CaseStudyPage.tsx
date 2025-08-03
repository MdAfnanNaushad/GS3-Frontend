"use client";

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  _id: string;
  title: string;
}
interface CaseStudy {
  _id: string;
  title: string;
  workId?: { _id: string; title: string };
  heroImage?: string;
}
interface CaseStudyDetail {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

const CaseStudyPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(
    null
  );
  const [details, setDetails] = useState<CaseStudyDetail[]>([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    workId: "",
    title: "",
    tagline: "",
    description: "",
    team: "",
    result: "",
  });
  const [heroImage, setHeroImage] = useState<File | null>(null);

  const [detailForm, setDetailForm] = useState({ title: "", description: "" });
  const [detailImage, setDetailImage] = useState<File | null>(null);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
  });

  const fetchAllData = async () => {
    try {
      setError("");
      const projectsRes = await api.get("/work");
      setProjects(projectsRes.data.data);

      const caseStudiesRes = await api.get("/case-studies");
      setCaseStudies(caseStudiesRes.data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to fetch initial data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load data. You may need to log in again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedCaseStudyId) {
        try {
          const res = await api.get(
            `/case-studies/details/${selectedCaseStudyId}`
          );
          setDetails(res.data.data);
        } catch (err) {
          if (isAxiosError(err)) {
            console.error("Failed to fetch details:", err);
            setError("Could not load details for the selected case study.");
          }
        }
      }
    };
    fetchDetails();
  }, [selectedCaseStudyId]);

  const handleCreateCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("workId", form.workId);
    formData.append("title", form.title);
    formData.append("tagline", form.tagline);
    formData.append("description", form.description);
    formData.append(
      "team",
      JSON.stringify(form.team.split(",").map((s) => s.trim()))
    );
    formData.append("result", form.result);
    if (heroImage) formData.append("heroImage", heroImage);

    try {
      const res = await api.post("/case-studies/create", formData);
      setCaseStudies((prev) => [res.data.data, ...prev]);
      alert("Case study created successfully!");
      // Reset form
      setForm({
        workId: "",
        title: "",
        tagline: "",
        description: "",
        team: "",
        result: "",
      });
      setHeroImage(null);
      (document.querySelector('input[type="file"]') as HTMLInputElement).value =
        "";
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to create case study:", err);
        setError(err.response?.data?.message || "Could not create case study.");
      }
    }
  };

  const handleAddDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseStudyId) return;

    const formData = new FormData();
    formData.append("caseStudyId", selectedCaseStudyId);
    formData.append("title", detailForm.title);
    formData.append("description", detailForm.description);
    if (detailImage) formData.append("image", detailImage);

    try {
      const res = await api.post("/case-studies/detail/create", formData);
      setDetails((prevDetails) => [...prevDetails, res.data.data]);
       alert("Detail section added successfully!");
      setDetailForm({ title: "", description: "" });
      (
        document.getElementById("detail-image-input") as HTMLInputElement
      ).value = "";
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to add detail:", err);
        setError(
          err.response?.data?.message || "Could not add detail section."
        );
      }
    }
  };


  const handleDeleteDetail = async (detailId: string) => {

    try {
      await api.delete(`/case-studies/details/${detailId}`);
      setDetails((prevDetails) =>
        prevDetails.filter((d) => d._id !== detailId)
      );
      alert("Detail section deleted successfully!");
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to delete detail:", err);
        setError(
          err.response?.data?.message || "Could not delete detail section."
        );
      }
    }
  };


  const handleDeleteCaseStudy = async (caseStudyId: string) => {

    try {
      await api.delete(`/case-studies/${caseStudyId}`);

      setCaseStudies((prev) => prev.filter((cs) => cs._id !== caseStudyId));
      alert("Case study deleted successfully!");
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Failed to delete case study:", err);
        setError(err.response?.data?.message || "Could not delete case study.");
      }
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-orbitron tracking-widest text-border-white font-bold mb-6">
        Manage Case Studies
      </h1>

      {error && (
        <p className="text-red-500 bg-red-950/30 p-3 rounded-md mb-6">
          {error}
        </p>
      )}

      <div className=" p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Case Study</h2>
        <form onSubmit={handleCreateCaseStudy} className="space-y-4">
          <select
            value={form.workId}
            onChange={(e) => setForm({ ...form, workId: e.target.value })}
            required
            className="w-full p-2 rounded bg-gray-900 border-gray-600"
          >
            <option value="">Select a Project to Link</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          <Input
            placeholder="Case Study Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-gray-700 border-gray-600"
          />
          <Input
            placeholder="Tagline"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="bg-gray-700 border-gray-600"
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-gray-700 border-gray-600"
          />
          <Input
            placeholder="Team Roles (comma-separated)"
            value={form.team}
            onChange={(e) => setForm({ ...form, team: e.target.value })}
            className="bg-gray-700 border-gray-600"
          />
          <Textarea
            placeholder="Result"
            value={form.result}
            onChange={(e) => setForm({ ...form, result: e.target.value })}
            className="bg-gray-700 border-gray-600"
          />
          <div>
            <Label>Hero Image</Label>
            <Input
              type="file"
              onChange={(e) => setHeroImage(e.target.files?.[0] || null)}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-200 hover:text-gray-900 duration-500 px-4 py-2 rounded"
          >
            Create Case Study
          </button>
        </form>
      </div>

      <div className="border-gray-500 border-2 p-4 rounded-lg">
        <h2 className="text-3xl font-orbitron tracking-widest text-border-white font-semibold mb-4">
          Existing Case Studies
        </h2>
        {caseStudies.map((cs) => (
          <div
            key={cs._id}
            className="border-b border-gray-700 py-2 flex justify-between items-center"
          >
            <p>
              <strong>{cs.title}</strong>
              (Linked to:{" "}
              {cs.workId ? (
                cs.workId.title
              ) : (
                <span className="text-yellow-500">Unlinked Project</span>
              )}
              )
            </p>

            <div className="flex items-center gap-4">
              {!cs.workId && (
                <button
                  onClick={() => handleDeleteCaseStudy(cs._id)}
                  className="text-sm text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
              <button
                onClick={() =>
                  setSelectedCaseStudyId(
                    cs._id === selectedCaseStudyId ? null : cs._id
                  )
                }
                className="text-sm text-cyan-400"
              >
                {selectedCaseStudyId === cs._id
                  ? "Close Details"
                  : "Manage Details"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCaseStudyId && (
        <div className="mt-8 p-6 rounded-lg border border-gray-500">
          <h3 className="text-3xl font-orbitron text-border-white tracking-widest font-semibold mb-4 text-cyan-300">
            Managing Details for:{" "}
            {caseStudies.find((cs) => cs._id === selectedCaseStudyId)?.title}
          </h3>

          <div className="border-gray-500 border-2 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-3">
              Add New Detail Section
            </h4>
            <form onSubmit={handleAddDetail} className="space-y-4">
              <Input
                placeholder="Detail Title"
                value={detailForm.title}
                onChange={(e) =>
                  setDetailForm({ ...detailForm, title: e.target.value })
                }
                required
                className="bg-gray-700 border-gray-600"
              />
              <Textarea
                placeholder="Detail Description"
                value={detailForm.description}
                onChange={(e) =>
                  setDetailForm({ ...detailForm, description: e.target.value })
                }
                required
                className="bg-gray-700 border-gray-600"
              />
              <div>
                <Label>Detail Image</Label>
                <Input
                  id="detail-image-input"
                  type="file"
                  onChange={(e) => setDetailImage(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Add Detail
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Existing Details</h4>
            <div className="space-y-3">
              {details.length > 0 ? (
                details.map((detail) => (
                  <div
                    key={detail._id}
                    className="bg-gray-800 p-3 rounded flex justify-between items-center"
                  >
                    <p>{detail.title}</p>
                    <button
                      onClick={() => handleDeleteDetail(detail._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No details added yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyPage;