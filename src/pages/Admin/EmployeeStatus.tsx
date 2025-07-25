import { Card } from "@/components/ui/Card";

const employees = [
  {
    _id: 1,
    name: "Afnan Naushad",
    role: "Frontend Developer",
    status: "Logged In",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  },
  {
    _id: 2,
    name: "Su Jay Sharma",
    role: "Backend Developer",
    status: "Logged Out",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  },
  {
    _id: 3,
    name: "Ravi Kumar",
    role: "Project Manager",
    status: "Logged In",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  },
  {
    _id: 4,
    name: "Sudip Tunga",
    role: "Full stack Developer",
    status: "Logged Out",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  },
  {
    _id: 5,
    name: "Ayan Kumar",
    role: "QA Engineer",
    status: "Logged In",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
  },
];

const EmployeeStatus = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-orbitron tracking-widest text-white mb-6 text-border-white">
        Employee Login Status
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((emp) => (
          <Card
            key={emp._id}
            className={`flex items-center gap-4 p-4 transition-colors duration-300 border ${
              emp.status === "Logged In"
                ? "border-green-500 bg-green-50/10"
                : "border-red-500 bg-red-50/10"
            }`}
          >
            <img
              src={emp.imageUrl || "/team/default.png"}
              alt={emp.name}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="font-semibold text-white">{emp.name}</h2>
              <p className="text-sm text-muted-foreground">{emp.role}</p>
              <p
                className={`text-sm font-medium ${
                  emp.status === "Logged In" ? "text-green-400" : "text-red-400"
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
