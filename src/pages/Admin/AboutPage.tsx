"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/form";
import { useState, useEffect } from "react";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  images: FileList | null;
};

type StatItem = {
  label: string;
  value: string;
};

const defaultStats = [
  { label: "Clients Satisfied", value: "350+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Years of Mastery", value: "15+" },
  { label: "Team Members", value: "25+" },
];

export default function AboutPage() {
  // Timeline form
  const {
    register: registerTimeline,
    control: controlTimeline,
    handleSubmit: handleSubmitTimeline,
    reset: resetTimeline,
  } = useForm<{ timeline: TimelineItem[] }>({
    defaultValues: {
      timeline: [],
    },
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({
    control: controlTimeline,
    name: "timeline",
  });

  const [previewUrls, setPreviewUrls] = useState<Record<number, string[]>>({});

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => ({ ...prev, [index]: urls }));
  };

  const onSubmitTimeline = (data: { timeline: TimelineItem[] }) => {
    // Save timeline to localStorage or backend as needed
    localStorage.setItem("gs3_timeline", JSON.stringify(data.timeline));
    alert("Timeline saved!");
  };

  // Stats form
  const {
    register: registerStats,
    control: controlStats,
    handleSubmit: handleSubmitStats,
    reset: resetStats,
  } = useForm<{ stats: StatItem[] }>({
    defaultValues: {
      stats: defaultStats,
    },
  });

  const {
    fields: statsFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({
    control: controlStats,
    name: "stats",
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("gs3_stats");
    if (savedStats) resetStats({ stats: JSON.parse(savedStats) });

    const savedTimeline = localStorage.getItem("gs3_timeline");
    if (savedTimeline) resetTimeline({ timeline: JSON.parse(savedTimeline) });
  }, [resetStats, resetTimeline]);

  const onSubmitStats = (data: { stats: StatItem[] }) => {
    localStorage.setItem("gs3_stats", JSON.stringify(data.stats));
    alert("Stats saved!");
  };

  return (
    <div className="w-full px-6 md:px-20 py-16 bg-transparent text-white min-h-screen">
      <h1 className="text-5xl font-semibold tracking-widest font-orbitron text-border-white mb-6 ">
        Manage Timeline
      </h1>

      {/* Timeline Form */}
      <form
        onSubmit={handleSubmitTimeline(onSubmitTimeline)}
        className="space-y-8 mb-16"
      >
        {timelineFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-700 rounded-lg p-6 space-y-4 bg-black/30"
          >
            <div>
              <Label className="text-xl block text-gray-300 mb-1">Year</Label>
              <Input
                placeholder="e.g., 2023"
                {...registerTimeline(`timeline.${index}.year`, {
                  required: true,
                })}
              />
            </div>

            <div>
              <Label className="text-xl block text-gray-300 mb-1">Title</Label>
              <Input
                placeholder="e.g., Innovation Hub"
                {...registerTimeline(`timeline.${index}.title`, {
                  required: true,
                })}
              />
            </div>

            <div>
              <Label className="text-xl block text-gray-300 mb-1">
                Description
              </Label>
              <textarea
                placeholder="Describe this milestone..."
                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white"
                rows={4}
                {...registerTimeline(`timeline.${index}.description`, {
                  required: true,
                })}
              />
            </div>

            <div>
              <Label className="text-xl block text-gray-300 mb-1">
                Upload Images (optional, max 2)
              </Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                {...registerTimeline(`timeline.${index}.images`)}
                onChange={(e) => handleImageChange(index, e.target.files)}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {previewUrls[index]?.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    className="rounded-lg w-full h-40 object-cover"
                    alt="Preview"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
              onClick={() => removeTimeline(index)}
            >
              Delete Entry
            </button>
          </div>
        ))}

        <div className="flex flex-wrap gap-6 items-center justify-center mt-8">
          <button
            type="button"
            onClick={() =>
              appendTimeline({
                year: "",
                title: "",
                description: "",
                images: null,
              })
            }
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-gray-200 transition"
          >
            + Add Timeline Entry
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Save Timeline
          </button>
        </div>
      </form>

      {/* Stats Form */}
      <h2 className="text-4xl font-semibold tracking-widest font-orbitron text-border-white mb-6">
        Manage Stats
      </h2>
      <form onSubmit={handleSubmitStats(onSubmitStats)} className="space-y-8">
        <div className="space-y-4">
          {statsFields.map((field, idx) => (
            <div key={field.id} className="flex items-center gap-4">
              <Input
                placeholder="Stat Label"
                {...registerStats(`stats.${idx}.label`, { required: true })}
                className="flex-1"
              />
              <Input
                placeholder="Value"
                {...registerStats(`stats.${idx}.value`, { required: true })}
                className="w-32"
              />
              <button
                type="button"
                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-md"
                onClick={() => removeStat(idx)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 items-center justify-center mt-8">
          <button
            type="button"
            onClick={() => appendStat({ label: "", value: "" })}
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-gray-200 transition"
          >
            + Add Stat
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Save Stats
          </button>
        </div>
      </form>
    </div>
  );
}
