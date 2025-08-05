"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/API/axiosInstance";
import { isAxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Interfaces for our data structures
interface Service {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

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
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ServiceFormData>();

  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Data Fetching ---
  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get("/services");
      setServices(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Could not load services.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --- Form and CRUD Handlers ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  
  const resetForm = () => {
    reset();
    setEditingId(null);
    setPreview(null);
    setError("");
    setSuccess("");
  };

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
      if (editingId) {
        // Update existing service
        await axiosInstance.put(`/services/update/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Service updated successfully!");
      } else {
        // Create new service
        await axiosInstance.post("/services/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Service added successfully!");
      }
      resetForm();
      fetchServices(); // Refresh the list
    } catch (err) {
      const message = isAxiosError(err)
        ? err.response?.data?.message
        : "An unexpected error occurred.";
      setError(message || "Failed to save the service.");
      console.error("Error saving service:", err);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    // Use setValue from react-hook-form to populate fields
    setValue("title", service.title);
    setValue("description", service.description);
    setPreview(service.image || null); // Show existing image as preview
    setError("");
    setSuccess("");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/services/delete/${id}`);
      setSuccess("Service deleted successfully!");
      fetchServices();
    } catch (err) {
      const message = isAxiosError(err)
        ? err.response?.data?.message
        : "An unexpected error occurred.";
      setError(message || "Failed to delete the service.");
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-white py-4">
      <h1 className="text-4xl tracking-widest font-semibold mb-6 font-orbitron text-border-white">
        Manage Services
      </h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 border-gray-500 border-2 rounded-2xl mb-12">
        <h2 className="text-2xl font-semibold">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>
        <div className="grid w-full gap-2">
          <Label htmlFor="title">Service Title</Label>
          <Input id="title" type="text" placeholder="Enter service title" {...register("title", { required: "Title is required." })} />
          {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter service description" {...register("description", { required: "Description is required." })} />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid w-full gap-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" type="file" accept="image/*" {...register("image", { required: !editingId })} onChange={handleImageChange} />
          {errors.image && <p className="text-red-400 text-sm">An image is required for a new service.</p>}
        </div>

        {preview && (
          <div className="mt-4">
            <p className="mb-2">Image Preview:</p>
            <img src={preview} alt="Service preview" className="w-full max-h-64 object-contain border border-white/20 rounded" />
          </div>
        )}

        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="flex gap-4">
            <Button className="bg-gray-700 text-white hover:bg-gray-200 hover:text-gray-900 duration-500" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Service" : "Add Service")}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
        </div>
      </form>
      
      {/* Existing Services List */}
      <div>
        <h2 className="text-3xl font-orbitron tracking-widest text-border-white font-bold mb-6">
          Existing Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">{service.description}</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => handleEdit(service)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-md text-sm font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-semibold">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
