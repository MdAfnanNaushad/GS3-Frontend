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

  // 3. New state to manage displaying both existing and preview images
  const [imageDisplayUrls, setImageDisplayUrls] = useState<
    Record<number, string[]>
  >({});

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    // This replaces existing images with the new previews for this item
    setImageDisplayUrls((prev) => ({ ...prev, [index]: urls }));
  };

  // 4. Refactored submit handler to manage both CREATE and UPDATE
  const onSubmitTimeline = async (data: { timeline: TimelineItem[] }) => {
    try {
      await Promise.all(
        data.timeline.map(async (item, index) => {
          const fieldId = timelineFields[index]?._id;
          const formData = new FormData();
          formData.append("year", item.year);
          formData.append("title", item.title);
          formData.append("description", item.description);

          // Check if new images have been uploaded for this item
          if (item.images instanceof FileList && item.images.length > 0) {
            Array.from(item.images).forEach((img) =>
              formData.append("images", img)
            );
          }

          if (fieldId) {
            // This is an EXISTING item, so we UPDATE it.
            await updateTimeline(fieldId, formData);
          } else {
            // This is a NEW item. It must have images.
            if (!(item.images instanceof FileList) || item.images.length === 0) {
              throw new Error(
                `Please add at least one image for the new timeline entry: "${item.title}"`
              );
            }
            await addTimeline(formData);
          }
        })
      );

      alert("Timeline saved successfully!");
      // Refetch data to get the latest state
      const { data: aboutData } = await fetchAbout();
      resetTimeline({ timeline: aboutData?.data?.timeline || [] });
      setImageDisplayUrls({}); // Clear all previews
    } catch (err) {
      const errorMessage =
        (isAxiosError(err) && err.response?.data?.message) ||
        (err as Error).message ||
        "An error occurred while saving.";
      alert(errorMessage);
      console.error("Error saving timeline:", err);
    }
  };

  const handleDeleteTimeline = async (mongoId: string, index: number) => {
    try {
      if (mongoId) {
        await deleteTimeline(mongoId);
        removeTimeline(index);
        alert("Timeline entry deleted!");
      } else {
        removeTimeline(index);
      }
      // Clean up the image display state
      setImageDisplayUrls((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    } catch (err) {
      console.error("Failed to delete timeline:", err);
      alert("Something went wrong while deleting timeline.");
    }
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

  // 5. Updated data loading to populate the image display state
  useEffect(() => {
    async function loadAbout() {
      try {
        const { data } = await fetchAbout();
        if (data.data) {
          resetStats({ stats: data.data.stats || [] });
          resetTimeline({ timeline: data.data.timeline || [] });

          // Populate the image display state with existing image URLs
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
      }
    }
    loadAbout();
  }, [resetStats, resetTimeline]);

  const onSubmitStats = (data: { stats: StatItem[] }) => {
    updateStats(data.stats)
      .then(() => alert("Stats updated Successfully"))
      .catch((err) => console.error("Failed to update Stats", err));
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
                Upload Images (required for new entries)
              </Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                {...registerTimeline(`timeline.${index}.images`)}
                onChange={(e) => handleImageChange(index, e.target.files)}
              />
              {/* 6. Simplified rendering logic for images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {imageDisplayUrls[index]?.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    className="rounded-lg w-full h-40 object-cover"
                    alt={`Preview ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
              onClick={() => handleDeleteTimeline(field._id ?? "", index)}
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
