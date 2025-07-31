"use client";

import { useState, memo } from "react";

import axios, { isAxiosError } from "axios";
import { WorldMap } from "@/components/ui/worldMap";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MemoizedWorldMap = memo(WorldMap);


const worldMapDots = [
  {
    start: { lat: 12.8726, lng: 108.3639 }, 
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
];

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      await axios.post("http://localhost:8000/api/v1/contact", {
        name,
        email,
        message,
      });

      // On success
      setStatus({
        loading: false,
        error: "",
        success: "Your message has been sent successfully!",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
    
      if (isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        setStatus({ loading: false, error: errorMessage, success: "" });
      } else {
        setStatus({
          loading: false,
          error: "An unexpected error occurred.",
          success: "",
        });
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
 
        <MemoizedWorldMap dots={worldMapDots} />
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
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans ">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-xl mb-2 text-gray-300 font-sans">
                Message
              </Label>
              <Textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white font-sans"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Display success or error messages */}
            {status.success && (
              <p className="text-green-400 text-center">{status.success}</p>
            )}
            {status.error && (
              <p className="text-red-400 text-center">{status.error}</p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-300 w-full disabled:bg-gray-500"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
