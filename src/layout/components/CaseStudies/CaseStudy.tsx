// src/layout/components/CaseStudies/CaseStudy.tsx
"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { TextGenerateEffect as TextGenerate } from "@/components/ui/text-generate";
import { StickyScroll } from "@/components/ui/stick-scroll-reveal";
import { Users, FileText, CheckCircle } from "lucide-react";
import axios from "axios";
import FlowingMenu from "@/components/reactbits/FlowingMenu";


interface Detail {
  _id: string;
  title: string;
  description: string;
  image: string;
}

interface RelatedProject {
  _id: string;
  title: string;
  imageUrl: string;
  caseStudyId?: string;
}

interface CaseStudyData {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  team: string[];
  result: string;
}

const headingVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};


const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [scrollSections, setScrollSections] = useState<Detail[]>([]);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/case-studies/${id}`
        );
        setCaseStudy(data.data.caseStudy);
        setScrollSections(data.data.details);
        setRelatedProjects(data.data.relatedProjects);
      } catch (err) {
        console.error("Failed to fetch case study data:", err);
        setError("Could not load the case study. Please try again later.");
      }
    };
    fetchData();
  }, [id]);
  const formattedMenuItems = relatedProjects.map((project) => ({
    text: project.title,
    image: project.imageUrl,
    link: project.caseStudyId ? `/case-study/${project.caseStudyId}` : `#`,
  }));

  if (error) return <div className="p-8 text-white text-center">{error}</div>;
  if (!caseStudy)
    return (
      <div className="p-8 text-white text-center">Loading Case Study...</div>
    );

  return (
    <div className="w-full text-white overflow-x-hidden">
      <div className="relative w-full py-20">
        {caseStudy.heroImage && (
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="absolute inset-0 w-screen object-cover -z-10"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 -z-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-24">
          {/* Hero Title Section */}
          <div className="space-y-6 text-center lg:text-left">
            <motion.h1
              className="font-orbitron text-4xl sm:text-5xl lg:text-6xl tracking-widest text-border-white"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              {caseStudy.title}
            </motion.h1>
            <TextGenerate
              words={caseStudy.tagline || ""}
              className="font-sans"
            />
          </div>

          {/* Description */}
          <div className="space-y-6">
            <motion.h2
              className="flex items-center gap-3 font-orbitron text-border-white tracking-widest text-6xl sm:text-3xl"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FileText className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
              Description
            </motion.h2>
            <p className="text-neutral-300 leading-relaxed text-6xl  md:text-2xl">
              {caseStudy.description}
            </p>
          </div>

          {/* Team Section */}
          {caseStudy.team && caseStudy.team.length > 0 && (
            <div className="space-y-8">
              <motion.h2
                className="flex items-center gap-3 font-orbitron text-border-white tracking-widest text-2xl sm:text-3xl"
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Users className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                Team
              </motion.h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-base md:text-lg text-neutral-300">
                {caseStudy.team.map((role: string) => (
                  <li key={role} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 text-xl flex-shrink-0" />{" "}
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Result Section */}
          {caseStudy.result && (
            <div className="space-y-6">
              <motion.h2
                className="flex items-center gap-3 font-orbitron text-border-white tracking-widest text-2xl sm:text-3xl"
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CheckCircle className="w-7 h-7 sm:w-9 smh-9 text-white" />
                Result
              </motion.h2>
              <p className="text-neutral-300 leading-relaxed text-6xl md:text-2xl">
                {caseStudy.result}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Scroll Section */}
      {scrollSections && scrollSections.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 ">
          <StickyScroll
            content={scrollSections.map((section) => ({
              title: section.title,
              description: section.description,
              content: (
                <div className="w-full h-full bg-neutral-900 rounded-lg overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ),
            }))}
          />
        </div>
      )}

      {/* --- Flowing Menu Section --- */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="w-full bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl mb-12 font-bold font-orbitron text-border-white tracking-widest text-start"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
            >
              Explore More Projects
            </motion.h2>
            <div className="h-[40rem] relative">
              <FlowingMenu items={formattedMenuItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudy;
