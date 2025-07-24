

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  imageUrl: string;
}

const dummyEmployees: Employee[] = [
  {
   id:"1",
    name: "Md Afnan Naushad",
    email: "afnan@example.com",
    role: "Developer",
    imageUrl: "/team/default.png",
  },
  {
    id:"2",
    name: "Sudip Tinga",
    email: "sudip@example.com",
    role: "Full Stack Developer",
    imageUrl: "/team/default.png",
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);


  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (id: string) => {
    alert(`Edit employee with id: ${id}`);
    // You can populate the form for editing here
  };
  useEffect(() => {
    // Later: fetch from backend
    setEmployees(dummyEmployees);
  }, []);

  return (
    <div className="p-6 text-white  min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl tracking-widest font-semibold font-orbitron text-border-white mb-6">Team Members</h1>
      </div>

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

  );
};

export default EmployeeList;
