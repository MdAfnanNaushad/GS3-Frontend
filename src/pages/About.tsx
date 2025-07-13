import { motion } from "framer-motion";

const stats = [
  { label: "Clients Satisfied", value: "350+" },
  { label: "Projects Completed", value: "120+" },
  { label: "Years of Mastery", value: "5+" },
  { label: "Team Members", value: "25+" },
];

const About = () => {
  return (
    <div className="bg-transparent text-white font-orbitron px-6 md:px-20 py-20">
      {/* Heading */}
      <div className="mb-20 mt-6">
        <h1 className="font-orbitron text-nowrap  text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest relative inline-block shiny-text">
          About Us
        </h1>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
        {/* Mission Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl shadow-lg border border-gray-700 group"
        >
          <img
            src="https://t3.ftcdn.net/jpg/05/08/10/96/240_F_508109682_ZdWVxEDpJgb9V0qhz38CbxpmIWtnKJtm.jpg"
            alt="Mission"
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </motion.div>

        {/* Mission Text */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 font-orbitron text-nowrap  lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest inline">
            Our Mission
          </h2>
          <p className="text-gray-400 leading-relaxed">
            At GS3, our mission is to build scalable, innovative, and impactful
            technology solutions tailored to modern-day business needs. We aim
            to streamline digital transformation, enabling our clients to thrive
            in a rapidly evolving technological landscape. We believe in
            creating long-term value through robust software and a
            human-centered approach to innovation.
          </p>
        </div>

        {/* Vision Text */}
        <div>
          <h2 className="font-orbitron text-nowrap  text-3xl lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest font-semibold mb-6 inline">
            Our Vision
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We envision becoming a global leader in technology, setting new
            benchmarks in innovation, transparency, and sustainability. By
            fostering a culture of creativity, we strive to empower enterprises
            and startups alike to scale with confidence—fueling digital growth
            through excellence and trust.
          </p>
        </div>

        {/* Vision Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl shadow-lg border border-gray-700 group"
        >
          <img
            src="https://t4.ftcdn.net/jpg/04/68/32/11/240_F_468321107_DWU1hWdhSrG0KPahj5cmoSLyTBjfozWI.jpg"
            alt="Vision"
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-700 backdrop-blur-sm rounded-xl py-10 relative overflow-hidden group"
          >
            {/* Shine Animation */}
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] group-hover:before:animate-shimmer rounded-xl" />
            <h3 className="text-3xl font-bold text-white relative z-10">
              {stat.value}
            </h3>
            <p className="text-gray-400 mt-2 relative z-10">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
