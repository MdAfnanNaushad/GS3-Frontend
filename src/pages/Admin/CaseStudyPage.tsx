"use client";

import { useState } from "react";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"; // Reuse your HomePage grid

interface CaseStudy {
  id: string;
  title: string;
  liveLink: string;
  caseStudyLink: string;
  imageUrl: string;
}

const dummyData: CaseStudy[] = [
  {
    id: "1",
    title: "The Dawn of Innovation",
    liveLink: "https://live-demo.com",
    caseStudyLink: "https://case-study.com",
    imageUrl:
      "https://media.istockphoto.com/id/599965448/photo/silhouette-of-wind-turbine-morning-view-from-tamilnadu-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=Aiscw7XoHUhkcZAPpXUDIXAfjhh9vw6r_GL0cHtHVxI=", ///case_study_images/sample1.jpg
  },
  {
    id: "2",
    title: "The Joy of creation",
    liveLink: "https://live-app.com",
    caseStudyLink: "https://case-study.com",
    imageUrl:
      "https://images.unsplash.com/photo-1443916568596-df5a58c445e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGpveXxlbnwwfHwwfHx8MA%3D%3D", ///case_study_images/sample2.jpg
  },
];

const CaseStudyPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(dummyData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: "",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCaseStudy: CaseStudy = {
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      liveLink: formData.liveLink,
      caseStudyLink: formData.caseStudyLink,
      imageUrl: imagePreview || "/case_study_images/default.jpg",
    };

    if (formData.id) {
      // Edit mode
      setCaseStudies((prev) =>
        prev.map((cs) => (cs.id === formData.id ? newCaseStudy : cs))
      );
    } else {
      // Create mode
      setCaseStudies((prev) => [newCaseStudy, ...prev]);
    }

    // Reset
    setFormData({ id: "", title: "", liveLink: "", caseStudyLink: "" });
    setImagePreview(null);
  };

  const handleEdit = (cs: CaseStudy) => {
    setFormData({
      id: cs.id,
      title: cs.title,
      liveLink: cs.liveLink,
      caseStudyLink: cs.caseStudyLink,
    });
    setImagePreview(cs.imageUrl);
  };

  const handleDelete = (id: string) => {
    setCaseStudies((prev) => prev.filter((cs) => cs.id !== id));
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-20 py-16 bg-transparent text-white">
      <h1 className="text-3xl font-semibold lg:text-4xl tracking-widest font-orbitron text-start mb-6 text-border-white mt-12">
        Manage Case Studies
      </h1>

      {/* Form */}
      <div className="flex justify-center mb-20">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Title
            </Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Project Title"
            />
          </div>

          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Live Link
            </Label>
            <Input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleInputChange}
              placeholder="https://your-live-link.com"
            />
          </div>

          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Case Study Link
            </Label>
            <Input
              type="url"
              name="caseStudyLink"
              value={formData.caseStudyLink}
              onChange={handleInputChange}
              placeholder="https://case-study-link.com"
            />
          </div>

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
            {formData.id ? "Update Case Study" : "Save Case Study"}
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-start">
          Existing Case Studies
        </h2>

        <BentoGrid className="max-w-7xl px-4.5">
          {caseStudies.map((cs) => (
            <BentoGridItem
              key={cs.id}
              title={
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {cs.title}
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(cs)}
                      className="px-3 py-1 text-sm font-sans bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-200"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
                      className="px-3 py-1 text-sm font-sans bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              }
              imageUrl={cs.imageUrl}
              liveLink={cs.liveLink}
              caseStudyLink={cs.caseStudyLink}
              className="bg-black/30 border border-gray-700  rounded-md"
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default CaseStudyPage;
