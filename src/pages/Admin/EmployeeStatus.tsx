"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import axiosInstance from "@/API/axiosInstance"; 
interface Employee {
  _id: string;
  name: string;
  role: string;
  status: "Logged In" | "Logged Out";
  imageUrl?: string;
  lastSeen: string; 
}

const EmployeeStatus = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeStatuses = async () => {
    try {
      const res = await axiosInstance.get("/employees/statuses");
      if (res.data && Array.isArray(res.data.data)) {
        setEmployees(res.data.data);
      }
      setError(null); 
    } catch (err) {
      console.error("Failed to fetch employee statuses:", err);
      setError("Could not load employee statuses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchEmployeeStatuses();
    const intervalId = setInterval(() => {
      fetchEmployeeStatuses();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []); 
  if (loading) {
    return <div className="p-6 text-white text-center">Loading employee data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-orbitron tracking-widest text-white mb-6 text-border-white">
        Employee Login Status (Live)
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((emp) => (
          <Card
            key={emp._id}
            className={`flex items-center gap-4 p-4 transition-all duration-500 border ${
              emp.status === "Logged In"
                ? "border-green-500 bg-green-900/20 shadow-lg shadow-green-500/10"
                : "border-gray-700 bg-gray-900/20 opacity-60"
            }`}
          >
            <img
              src={emp.imageUrl || "/team/default.png"}
              alt={emp.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
            />
            <div>
              <h2 className="font-semibold text-white">{emp.name}</h2>
              <p className="text-sm text-gray-400">{emp.role}</p>
              <p
                className={`text-sm font-medium ${
                  emp.status === "Logged In" ? "text-green-400" : "text-gray-500"
                }`}
              >
                {emp.status}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeStatus;
