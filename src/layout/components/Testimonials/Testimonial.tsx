import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Pradeep Sadani",
    role: "Sadani Realty",
    message:
      "We are highly satisfied with their work and look forward to continued collaboration!",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1080,h=1395,fit=crop/ALpOL3M5PJiMVoKP/whatsapp-image-2025-03-10-at-00.46.58-A85e3RgZRyTVENXP.jpeg",
  },
  {
    name: "Gautam Halder",
    role: "Bimala Production",
    message:
      "Impressed with the efficiency and professionalism. The entire process was smooth and hassle-free.",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/goutam-halder-m2W86RjeZ9HVZQ6b.png",
  },
  {
    name: "Kiran Santra ",
    role: "Cadcare Director",
    message:
      "GS3 Solution has done an excellent job with our website development and digital marketing.",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/kiran-mxB4kPGqjNHeDoE3.png",
  },
  {
    name: "Souvik Manna",
    role: "Creatoplay Director",
    message:
      "From website development to digital marketing, GS3 Solution has been a reliable partner",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/souvik-ALpelRVbqKfbBLvz.png",
  },
  {
    name: "Pradeep Murarka",
    role: "Murarka Enterprize",
    message:
      "Their expertise and dedication have truly helped our business grow!",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/murarka-Awv4Glyx2JIXlD9X.png",
  },
  {
    name: "Sourav Kundu",
    role: "TCA Chairman)",
    message:
      "Excellent service and professional approach! The team at GS3 Solution delivers innovative solutions.",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/ALpOL3M5PJiMVoKP/img-20250303-wa0027-1-mjE7WJz3rXS2j7N3.jpg",
  },
  {
    name: "Zara Ali",
    role: "Project Manager",
    message:
      "Onboarding became a breeze with this system. Clients love it, we love it.",
    image:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Neeraj Kapoor",
    role: "DevOps Engineer",
    message:
      "Deployments became smoother. Integrated CI/CD pipelines seamlessly.",
    image:
      "https://images.unsplash.com/photo-1513152697235-fe74c283646a?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Tanvi Rao",
    role: "Content Designer",
    message: "Beautiful UI and delightful animations make this platform shine.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Ishaan Verma",
    role: "CTO",
    message:
      "Robust, scalable, and elegant — exactly what we needed for our product vision.",
    image:
      "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=600&auto=format&fit=crop&q=60",
  },
];

const Testimonial = () => {
  return (
    <div className=" transition-all duration-300 text-amber-50">
      <div className="flex justify-center">
        <h2 className="font-orbitron pl-4 text-4xl lg:text-4xl xl:text-5xl text-border-white tracking-widest mb-2 pb-1 text-center">
          <span className="hidden md:inline">What People are Saying</span>

          <span className="block md:hidden">
            What People are
            <br />
            <span className="block text-center">Saying</span>
          </span>
        </h2>
      </div>

      <div className="overflow-visible  relative z-10">
        <Marquee
          pauseOnHover
          speed={50}
          gradient={true}
          gradientColor="black"
          gradientWidth={100}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover="hover"
              className="relative overflow-hidden mx-2 sm:mx-4 min-w-[250px] sm:min-w-[300px] max-w-xs sm:max-w-sm rounded-xl p-6 sm:p-10 bg-white/5 backdrop-blur-md border border-white/10 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-30"
            >
              <motion.div
                variants={{
                  hover: {
                    x: "200%",
                    y: "200%",
                    transition: { duration: 1.2, ease: "easeInOut" },
                  },
                }}
                initial={{ x: "-150%", y: "-150%" }}
                className="absolute  z-10 bg-gradient-to-tr from-transparent via-white/20 to-transparent w-[100%] h-[100%] rotate-[25deg]pointer-events-none"
              />

              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={t.image}
                    className="w-12 h-12 rounded-full object-cover border transition-transform duration-300 border-amber-200 hover:border-amber-400 hover:border-2.5 hover:scale-130 hover:transition-all  hover:duration-300"
                    alt={t.name}
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-neutral-400 hover:text-gray-200 font-semibold transition duration-300 ">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm italic mb-3">“{t.message}”</p>
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonial;
