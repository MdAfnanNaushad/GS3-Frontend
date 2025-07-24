"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ServiceFormData {
  title: string;
  description: string;
  image: FileList;
}

const ServicesPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ServiceFormData>();

  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: ServiceFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Service added successfully.");
        reset();
        setPreview(null);
      } else {
        alert(result.message || "Error adding service.");
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto text-white">
      <h1 className="text-5xl tracking-widest font-semibold mt-6 mb-6 font-orbitron text-border-white">Add New Service</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="grid w-full gap-2">
          <Label htmlFor="title">Service Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter service title"
            {...register("title", { required: true })}
          />
        </div>

        {/* Description */}
        <div className="grid w-full gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter service description"
            {...register("description", { required: true })}
          />
        </div>

        {/* Image Upload */}
        <div className="grid w-full gap-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImageChange}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="mb-2">Preview:</p>
            <img
              src={preview}
              alt="Service preview"
              className="w-full max-h-64 object-contain border border-white/20 rounded"
            />
          </div>
        )}

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Service"}
        </Button>
      </form>
    </div>
  );
};

export default ServicesPage;
