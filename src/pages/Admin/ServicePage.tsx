"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  const onSubmit = async (data: ServiceFormData) => {
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await api.post("/services/addservices", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Service added successfully!");
      reset();
      setPreview(null);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Error adding service.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error(err);
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
    <div className="w-full max-w-5xl  text-white p-4">
      <h1 className="text-4xl tracking-widest font-semibold  mb-6 font-orbitron text-border-white">
        Add New Service
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid w-full gap-2 ">
          <Label htmlFor="title">Service Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter service title"
            {...register("title", { required: true })}
          />
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter service description"
            {...register("description", { required: true })}
          />
        </div>

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

        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Service"}
        </Button>
      </form>
    </div>
  );
};

export default ServicesPage;
