"use client";

import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
}

const dummyEmployees: Employee[] = [
  {
    id: "1",
    name: "Md Afnan Naushad",
    email: "afnan@example.com",
    role: "Developer",
    imageUrl: "/team/default.png",
  },
  {
    id: "2",
    name: "Sudip Tinga",
    email: "sudip@example.com",
    role: "Full Stack Developer",
    imageUrl: "/team/default.png",
  },
];

const EmployeePage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (id: string) => {
    alert(`Edit employee with id: ${id}`);
    // You can populate the form for editing here
  };

  return (
    <div className="w-full min-h-screen px-6 md:px-20 py-16 bg-transparent text-white">
      <h1 className="text-3xl font-semibold lg:text-4xl tracking-widest font-orbitron text-start mt-12 mb-6 text-border-white">
        Manage Employees
      </h1>

      {/* Form */}
      <div className="flex justify-center">
        <form className="w-full max-w-lg space-y-8">
          {/* Name */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Name
            </Label>
            <Input type="text" placeholder="Enter Employee Name" />
          </div>

          {/* Email */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Email
            </Label>
            <Input type="email" placeholder="Enter Employee Email" />
          </div>

          {/* Role */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Role
            </Label>
            <Input type="text" placeholder="Enter Role (e.g. Developer)" />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-xl text-gray-300 font-sans mb-2 block">
              Profile Image
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
            Save Employee
          </button>
        </form>
      </div>

      {/* Employee List */}
      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-start">
          Existing Employees
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="border border-gray-700 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-black/20"
            >
              <img
                src={emp.imageUrl}
                alt={emp.name}
                className="w-24 h-24 rounded-full object-cover border border-gray-600"
              />
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="text-lg font-semibold">{emp.name}</h3>
                <p className="text-gray-300 text-sm">{emp.email}</p>
                <p className="text-gray-400 text-sm italic">{emp.role}</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(emp.id)}
                  className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="text-sm px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
