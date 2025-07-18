"use client";

import case1 from "../../../../public/case_study_image/case1.png";
import dawn from "../../../../public/case_study_image/dawn.png";
import FlowingMenu from "../../../components/reactbits/FlowingMenu";

const Project1 = () => {
  const demoItems = [
    {
      link: "project2",
      text: "The Joy of Creation",
      image: "https://media.istockphoto.com/id/1213223956/photo/north-and-south-america-red-connection-lines-copy-space-global-business-pandemic-computer.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q-whmH1WA1gkn9eOZEkwt22SI4lXevs-Oa5J9hrcrHc=",
    },
    {
      link: "project3",
      text: "The Digital Revolution",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2FsbHBhcGVyfGVufDB8fDB8fHww",
    },
    {
      link: "project4",
      text: "The persuit of Knowledge",
      image: "https://media.istockphoto.com/id/1372200846/photo/electricity-transmission-towers-with-orange-glowing-wires-against-night-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=FQsOUVLK16Y1mm6xUJl9iPxlthqcFgjyI7kxjQjTkZA=",
    },
    {
      link: "project5",
      text: "Art of Design",
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsaG91ZXR0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="w-full text-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <img
          src={case1}
          alt="Case Study Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent -z-10" />

        <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-4 space-y-10">
          <div className="space-y-4 mt-24">
            <h1 className="text-6xl font-bold font-orbitron">Dawn oF Innovation</h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              A futuristic solution that bridges design with user experience,
              developed to scale for businesses worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">📝 Description</h2>
            <p className="text-lg text-neutral-300 max-w-2xl">
              We built a modern, responsive platform that streamlined user
              engagement and optimized internal workflows. Our approach included
              audience research, UI/UX planning, and scalable backend
              engineering.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">🤝 Team</h2>
            <ul className="grid grid-cols-2 gap-2 text-lg text-neutral-300">
              <li>🎨 UI/UX Design</li>
              <li>💻 Frontend Development</li>
              <li>🧪 QA Testing</li>
              <li>📞 Client Communication</li>
              <li>🛠️ Backend Engineering</li>
              <li>🐛 Debugging</li>
            </ul>
          </div>

          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold">🏁 Result</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mb-12">
              A highly scalable and user-friendly platform that significantly
              increased client retention and conversion rates.
            </p>
          </div>
        </div>
      </div>

      {/* Blue Section */}
      <div className="w-full bg-blue-300 py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-12 text-lg text-neutral-800 leading-relaxed">
          <p className="text-xl font-sans leading-relaxed max-w-5xl mt-2">
            In today's digital age, establishing a strong online presence is
            essential for individuals and businesses alike. However, navigating
            the complexities of multiple platforms and sharing resources
            efficiently can be daunting. One Terrific Link recognized this
            challenge and set out to revolutionize the way people manage and
            share their online content — a vision echoed by initiatives like{" "}
            <strong>Dawn of Innovation</strong> and <strong>GS3</strong>, where
            innovation meets execution.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 flex items-center">
              <p className="text-xl font-sans leading-relaxed max-w-5xl mt-2">
                Our team’s dedication to innovation made this project a beacon
                of transformative design and practical functionality. The
                combined efforts of designers, developers, and visionaries
                resulted in an experience that is not only seamless and
                responsive but also impactful and scalable for the future.
              </p>
            </div>

            <div className="flex-1">
              <img
                src={dawn}
                alt="Dawn of Innovation"
                className="w-full h-auto max-h-[300px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images Section */}
      <div className="w-full bg-gray-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 w-full">
            <img
              src="https://media.istockphoto.com/id/1068270866/photo/sunset-backgrounds.jpg?s=612x612&w=0&k=20&c=xNljriaJqyuoqgCpFE-VOJiMJw73HRd5J8cIIOJlcyE="
              alt="Additional Image 1"
              className="w-full h-64 object-cover rounded-xl"
            />
            <img
              src="https://media.istockphoto.com/id/165085322/photo/man-standing-on-jetty.jpg?s=612x612&w=0&k=20&c=WsPOcUnsFiShZPEEzURdxs-IQvEulKHzYnCbIAUhfIw="
              alt="Additional Image 2"
              className="w-full h-64 object-cover rounded-xl"
            />
            <img
              src="https://media.istockphoto.com/id/645768248/photo/dramatic-and-majestic-sunset.jpg?s=612x612&w=0&k=20&c=ivZg2UPRt71m-YHqU_l3sjf3kQmDlfVryMq2svhnTr0="
              alt="Additional Image 3"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
          <p className="text-xl font-sans leading-relaxed max-w-6xl mt-6 mx-auto">
            Our team’s dedication to innovation made this project a beacon of
            transformative design and practical functionality. The combined
            efforts of designers, developers, and visionaries resulted in an
            experience that is not only seamless and responsive but also impactful
            and scalable for the future.
          </p>
        </div>
      </div>

      {/* Flowing Menu Section */}
      <div className="w-full bg-gray-700 py-16">
        <div className="max-w-8xl mx-auto px-4">
          <h1 className="text-5xl mx-30 mb-12 mt-12 font-bold font-orbitron">
            Explore more Case Studies
          </h1>
          <div style={{ height: "600px", position: "relative" }}>
            <FlowingMenu items={demoItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project1;
