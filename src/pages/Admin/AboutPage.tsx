"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/form";
import { useState } from "react";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  images: FileList | null;
};

export default function AboutPage() {
  const { register, control, handleSubmit } = useForm<{
    timeline: TimelineItem[];
  }>({
    defaultValues: {
      timeline: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeline",
  });

  const [previewUrls, setPreviewUrls] = useState<Record<number, string[]>>({});

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => ({ ...prev, [index]: urls }));
  };

  const onSubmit = (data: { timeline: TimelineItem[] }) => {
    console.log("Saved Timeline Data:", data);
  };

  return (
    <div className="w-full px-6 md:px-20 py-16 bg-transparent text-white min-h-screen">
      <h1 className="text-3xl font-semibold tracking-widest font-orbitron text-border-white mb-6 mt-12">
        Manage Timeline
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-700 rounded-lg p-6 space-y-4 bg-black/30"
          >
            <div>
              <Label className="text-xl block text-gray-300 mb-1">Year</Label>
              <Input
                placeholder="e.g., 2023"
                {...register(`timeline.${index}.year`, { required: true })}
              />
            </div>

            <div>
              <Label className="text-xl block text-gray-300 mb-1">Title</Label>
              <Input
                placeholder="e.g., Innovation Hub"
                {...register(`timeline.${index}.title`, { required: true })}
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
                {...register(`timeline.${index}.description`, {
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
                {...register(`timeline.${index}.images`)}
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
              onClick={() => remove(index)}
            >
              Delete Entry
            </button>
          </div>
        ))}

        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            onClick={() =>
              append({
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
    </div>
  );
}
