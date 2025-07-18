"use client";

import { motion } from "framer-motion";
import { TextGenerateEffect as TextGenerate } from "../../../components/ui/text-generate";
import case1 from "../../../assets/case_study_image/case1.png";
import dawn from "../../../assets/case_study_image/dawn.png";
import FlowingMenu from "../../../components/reactbits/FlowingMenu";

const headingVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const, // 👈 fix here
    },
  },
};

const Project1 = () => {
  const demoItems = [
    {
      link: "project2",
      text: "The Joy of Creation",
      image:
        "https://images.unsplash.com/photo-1443916568596-df5a58c445e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGpveXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      link: "project3",
      text: "The Digital Revolution",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
    },
    {
      link: "project4",
      text: "The Pursuit of Knowledge",
      image:
        "https://media.istockphoto.com/id/1372200846/photo/electricity-transmission-towers-with-orange-glowing-wires-against-night-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=FQsOUVLK16Y1mm6xUJl9iPxlthqcFgjyI7kxjQjTkZA=",
    },
    {
      link: "project5",
      text: "Art of Design",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600",
    },
  ];

  return (
    <div className="w-full text-white ">

      <div className="relative w-full min-h-screen py-20 px-4">
        <img
          src={case1}
          alt="Case Study Background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent -z-10" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-16">

          <div className=" space-y-6">
            <motion.h1
              className=" md:text-6xl font-bold font-orbitron text-white"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              Dawn of Innovation
            </motion.h1>
            <TextGenerate words="A futuristic solution that bridges design with user experience, developed to scale for businesses worldwide." />
          </div>


          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              📝 Description
            </motion.h2>
            <TextGenerate words="We built a modern, responsive platform that streamlined user engagement and optimized internal workflows. Our approach included audience research, UI/UX planning, and scalable backend engineering." />
          </div>


          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
            >
              🤝 Team
            </motion.h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-lg text-neutral-300 pl-4 list-disc">
              <li>🎨 UI/UX Design</li>
              <li>💻 Frontend Development</li>
              <li>🧪 QA Testing</li>
              <li>📞 Client Communication</li>
              <li>🛠️ Backend Engineering</li>
              <li>🐛 Debugging</li>
            </ul>
          </div>


          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
            >
              🏁 Result
            </motion.h2>
            <TextGenerate words="A highly scalable and user-friendly platform that significantly increased client retention and conversion rates." />
          </div>
        </div>
      </div>


      <div className="w-full bg-gray-600 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <TextGenerate words="In today's digital age, establishing a strong online presence is essential. One Terrific Link recognized this challenge and set out to revolutionize how people manage their online content — a vision echoed in initiatives like Dawn of Innovation and GS3." />
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <TextGenerate words="Our team’s dedication to innovation made this project a beacon of transformative design and functionality. The combined efforts resulted in an experience that is not only seamless and responsive but scalable for the future." />
            <img
              src={dawn}
              alt="Dawn of Innovation"
              className="w-full max-w-sm rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Red Section - Additional Images */}
      <div className="w-full bg-gray-700   py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-10"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
          >
            Project Highlights
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://media.istockphoto.com/id/543183018/photo/sunrise-on-mount-kanchenjugha-at-dawn-sikkim.jpg?s=612x612&w=0&k=20&c=ONnlaZ9ny-HD9P3li-5t0tzpm0dHdahYRdmN_WxrMsc=",
              "https://media.istockphoto.com/id/920377882/photo/beautiful-landscape-with-high-mountains-with-illuminated-peaks-stones-in-mountain-lake.jpg?s=612x612&w=0&k=20&c=ppnPB3UoILzzxR48gcuUzZx92zepSwegQ-0NqfBDAzk=",
              "https://media.istockphoto.com/id/2193639475/photo/landscape-view-of-gloomy-sunset-over-the-koshi-river-in-nepal.jpg?s=612x612&w=0&k=20&c=M5qshnRS9lNDNXw2QBJjQaBOcY5CI9iOlFhi8byTelg=",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Additional Image ${i + 1}`}
                className="rounded-xl w-full h-64 object-cover transition-transform duration-300 hover:scale-105 shadow-md"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flowing Menu Section */}
      <div className="w-full bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-5xl mb-12 font-bold"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
          >
            Explore more Case Studies
          </motion.h2>
          <div style={{ height: "600px", position: "relative" }}>
            <FlowingMenu items={demoItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project1;
