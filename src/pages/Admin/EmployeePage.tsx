"use client";

import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios, { isAxiosError, type AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

type Employee = {
  _id: string;
  username: string;
  email: string;
  role: string;
  image?: string;
};

type FormData = {
  username: string;
  email: string;
  password?: string; // Password is now optional, only for creation
  role: string;
};

const EmployeePage = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees/all");
      setEmployees(res.data.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openEditModal = (employee: Employee) => {
    setEditingId(employee._id);
    setValue("username", employee.username);
    setValue("email", employee.email);
    setValue("role", employee.role);
    // Password is not pre-filled for security
    setValue("password", "");
    setImagePreview(employee.image || null);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingId(null);
    reset({ username: "", email: "", password: "", role: "" });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setError("");
    reset();
  };

  const onSubmit = async (data: FormData) => {
    setError("");
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("role", data.role);
    if (data.password) {
      formData.append("password", data.password);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Explicitly type the response variable to avoid the 'any' type.
      let response: AxiosResponse<{ data: Employee }>;

      if (editingId) {
        // Update existing employee
        response = await api.put(`/employees/update/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Update the list with the edited employee
        setEmployees(
          employees.map((emp) =>
            emp._id === editingId ? response.data.data : emp
          )
        );
      } else {
        // Create new employee
        if (!data.password) {
          setError("Password is required for new employees.");
          return;
        }
        response = await api.post("/employees/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Add the new employee to the top of the list
        setEmployees((prevEmployees) => [response.data.data, ...prevEmployees]);
      }
      closeModal();
    } catch (err) {
      if (isAxiosError(err)) {
        console.error("Error saving employee:", err);
        setError(err.response?.data?.message || "Failed to save employee.");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/delete/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-20 py-8 bg-transparent text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold lg:text-4xl tracking-widest font-orbitron text-border-white">
          Manage Employees
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-md"
        >
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="grid md:grid-cols-2 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="border border-gray-700 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-black/20"
          >
            <img
              src={emp.image || "/team/default.png"}
              alt={emp.username}
              className="w-24 h-24 rounded-full object-cover border border-gray-600"
            />
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h3 className="text-lg font-semibold">{emp.username}</h3>
              <p className="text-gray-300 text-sm">{emp.email}</p>
              <p className="text-gray-400 text-sm italic">{emp.role}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => openEditModal(emp)}
                className="text-sm px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(emp._id)}
                className="text-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black border-gray-500 border-2 p-8 rounded-xl w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 font-orbitron text-border-white tracking-widest">
              {editingId ? "Edit Employee" : "Add New Employee"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input {...register("username")} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input {...register("email")} required type="email" />
              </div>
              <div>
                <Label>Role</Label>
                <Input {...register("role")} required />
              </div>
              <div>
                <Label>
                  Password {editingId && "(Leave blank to keep unchanged)"}
                </Label>
                <Input {...register("password")} type="password" />
              </div>
              <div>
                <Label>Profile Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded-full"
                  />
                )}
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-gray-600 py-2 rounded-md font-semibold hover:bg-gray-200 hover:text-gray-900 duration-500"
              >
                {editingId ? "Update Employee" : "Save Employee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
