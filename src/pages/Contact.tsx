import { WorldMap } from "@/components/ui/worldMap";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-black text-white font-orbitron px-6 md:px-20 py-20 min-h-screen flex flex-col justify-center">
      <div className="mb-15 mt-6 flex justify-center xl:justify-start">
        <h1 className="text-3xl font-semibold font-orbitron text-nowrap lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest ">
          Contact Us
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <form className="w-full space-y-6 order-2 md:order-1">
          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400 font-sans">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400 font-sans">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400 font-sans">
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
            className="bg-white cursor-pointer text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-600 w-full"
          >
            Send Message
          </button>
        </form>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl border border-gray-700 shadow-lg order-1 md:order-2"
        >
          <WorldMap
            dots={[
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 51.5074, lng: -0.1278 }, // London
              },
              {
                start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                end: { lat: -33.8688, lng: 151.2093 }, // Sydney
              },
              {
                start: { lat: 19.076, lng: 72.8777 }, // Mumbai
                end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
              },
              {
                start: { lat: 40.7128, lng: -74.006 }, // New York
                end: { lat: 55.7558, lng: 37.6173 }, // Moscow
              },
              {
                start: { lat: 33.4484, lng: -112.074 }, // Phoenix, Arizona
                end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
              },
              {
                start: { lat: 41.9028, lng: 12.4964 }, // Rome
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 1.3521, lng: 103.8198 }, // Singapore
                end: { lat: 19.076, lng: 72.8777 }, // Mumbai
              },
            ]}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
