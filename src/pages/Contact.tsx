import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-black text-white font-orbitron px-6 md:px-20 py-20 min-h-screen flex flex-col justify-center">
      <div className="mb-15 mt-6 flex justify-center xl:justify-start">
        <h1 className="text-3xl font-semibold font-orbitron text-nowrap lg:text-4xl xl:text-5xl justify-center xl:justify-end text-border-white tracking-widest ">
          Contact Us
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <form className="w-full space-y-6 order-2 md:order-1">
          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block text-xl font-bold mb-2 text-gray-400">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-white cursor-pointer text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-700 hover:text-gray-200 transition duration-600 w-full"
          >
            Send Message
          </button>
        </form>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl border border-gray-700 shadow-lg order-1 md:order-2"
        >
          <img
            src="https://t4.ftcdn.net/jpg/03/37/96/33/240_F_337963325_EJuPjWslX3vAFxJ59L3y1cm6IsSfo07s.jpg"
            alt="Contact Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
