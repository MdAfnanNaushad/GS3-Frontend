"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { isAxiosError } from "axios";
import {
  fetchAbout,
  updateStats,
  addTimeline,
  deleteTimeline,
  updateTimeline,
} from "@/API/aboutApi";
import toast from "react-hot-toast"; // 1. Import toast

type TimelineItem = {
  _id?: string;
  year: string;
  title: string;
  description: string;
  images: FileList | string[] | null;
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
  const {
    register: registerTimeline,
    control: controlTimeline,
    handleSubmit: handleSubmitTimeline,
    reset: resetTimeline,
    getValues,
  } = useForm<{ timeline: TimelineItem[] }>({
    defaultValues: { timeline: [] },
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({
    control: controlTimeline,
    name: "timeline",
  });

  const [imageDisplayUrls, setImageDisplayUrls] = useState<
    Record<number, string[]>
  >({});

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImageDisplayUrls((prev) => ({ ...prev, [index]: urls }));
  };

  const loadAboutData = async () => {
    try {
      const { data } = await fetchAbout();
      if (data.data) {
        resetStats({ stats: data.data.stats || [] });
        resetTimeline({ timeline: data.data.timeline || [] });

        const initialImageUrls: Record<number, string[]> = {};
        data.data.timeline.forEach((item: TimelineItem, index: number) => {
          if (item.images && Array.isArray(item.images)) {
            initialImageUrls[index] = item.images;
          }
        });
        setImageDisplayUrls(initialImageUrls);
      }
    } catch (err) {
      console.error("Failed to load About data", err);
      toast.error("Failed to load About page data.");
    }
  };

  const onSubmitTimeline = async (data: { timeline: TimelineItem[] }) => {
    try {
      await Promise.all(
        data.timeline.map(async (item, index) => {
          const fieldId = timelineFields[index]?._id;
          const formData = new FormData();
          formData.append("year", item.year);
          formData.append("title", item.title);
          formData.append("description", item.description);

          if (item.images instanceof FileList && item.images.length > 0) {
            Array.from(item.images).forEach((img) =>
              formData.append("images", img)
            );
          }

          if (fieldId) {
            await updateTimeline(fieldId, formData);
          } else {
            if (
              !(item.images instanceof FileList) ||
              item.images.length === 0
            ) {
              throw new Error(
                `Please add at least one image for the new timeline entry: "${item.title}"`
              );
            }
            await addTimeline(formData);
          }
        })
      );

      toast.success("Timeline saved successfully!"); // Replaced alert
      setEditingIndex(null);
      loadAboutData();
    } catch (err) {
      const errorMessage =
        (isAxiosError(err) && err.response?.data?.message) ||
        (err as Error).message ||
        "An error occurred while saving.";
      toast.error(errorMessage); // Replaced alert
      console.error("Error saving timeline:", err);
    }
  };

  const handleDeleteTimeline = async (mongoId: string, index: number) => {
    try {
      if (mongoId) {
        await deleteTimeline(mongoId);
        removeTimeline(index);
        toast.success("Timeline entry deleted!"); // Replaced alert
      } else {
        removeTimeline(index);
      }
      if (editingIndex === index) {
        setEditingIndex(null);
      }
      setImageDisplayUrls((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    } catch (err) {
      console.error("Failed to delete timeline:", err);
      toast.error("Something went wrong while deleting timeline."); // Replaced alert
    }
  };

  const handleCancelEdit = (index: number) => {
    const fieldId = timelineFields[index]?._id;
    if (!fieldId) {
      removeTimeline(index);
    }
    setEditingIndex(null);
  };

  const {
    register: registerStats,
    control: controlStats,
    handleSubmit: handleSubmitStats,
    reset: resetStats,
  } = useForm<{ stats: StatItem[] }>({
    defaultValues: { stats: defaultStats },
  });

  const {
    fields: statsFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({
    control: controlStats,
    name: "stats",
  });

  useEffect(() => {
    loadAboutData();
  }, [resetStats, resetTimeline]);

  const onSubmitStats = (data: { stats: StatItem[] }) => {
    updateStats(data.stats)
      .then(() => toast.success("Stats updated Successfully")) // Replaced alert
      .catch((err) => {
        toast.error("Failed to update stats."); // Added error toast
        console.error("Failed to update Stats", err);
      });
  };

  return (
    <div className="w-full md:px-20 py-8 bg-transparent text-white min-h-screen">
      <h1 className="text-4xl font-semibold tracking-widest font-orbitron text-border-white mb-6 ">
        Manage Timeline
      </h1>

      <form
        onSubmit={handleSubmitTimeline(onSubmitTimeline)}
        className="space-y-8 mb-16"
      >
        {timelineFields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-700 rounded-lg p-6 space-y-4 bg-black/30"
          >
            {editingIndex === index ? (
              // EDITING VIEW
              <>
                <div>
                  <Label className="text-xl block text-gray-300 mb-1">Year</Label>
                  <Input
                    placeholder="e.g., 2023"
                    {...registerTimeline(`timeline.${index}.year`, { required: true })}
                  />
                </div>
                <div>
                  <Label className="text-xl block text-gray-300 mb-1">Title</Label>
                  <Input
                    placeholder="e.g., Innovation Hub"
                    {...registerTimeline(`timeline.${index}.title`, { required: true })}
                  />
                </div>
                <div>
                  <Label className="text-xl block text-gray-300 mb-1">Description</Label>
                  <textarea
                    placeholder="Describe this milestone..."
                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white"
                    rows={4}
                    {...registerTimeline(`timeline.${index}.description`, { required: true })}
                  />
                </div>
                <div>
                  <Label className="text-xl block text-gray-300 mb-1">Upload Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    {...registerTimeline(`timeline.${index}.images`)}
                    onChange={(e) => handleImageChange(index, e.target.files)}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {imageDisplayUrls[index]?.map((url, i) => (
                      <img key={i} src={url} className="rounded-lg w-full h-40 object-cover" alt={`Preview ${i + 1}`} />
                    ))}
                  </div>
                </div>
                <button type="button" onClick={() => handleCancelEdit(index)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                  Cancel
                </button>
              </>
            ) : (
              // READ-ONLY VIEW
              <>
                <div>
                  <h3 className="text-xl font-bold">
                    {getValues(`timeline.${index}.title`)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {getValues(`timeline.${index}.year`)}
                  </p>
                </div>
                <p className="text-gray-300">
                  {getValues(`timeline.${index}.description`)}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {imageDisplayUrls[index]?.map((url, i) => (
                    <img key={i} src={url} className="rounded-lg w-full h-40 object-cover" alt={`Image ${i + 1}`} />
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="button" onClick={() => setEditingIndex(index)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold">
                        Edit
                    </button>
                    <button type="button" className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md" onClick={() => handleDeleteTimeline(field._id ?? "", index)}>
                        Delete Entry
                    </button>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-6 items-center justify-center mt-8">
          <button
            type="button"
            onClick={() => {
              appendTimeline({
                year: "",
                title: "",
                description: "",
                images: null,
              });
              setEditingIndex(timelineFields.length);
            }}
            className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-gray-200 transition"
          >
            + Add Timeline Entry
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Save All Changes
          </button>
        </div>
      </form>

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
