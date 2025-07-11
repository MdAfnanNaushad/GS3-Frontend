import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

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
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
      if (ref.current && isMobile) {
        setMaxHeight(
          openSection === sectionKey ? `${ref.current.scrollHeight}px` : "0px"
        );
      }
    }, [openSection, isMobile]);

    return (
      <div>
        <button
          className="mb-4 flex justify-between items-center w-full md:cursor-default text-white font-semibold"
          onClick={() => isMobile && toggleSection(sectionKey)}
        >
          <span>{title}</span>
          {isMobile && (
            <ChevronDown
              className={`ml-2 transform transition-transform duration-300 ${
                openSection === sectionKey ? "rotate-180" : ""
              }`}
              size={18}
            />
          )}
        </button>
        <ul
          ref={ref}
          style={{ maxHeight: !isMobile ? "none" : maxHeight }}
          className={`transition-all duration-500 ease-in-out overflow-hidden space-y-2 text-sm ${
            !isMobile || openSection === sectionKey
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-all duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-black text-white px-6 md:px-20 pt-16 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Branding & Signup */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/logo/GS3_logo.png"
              alt="GS3 Logo"
              className="h-8 w-auto"
            />
            <h2 className="text-2xl font-bold">GS3 Solutions</h2>
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

        {/* Footer Sections */}
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
          items={["Blog", "Documentation", "Case Studies", "Tutorials", "Built with GS3"]}
        />
        <FooterSection
          title="Partners"
          sectionKey="partners"
          items={["Affiliate Program", "App Partners", "Solutions Partner", "Become a Partner"]}
        />
      </div>

      {/* Divider Section */}
      <div className="max-w-7xl mx-auto mt-12 text-sm text-gray-400 text-center">
        <div className="flex items-center justify-center my-6 gap-6">
          <hr className="flex-grow border-white/10" />
          <div className="flex gap-5 text-xl">
            <a href="#" className="hover:text-gray-200 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Youtube size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Linkedin size={20} />
            </a>
          </div>
          <hr className="flex-grow border-white/10" />
        </div>
        <p className="text-sm mb-2 text-gray-500">
          &copy; {new Date().getFullYear()} GS3 Solutions. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-white font-semibold">
          <a href="#" className="hover:underline">Legal Stuff</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Security</a>
          <span>|</span>
          <a href="#" className="hover:underline">Website Accessibility</a>
          <span>|</span>
          <a href="#" className="hover:underline">Manage Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
