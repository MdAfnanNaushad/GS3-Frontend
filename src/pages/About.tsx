"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import CountUp from "@/components/reactbits/CountUp";
import { TextGenerateEffect } from "@/components/ui/text-generate";

const stats = [
  { label: "Clients Satisfied", value: "350+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Years of Mastery", value: "15+" },
  { label: "Team Members", value: "25+" },
];

const About = () => {
  return (
    <div className="bg-transparent text-white font-orbitron px-6 md:px-20 py-20">
      {/* Heading */}
      <div className="mb-20 mt-6">
        <h1 className="font-orbitron text-nowrap text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest relative inline-block shiny-text">
          About Us
        </h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center ">
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
              to={parseInt(stat.value.replace("+", ""))}
              duration={2}
              className="text-3xl font-bold text-white relative z-10"
            />
            <p className="text-gray-400 mt-2 relative z-10">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="mt-15">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-orbitron text-nowrap text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest relative inline-block "
        >
          Our Journey
        </motion.h2>

        <Timeline
          data={[
            {
              title: (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  2013 · Inception
                </motion.div>
              ),
              content: (
                <div className="pb-4">
                  <TextGenerateEffect
                    className="pb-6 font-semibold"
                    duration={0.5}
                    words="GS3 was born as a small development collective, united by a passion to craft elegant and purposeful software solutions for local businesses."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://t3.ftcdn.net/jpg/11/56/13/94/240_F_1156139414_Fy8grgEuMbfycZTwO9iImj0GJmU29Z7K.jpg"
                      alt="Global Partner"
                      className="rounded-lg object-cover w-full h-40"
                    />
                    <img
                      src="https://t4.ftcdn.net/jpg/09/19/68/09/240_F_919680978_ent4C9CWDuG4tQminaJ1wRdAqoY072ky.jpg"
                      alt="Agile Team"
                      className="rounded-lg object-cover w-full h-40"
                    />
                  </div>
                </div>
              ),
            },
            {
              title: (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  2015 · Expansion
                </motion.div>
              ),
              content: (
                <div className="pb-6 font-semibold ">
                  <TextGenerateEffect
                    className="pb-4 font-semibold"
                    words="With a growing team and refined vision, GS3 expanded into enterprise services, delivering full-stack solutions to startups and established firms across India."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://t4.ftcdn.net/jpg/13/26/99/13/240_F_1326991312_EA1i0pldwnif8jzB7Lb7mXy4VUcOdEiM.jpg"
                      alt="Expansion"
                      className="rounded-lg object-cover w-full h-40"
                    />
                    <img
                      src="https://t4.ftcdn.net/jpg/09/31/35/57/240_F_931355760_dCpsHFaQgzsJn28oNgI6lrpa2pc8KFUe.jpg"
                      alt="Teamwork"
                      className="rounded-lg object-cover w-full h-40"
                    />
                  </div>
                </div>
              ),
            },
            {
              title: (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  2020 · Global Reach
                </motion.div>
              ),
              content: (
                <div className="pb-4">
                  <TextGenerateEffect
                    className="pb-6 font-semibold"
                    words="GS3 began collaborating with international partners, scaling its infrastructure and adopting agile methodologies to meet global demands."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://t3.ftcdn.net/jpg/12/49/19/16/240_F_1249191643_B1cFjVpx8Ac72CJkepX3iDxqfsdW5WCp.jpg"
                      alt="Global Expansion"
                      className="rounded-lg object-cover w-full h-40"
                    />
                    <img
                      src="https://t4.ftcdn.net/jpg/15/38/12/07/240_F_1538120741_Td6xXV1WIh4xrJ4pVQVNYYTvxAZtZa8M.jpg"
                      alt="Innovation"
                      className="rounded-lg object-cover w-full h-40"
                    />
                  </div>
                </div>
              ),
            },
            {
              title: (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  2023 · Innovation Hub
                </motion.div>
              ),
              content: (
                <div className="pb-4">
                  <TextGenerateEffect
                    className="pb-6 font-semibold"
                    words="Establishing itself as a tech innovation hub, GS3 launched in-house platforms, adopted cutting-edge technologies, and fostered a culture of creativity and impact."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://t3.ftcdn.net/jpg/12/30/74/52/240_F_1230745224_trm0WXcboik91UeCD1B5KV9EG2T6pafT.jpg"
                      alt="Tech Launch"
                      className="rounded-lg object-cover w-full h-40"
                    />
                    <img
                      src="https://t3.ftcdn.net/jpg/14/63/79/88/240_F_1463798852_lNO40ntTqlNeyk71Cv0OLNJRz3PNbbHL.jpg"
                      alt="Creative Culture"
                      className="rounded-lg object-cover w-full h-40"
                    />
                  </div>
                </div>
              ),
            },
          ]}
          className="max-w-4xl ml-0"
        />
      </div>
    </div>
  );
};

export default About;
