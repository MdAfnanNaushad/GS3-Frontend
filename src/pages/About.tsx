"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import CountUp from "@/components/reactbits/CountUp";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import { fetchAbout } from "@/API/aboutApi";

const ParagraphWithEffect = ({ words }: { words: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isInView) setShow(true);
  }, [isInView]);

  return (
    <div ref={ref}>
      {show && (
        <TextGenerateEffect
          className="pb-6 font-semibold"
          duration={0.5}
          words={words}
        />
      )}
    </div>
  );
};

const About = () => {
  const [stats, setStats] = useState<{ label: string; value: string }[]>([]);
  const [timeline, setTimeline] = useState<
    { year: string; title: string; description: string; images: string[] }[]
  >([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const getAboutData = async () => {
      try {
        const res = await fetchAbout();
        console.log("About API response:", res.data);
        setStats(res.data?.data?.stats || []);
        setTimeline(res.data?.data?.timeline || []);
      } catch (error) {
        console.error("Failed to fetch About Data", error);
      } finally {
        setLoading(false);
      }
    };

    getAboutData(); 


    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        getAboutData(); // refresh on tab focus
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative bg-transparent text-white font-orbitron px-6 md:px-20 py-20">
      <div className="absolute top-0 left-0 w-full h-[500px] -z-10 overflow-hidden">
        <img
          src="https://t4.ftcdn.net/jpg/03/14/81/65/240_F_314816591_yBAWvMvnpTW05AP0q4DCs5B6y2gnL9xA.jpg"
          alt="About Hero"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Heading */}
      <div className="mb-20 mt-6">
        <h1 className="font-orbitron flex text-nowrap text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-start text-border-white tracking-widest relative ">
          About Us
        </h1>
        <p className="text-gray-400 max-w-3xl mt-4 font-sans text-xl text-wrap">
          GS3 is a forward-thinking digital solutions company dedicated to
          building scalable, high-performance products that empower businesses
          across industries. Our journey from a small team of developers to a
          global innovation hub reflects our commitment to excellence,
          creativity, and impact-driven work.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-24">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-transparent border border-gray-700 backdrop-blur-sm rounded-xl py-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] group-hover:before:animate-shimmer rounded-xl" />
            <CountUp
              from={0}
              to={parseInt(stat.value)}
              duration={2}
              className="text-3xl font-bold text-white relative z-10"
            />
            <p className="text-gray-400 mt-2 relative z-10">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="mt-15 max-w-8xl">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-orbitron text-nowrap text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest relative inline-block mt-5 max-w-8xl"
        >
          Our Journey
        </motion.h2>

        <Timeline
          data={timeline.map((item, index) => ({
            title: (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block  flex-col"
              >
                {item.title}
                <br></br>
                {item.year}
              </motion.div>
            ),
            content: (
              <div className="pb-4 font-semibold">
                <ParagraphWithEffect words={item.description} />
                <div className="grid grid-cols-2 gap-4">
                  {item.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Timeline ${item.year} Image ${i}`}
                      className="rounded-lg object-cover w-full h-40 hover:scale-110 transition-all duration-400"
                    />
                  ))}
                </div>
              </div>
            ),
          }))}
          className="ml-0"
        />
      </div>
    </div>
  );
};

export default About;
