"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";


interface ServiceData {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ServicesOffered = () => {

  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
       
        const res = await axios.get("http://localhost:8000/api/v1/services");
        setServices(res.data.data);
      } catch (err) {
        setError("Failed to load services. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="relative bg-transparent text-white font-orbitron px-6 md:px-20 py-8 min-h-screen">
      
      <div className="absolute top-0 left-0 w-full h-[500px] -z-10 overflow-hidden">
        <img
          src="https://t3.ftcdn.net/jpg/04/70/11/64/240_F_470116460_gG4tviMXUKBQ9GR6TysvK7EqGl06PS5X.jpg" 
          alt="Services Hero"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-semibold font-orbitron text-nowrap lg:text-4xl xl:text-5xl text-border-white tracking-widest inline">
        Our Services
      </h1>

      {/* Loading and Error States */}
      {loading && <p className="mt-12">Loading services...</p>}
      {error && <p className="mt-12 text-red-500">{error}</p>}

      {/* Services Grid - now maps over the 'services' state */}
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 relative z-10 mt-12">
        {services.map((service, idx) => (
          <motion.div
            key={service._id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-700 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group relative"
          >
            <div className="overflow-hidden h-48">
              <img
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6 relative z-10">
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] group-hover:before:animate-shimmer rounded-xl" />
              <h2 className="text-xl font-semibold text-white mb-2 relative z-10">
                {service.title}
              </h2>
              <p className="text-gray-400 text-sm relative z-10">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesOffered;
