import { useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const team = [
  {
    name: "Giridhari Dutta",
    role: "Director",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=182,h=224,fit=crop/ALpOL3M5PJiMVoKP/giri-AwvPbZX25gHPwR9j.jpg",
    github: "",
    linkedin: "",
    bio: "I have a multifaceted role in my projects, serving as a team leader, project coordinator, consultant, and developer. I enjoy leading teams, coordinating project activities, providing valuable insights as a consultant.",
  },
  {
    name: "Sudip Tunga",
    role: "Full Stack Developer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=182,h=224,fit=crop/ALpOL3M5PJiMVoKP/img_20250309_132855-YD0lZzNWEoFbBjlG.jpg",
    github: "",
    linkedin: "",
    bio: "I'm a B.Tech Engineer, specializing in React, Node.js, and Express. With expertise in full-stack development, I build scalable, high-performance web applications and seamless user experiences.",
  },
  {
    name: "Md Afnan Naushad",
    role: "Web Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGeWcRw2Wj-NQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715002639397?e=1757548800&v=beta&t=EZEw4kjAnh7FXkwjB11ORYvqRsmlhxcEsaCDmTp051s",
    github: "",
    linkedin: "",
    bio: "I am a B.Tech student ,specializing in building attractive interfaces and applied logics ,passionate about turning ideas into beautiful web interfaces.",
  },
  {
    name: "Rahul Mullik",
    role: "UI/UX Designer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=182,h=224,fit=crop/ALpOL3M5PJiMVoKP/whatsapp-image-2025-03-18-at-21.38.08-mxB4kL4bkKc8vjre.jpeg",
    github: "",
    linkedin: "",
    bio: "I'm an experienced UI/UX designer with expertise in motion graphics and visual effects, combines creativity technical skills to enhance the functionality of digital products.",
  },
  {
    name: "Kundan Kumar",
    role: "Backend Developer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/kundan-AE0vWeznegcr10q8.PNG",
    github: "",
    linkedin: "",
    bio: "I'm an experienced UI/UX designer with expertise in motion graphics and visual effects, combines creativity and technical skills to enhance the visual appeal and functionality of digital products..",
  },
  {
    name: "Ravi Yadav",
    role: "App Developer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/ravi-YrDXb20Z2qcVq5Rn.PNG",
    github: "",
    linkedin: "",
    bio: "I specialize in mobile app development, with expertise in  Kotlin for Android. I have a strong background in creating cross-platform applications that are both functional and user-friendly.",
  },
  {
    name: "Ayan Kundu",
    role: "Digital Marketer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/whatsapp-image-2025-03-18-at-21.37.43-mxB4kL4GxGujevbz.jpeg",
    github: "",
    linkedin: "",
    bio: "I'm a seasoned Digital Marketer & business analyst specializing in business growth and marketing , leverages strategy and branding guarantees a compelling business growth.",
  },
  {
    name: "Anup Jana",
    role: "Frontend Developer",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=182,h=224,fit=crop/ALpOL3M5PJiMVoKP/make_it_as_it_professional_image_4067123164-mjE5byEMk8TPjpXE.png",
    github: "",
    linkedin: "",
    bio: "I'm experienced in full-stack development, I enjoy crafting end-to-end solutions that deliver great user experiences across platforms.",
  },
];

const Team = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
                className={`group relative w-72 p-6 mt-8 bg-white/5 backdrop-blur-md border-2 border-transparent rounded-xl text-center transition-all duration-300  mx-auto
    ${
      isCenter ? "scale-110 shadow-2xl hover:border-gray-400 " : "scale-90 opacity-80"
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
