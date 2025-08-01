"use client";

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

interface Employee {
  _id: string;
  username: string;
  email: string;
  image?: string; 
  role: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    withCredentials: true,
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/employees/all");
      if (res.data?.data) {
        console.log("Fetched employees for list page:", res.data.data); 
        setEmployees(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load employees.");
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/delete/${id}`);

      setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Failed to delete employee.");
    }
  };

  const handleEdit = (id: string) => {
 ;
    alert("Handle edit logic here for employee ID: " + id);
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl tracking-widest font-semibold font-orbitron text-border-white mb-6">
        Team Members
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="border border-gray-700 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 bg-black/20"
            >
              <img
  
                src={emp.image || "/employee_images/default.png"}
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
                  onClick={() => handleEdit(emp._id)}
                  className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-300"
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
      )}
    </div>
  );
};

export default EmployeeList;
