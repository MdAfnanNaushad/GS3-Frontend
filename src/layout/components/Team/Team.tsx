"use client";

import { useRef, useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios, { isAxiosError } from "axios"; 
type Employee = {
  name: string;
  role: string;
  image: string;
  bio?: string;
  github?: string;
  linkedin?: string;
};


type ApiTeamMember = {
  _id: string;
  name: string;
  position: string;
  image?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
};

const Team = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [team, setTeam] = useState<Employee[]>([]);

  const fetchTeam = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/team/all", {
        withCredentials: true,
      });


      const formatted = res.data.data.map((member: ApiTeamMember) => ({
        name: member.name,
        role: member.position || "Team Member",

        image: member.image || "/team/default.png",
        bio: member.bio || "No bio available.",
        github: member.github || "#",
        linkedin: member.linkedin || "#",
      }));

      setTeam(formatted);
    } catch (err) {

      if (isAxiosError(err)) {
        console.error(
          "Failed to fetch team:",
          err.response?.data || err.message
        );
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="text-amber-50 relative z-10 pb-32 overflow-x-hidden">
      <div className="flex justify-center mb-4 ">
        <h2 className="font-orbitron text-nowrap pl-4 text-4xl lg:text-4xl xl:text-5xl flex justify-center text-border-white tracking-widest">
          Meet the Team
        </h2>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {team.map((member, idx) => {
          const isCenter = idx === currentSlide % team.length;
          return (
            <div key={idx} className="px-2 mb-4 ">
              <div
                className={`group relative w-72 p-6 mt-8 bg-white/5 backdrop-blur-md border-2 border-transparent rounded-xl text-center transition-all duration-300 mx-auto
    ${
      isCenter
        ? "scale-110 shadow-2xl hover:border-gray-400 "
        : "scale-90 opacity-80"
    } `}
              >
                <div className="relative w-28 h-28 mx-auto mb-4 group">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-400 p-[3px] transition-transform duration-500 ease-in-out 
    ${isCenter ? "group-hover:scale-110 opacity-100" : "opacity-50 scale-90"}`}
                  >
                    <div className="w-full h-full bg-black rounded-full" />
                  </div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover rounded-full relative z-10 transition-transform duration-500 ease-in-out 
    ${isCenter ? "group-hover:scale-105 scale-100" : "scale-90"}`}
                  />
                </div>

                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-neutral-400 mb-3 hover:text-yellow-400 transition-transform">
                  {member.role}
                </p>
                <p className="text-xs text-neutral-300 italic mb-3 px-2">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-4 ">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 hover:text-yellow-400 transition" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 hover:text-yellow-400 transition" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Team;
