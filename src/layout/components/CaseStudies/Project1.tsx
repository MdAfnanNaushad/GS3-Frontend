"use client";

import { motion } from "framer-motion";
import { TextGenerateEffect as TextGenerate } from "../../../components/ui/text-generate";
import case1 from "../../../assets/case_study_image/case1.png";
import FlowingMenu from "../../../components/reactbits/FlowingMenu";
import { StickyScroll } from "@/components/ui/stick-scroll-reveal";
import {
  Users,
  FileText,
  CheckCircle,
  Palette,
  Monitor,
  FlaskConical,
  Phone,
  Server,
  Bug,
} from "lucide-react";

const headingVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
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

  const highlights = [
    {
      title: "Next-Gen Web Experiences",
      description:
        "GS3 redefines web development by fusing performance with sleek, interactive design, ensuring users stay engaged and brands stand out.",
      content: (
        <img
          src="https://t3.ftcdn.net/jpg/12/30/63/70/240_F_1230637063_hQuWGp4SYiCuZkagRznBfhqWuEn2ginN.jpg"
          alt="Next-Gen Web Experience"
          className="h-full w-full object-cover rounded-md"
        />
      ),
    },
    {
      title: "Robust & Scalable Systems",
      description:
        "Engineered with scalability in mind, GS3 supports growing business needs without compromising on speed, flexibility, or user experience.",
      content: (
        <img
          src="https://t3.ftcdn.net/jpg/14/51/67/88/240_F_1451678873_zYHJodYguCa4NUHw1YGCTF4bgCD3Igm0.jpg"
          alt="Scalable Systems"
          className="h-full w-full object-cover rounded-md"
        />
      ),
    },
    {
      title: "User-Centric Development",
      description:
        "Every feature in GS3 is designed around real-world user behavior, providing intuitive workflows and seamless interactions across devices.",
      content: (
        <img
          src="https://t4.ftcdn.net/jpg/12/00/50/03/240_F_1200500366_KFrZ2U1iq4Sw31oxFETutkCYtO9FPCmS.jpg"
          alt="User-Centric Development"
          className="h-full w-full object-cover rounded-md"
        />
      ),
    },
    {
      title: "Innovation at the Core",
      description:
        "With cutting-edge tech stacks, modular design, and automation, GS3 leads digital innovation for modern startups and enterprises.",
      content: (
        <img
          src="https://t4.ftcdn.net/jpg/15/51/88/99/240_F_1551889929_oj5LNRBHfIXO4fwLNqu4PjGlMfLJGcxT.jpg"
          alt="Innovation Core"
          className="h-full w-full object-cover rounded-md"
        />
      ),
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

        <div className="relative z-10 max-w-6xl mx-auto space-y-16 mt-10">
          <div className=" space-y-6">
            <motion.h1
              className=" font-orbitron flex text-nowrap text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-start text-border-white tracking-widest relative max-w-6xl"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              The Dawn of Innovation
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
              <h2 className="text-3xl font-bold flex items-center gap-2 font-orbitron relative text-border-white tracking-widest ">
                <FileText className="w-8 h-8 text-white" />
                Description
              </h2>
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
              <h2 className="text-3xl font-extrabold flex items-center gap-2 font-orbitron text-border-white tracking-widest">
                <Users className="w-8 h-8  text-white" />
                Team
              </h2>
            </motion.h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-lg text-neutral-300">
              <li className="flex items-center gap-2">
                <Palette className="w-5 h-5" /> UI/UX Design
              </li>
              <li className="flex items-center gap-2">
                <Monitor className="w-5 h-5" /> Frontend Development
              </li>
              <li className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" /> QA Testing
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Client Communication
              </li>
              <li className="flex items-center gap-2">
                <Server className="w-5 h-5" /> Backend Engineering
              </li>
              <li className="flex items-center gap-2">
                <Bug className="w-5 h-5" /> Debugging
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-white"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
            >
              <h2 className="text-3xl font-extrabold flex items-center gap-2  font-orbitron text-border-white tracking-widest">
                <CheckCircle className="w-8 h-8 text-white" />
                Result
              </h2>
            </motion.h2>
            <TextGenerate words="A highly scalable and user-friendly platform that significantly increased client retention and conversion rates." />
          </div>
        </div>
      </div>

      <StickyScroll contentClassName="max-w-2xl" content={highlights} />

      {/* Flowing Menu Section */}
      <div className="w-full bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-5xl mb-12 font-bold font-orbitron text-border-white  tracking-widest"
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
