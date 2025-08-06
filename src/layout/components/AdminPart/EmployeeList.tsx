"use client";

import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { X } from "lucide-react"; 

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


  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    withCredentials: true,
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/employees/all");
      if (res.data?.data) {
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


  const handleViewDetails = (id: string) => {
    const employee = employees.find((emp) => emp._id === id);
    if (employee) {
      setSelectedEmployee(employee);
    }
  };

  const closeModal = () => {
    setSelectedEmployee(null);
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
                  onClick={() => handleViewDetails(emp._id)}
                  className="text-sm px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-200 hover:text-gray-900 duration-500"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-gray-700 p-8 rounded-xl w-full max-w-md relative text-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <img
              src={selectedEmployee.image || "/team/default.png"}
              alt={selectedEmployee.username}
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-600 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedEmployee.username}</h2>
            <p className="text-gray-400">{selectedEmployee.email}</p>
            <p className="text-yellow-400 font-semibold mt-1">
              {selectedEmployee.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
