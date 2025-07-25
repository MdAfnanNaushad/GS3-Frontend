import { Card } from "@/components/ui/Card";

const clients = [
  {
    _id: 1,
    name: "TechNova Pvt Ltd",
    industry: "SaaS",
    country: "USA",
    logoUrl: "https://t3.ftcdn.net/jpg/14/74/29/22/240_F_1474292278_KaHjbX45mkuNXZwkfWRpKZgaZePZcB2r.jpg",
  },
  {
    _id: 2,
    name: "FinGrowth Solutions",
    industry: "Finance",
    country: "India",
    logoUrl: "https://t3.ftcdn.net/jpg/15/41/87/66/240_F_1541876605_3MM5DT7GarqjEXhDqxy9TraISxDtdGtS.jpg",
  },
  {
    _id: 3,
    name: "EduSpark",
    industry: "EdTech",
    country: "UK",
    logoUrl: "https://t3.ftcdn.net/jpg/14/74/29/22/240_F_1474292278_KaHjbX45mkuNXZwkfWRpKZgaZePZcB2r.jpg",
  },
  {
    _id: 4,
    name: "GreenEra Systems",
    industry: "Sustainability",
    country: "Germany",
    logoUrl: "https://t3.ftcdn.net/jpg/12/46/66/30/240_F_1246663011_eyltResZNXqSMZJJUtOrQG0SELrXjigD.jpg",
  },
  {
    _id: 5,
    name: "MediCore Labs",
    industry: "Healthcare",
    country: "Canada",
    logoUrl: "https://t4.ftcdn.net/jpg/11/84/51/43/240_F_1184514368_SYb3EU7Ai9bLyf68nz1Mu5X0OEkGG1jf.jpg",
  },
];

const ClientServed = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-orbitron font-semibold tracking-widest text-border-white mb-6">
        Clients We've Worked With
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client._id} className="p-5 flex items-center gap-4 bg-zinc-950 border border-zinc-800 shadow-md">
            <img
              src={client.logoUrl}
              alt={client.name}
              className="w-16 h-16 rounded-full object-cover border border-white/10"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{client.name}</h2>
              <p className="text-sm text-muted-foreground">{client.industry}</p>
              <p className="text-sm text-zinc-400">{client.country}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientServed;
