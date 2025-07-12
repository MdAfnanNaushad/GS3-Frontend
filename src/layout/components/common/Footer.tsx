import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
  const handleResize = () => {
    const isNowMobile = window.innerWidth < 768;
    setIsMobile(isNowMobile);

    
    if (isNowMobile) {
      requestAnimationFrame(() => setOpenSection(null));
    }
  };

  handleResize(); 
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const FooterSection = ({
    title,
    items,
    sectionKey,
  }: {
    title: string;
    items: string[];
    sectionKey: string;
  }) => {
    const ref = useRef<HTMLUListElement>(null);
    const [measuredHeight, setMeasuredHeight] = useState(0);
    const isOpen = openSection === sectionKey;

    useEffect(() => {
      if (isMobile && ref.current) {
        setMeasuredHeight(ref.current.scrollHeight);
      }
    }, [isOpen, isMobile]);

    return (
      <div>
        <button
          className="mb-4 flex justify-between items-center w-full md:cursor-default text-white font-semibold"
          onClick={() => isMobile && toggleSection(sectionKey)}
        >
          <span>{title}</span>
          {isMobile && (
            <ChevronDown
              className={`ml-2 transition-transform duration-300 md:hidden ${
                isOpen ? "rotate-180" : ""
              }`}
              size={18}
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {(!isMobile || isOpen) && (
            <motion.ul
              key={sectionKey}
              ref={ref}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isMobile ? measuredHeight : "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.3, ease: "easeInOut" },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.2, ease: "easeInOut", delay: 0.1 },
                },
              }}
              style={{ overflow: "hidden" }}
              className={`space-y-2 text-sm ${
                isMobile ? "text-gray-400" : "text-gray-200"
              }`}
            >
              {items.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-white transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <footer className="bg-black text-white px-6 md:px-20 pt-16 pb-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10 font-orbitron">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/logo/GS3_logo.png"
              alt="GS3 Logo"
              className="h-8 w-auto"
            />
            <h2 className="text-2xl font-bold">GS3 Solution</h2>
          </div>
          <p className="mb-4 text-gray-200">Sign-up and get updates</p>
          <div className="flex items-center rounded overflow-hidden backdrop-blur-sm bg-black/20 transition border border-gray-300 hover:border-gray-200">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full text-white placeholder:text-gray-300 bg-transparent focus:outline-none"
            />
            <button className="px-4 py-2 text-white bg-gray-800 transition hover:bg-gray-700">
              &rarr;
            </button>
          </div>
        </div>

        <FooterSection
          title="Company"
          sectionKey="company"
          items={["About Us", "Careers", "Services", "Contact Us", "Our Team"]}
        />
        <FooterSection
          title="Solutions"
          sectionKey="solutions"
          items={["Product A", "Product B", "Integrations", "Demos", "Pricing"]}
        />
        <FooterSection
          title="Resources"
          sectionKey="resources"
          items={[
            "Blog",
            "Documentation",
            "Case Studies",
            "Tutorials",
            "Built with GS3",
          ]}
        />
        <FooterSection
          title="Partners"
          sectionKey="partners"
          items={[
            "Affiliate Program",
            "App Partners",
            "Solutions Partner",
            "Become a Partner",
          ]}
        />
      </div>

      <hr className="flex-grow border-white/10 mt-5" />

      <div className="mt-12 flex flex-col-reverse md:flex-row justify-between gap-10 font-orbitron">
        <div className="md:w-1/2 text-sm text-gray-300 space-y-2 leading-relaxed">
          <p>
            <strong className="text-2xl">Corporate Office</strong>
          </p>
          <p>(+91) 9733 140 877, (91) 7439 754 848</p>
          <p>
            <strong>WB, India:</strong> (+91) 8436-618-251
          </p>
          <p>
            <strong className="text-white">USA Office:</strong> 30 N Gould St
            Ste R, Sheridan, WY 82801
          </p>
          <p>
            <strong className="text-white">Contact Email:</strong>{" "}
            <a
              href="mailto:info@gs3solution.com"
              className="text-gray-200 underline hover:text-white transition"
            >
              info@gs3solution.com
            </a>
          </p>
          <p>
            <strong>Phone (USA):</strong> +1 930 200 5599
          </p>
          <p className="mt-4">
            GS3 is a registered trademark. GS3 Solution is a Unit of Girizen
            Software Sales Service Solution Private Limited.
          </p>
          <p>Terms & Condition | Privacy Policy | Refund Policy</p>
          <p>
            Copyright © 2025–2026 Girizen Software Sales Service Solution
            Private Limited. All Rights Reserved.
          </p>
          <p>
            CIN: U62091WB2024PTC273294, UAM: UDYAM-WB-10-0156215 (MSME-Small),
            ISO 9001:2015 Certified
          </p>
          <p>
            <strong>INDIA:</strong> 2/80, Opposite Indira Maidan, Near GTR Gate
            No 1, City: Kolkata, Pincode: 700074, West Bengal, India
          </p>
        </div>

        <div className="md:w-1/2">
          <h3 className="text-white font-semibold mb-2 text-2xl">
            Our Location
          </h3>
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] border-2 border-gray-400 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.1677980558597!2d-106.9574783239333!3d44.79776887107087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a6d206b%3A0x1887ab0668b2495c!2s30%20N%20Gould%20St%20Suite%20R%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1752318591254!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-none transition-transform duration-500 ease-in-out hover:scale-105"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 text-sm text-gray-400 text-center">
        <div className="flex items-center justify-center my-6 gap-6">
          <hr className="flex-grow border-white/10" />
          <div className="flex gap-5 text-xl">
            {[Facebook, Instagram, Youtube, Twitter, Linkedin].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-gray-200 transition"
                >
                  <Icon size={22} />
                </a>
              )
            )}
          </div>
          <hr className="flex-grow border-white/10" />
        </div>
        <p className="text-sm mb-2 text-gray-500">
          &copy; {new Date().getFullYear()} GS3 Solutions. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-white font-semibold">
          {[
            "Legal Stuff",
            "Privacy Policy",
            "Security",
            "Website Accessibility",
            "Manage Cookies",
          ]
            .map((text, idx) => (
              <a key={idx} href="#" className="hover:underline">
                {text}
              </a>
            ))
            .reduce(
              (acc, curr, idx, arr) =>
                idx < arr.length - 1
                  ? [...acc, curr, <span key={`sep-${idx}`}>|</span>]
                  : [...acc, curr],
              [] as React.ReactNode[]
            )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
