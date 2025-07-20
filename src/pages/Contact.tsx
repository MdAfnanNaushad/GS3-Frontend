"use client";
import { WorldMap } from "@/components/ui/worldMap";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="relative w-full min-h-screen  bg-transparent">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <WorldMap
          dots={[
            {
              start: { lat: 12.8726, lng: 108.3639 }, // Kolkata
              end: { lat: 51.5074, lng: -0.1278 }, // London
            },
            {
              start: { lat: 12.8726, lng: 108.3639 },
              end: { lat: 40.7128, lng: -74.006 }, // New York
            },
            {
              start: { lat: 12.8726, lng: 108.3639 },
              end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
            },
            {
              start: { lat: 12.8726, lng: 108.3639 },
              end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
            },
            {
              start: { lat: 12.8726, lng: 108.3639 },
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
          ]}
        />
      </div>

      {/* Contact Section */}
      <div className="z-10 px-6 md:px-20 py-20 text-white min-h-screen flex flex-col">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-semibold lg:text-4xl xl:text-5xl tracking-widest font-orbitron flex text-nowrap justify-center xl:justify-start text-border-white relative">
            Contact Us
          </h1>
        </div>

        {/* Centered Form Only */}
        <div className="flex flex-1 justify-center items-center">
          <form className="w-full max-w-lg space-y-6">
            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans ">
                Name
              </Label>
              <Input type="text" placeholder="Your Name" />
            </div>

            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans">
                Email
              </Label>
              <Input type="email" placeholder="Your Email" />
            </div>

            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans">
                Message
              </Label>
              <Textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
                placeholder="Your Message"
              />
            </div>

            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
