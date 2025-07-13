import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    description:
      "Custom, scalable, and responsive web solutions tailored to your business.",
    image:
      "https://t3.ftcdn.net/jpg/02/14/87/96/240_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg",
  },
  {
    title: "Mobile App Development",
    description:
      "Seamless and intuitive mobile applications for Android and iOS platforms.",
    image:
      "https://t4.ftcdn.net/jpg/13/51/21/15/240_F_1351211585_HMlPXKQDsDDZtYonw2IquhHYGfC1Gt2m.jpg",
  },
  {
    title: "UI/UX Design",
    description:
      "Stunning interfaces and smooth user experiences for web and mobile.",
    image:
      "https://t3.ftcdn.net/jpg/14/07/30/12/240_F_1407301224_PaJEAMEnCNFZtOAABJzHWtiKP9ZPuvez.jpg",
  },
  {
    title: "Digital Marketing",
    description:
      "Strategic campaigns to boost your online presence and customer engagement.",
    image:
      "https://t3.ftcdn.net/jpg/02/78/94/38/240_F_278943853_0D1w67S6LWBrbh3Nn2055ctid5ThGO16.jpg",
  },
  {
    title: "Bulk SMS",
    description:
      "Expert guidance to refine, scale, and transform your digital strategy.",
    image:
      "https://t4.ftcdn.net/jpg/14/87/24/35/240_F_1487243560_gvXhflbfIls6lalm24asgoiT5GQTakMv.jpg",
  },

  {
    title: "SEO Optimization",
    description:
      "Enhance your website's visibility on search engines with our tailored SEO strategies, boosting organic traffic and ranking.",
    image: "https://t3.ftcdn.net/jpg/02/19/92/38/240_F_219923851_6fHGqEhXcrC6q0ZAPWo1nU9ujYwJrYdo.jpg",
  },
];

const Service = () => {
  return (
    <div className="bg-transparent text-white font-orbitron px-6 md:px-20 py-20 min-h-screen">
      {/* Heading */}
      <div className="mb-20 mt-6 flex justify-center xl:justify-end">
        <h1 className="text-3xl font-semibold  font-orbitron text-nowrap  lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest inline">
          Our Services
        </h1>
      </div>

      {/* Service Cards */}
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-700 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group relative"
          >
            {/* Image */}
            <div className="overflow-hidden h-48">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
              {/* Shine Animation */}
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] group-hover:before:animate-shimmer rounded-xl" />
              <h2 className="text-xl font-semibold text-white mb-2 relative z-10">
                {service.title}
              </h2>
              <p className="text-gray-400 text-sm relative z-10">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
