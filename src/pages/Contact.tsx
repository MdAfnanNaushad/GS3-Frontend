"use client";
import { WorldMap } from "@/components/ui/worldMap";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="relative w-full min-h-screen font-orbitron bg-transparent ">
      {/* Background Map */}
      <div className="absolute top-0 left-0 w-full h-full z-0  pointer-events-none">
       <WorldMap
  dots={[
    {
      start: { lat: 22.5726, lng: 88.3639 }, // Kolkata
      end: { lat: 51.5074, lng: -0.1278 },   // London
    },
    {
      start: { lat: 22.5726, lng: 88.3639 },
      end: { lat: 40.7128, lng: -74.006 },   // New York
    },
    {
      start: { lat: 22.5726, lng: 88.3639 },
      end: { lat: 35.6895, lng: 139.6917 },  // Tokyo
    },
    {
      start: { lat: 22.5726, lng: 88.3639 },
      end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    },
    {
      start: { lat: 22.5726, lng: 88.3639 },
      end: { lat: -33.8688, lng: 151.2093 }, // Sydney
    },
  ]}
/>

      </div>

      {/* Foreground Contact Content */}
      <div className="relative z-10 px-6 md:px-20 py-20 text-white min-h-screen flex flex-col justify-center">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-semibold lg:text-4xl xl:text-5xl tracking-widest font-orbitron flex text-nowrap  justify-center xl:justify-start text-border-white  relative">
            Contact Us
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <form className="w-full space-y-6 order-2 md:order-1">
            <div>
              <label className="block text-xl font-bold mb-2 text-gray-300 font-sans">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-xl font-bold mb-2 text-gray-300 font-sans">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-xl font-bold mb-2 text-gray-300 font-sans">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-xl border border-gray-700 shadow-lg order-1 md:order-2"
          >
            {/* Optional: Display another WorldMap or image here */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
