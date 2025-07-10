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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
    const [height, setHeight] = useState("0px");

    useEffect(() => {
      if (ref.current) {
        setHeight(
          openSection === sectionKey ? `${ref.current.scrollHeight}px` : "0px"
        );
      }
    }, [openSection]);

    return (
      <div>
        <button
          className="font-semibold mb-4 flex justify-between items-center w-full md:cursor-default"
          onClick={() => isMobile && toggleSection(sectionKey)}
        >
          {title}
          <ChevronDown
            className={`ml-2 transition-transform ${
              openSection === sectionKey ? "rotate-180" : ""
            }`}
            size={18}
          />
        </button>
        <ul
          ref={ref}
          style={{ maxHeight: !isMobile ? "none" : height }}
          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden space-y-2 text-sm ${
            !isMobile || openSection === sectionKey
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {items.map((item, idx) => (
            <li key={idx}>
              <a href="#" className="hover:text-gray-300 transition-all duration-300">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="bg-gradient-to-r from-[#0d0d1a] to-[#1b1b1b] text-white px-6 md:px-20 pt-16 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Branding & Signup */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo/GS3_logo.png" alt="GS3 Logo" className="h-8 w-auto" />
            <h2 className="text-2xl font-bold">GS3 Solutions</h2>
          </div>
          <p className="mb-4">Sign-up and get updates</p>
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full text-black focus:outline-none"
            />
            <button className="bg-[#3d1c92] px-4 py-2 text-white">&rarr;</button>
          </div>
          <div className="flex gap-3 mt-6 ">
            <a href="#">
              <Linkedin />
            </a>
            <a href="#">
              <Youtube />
            </a>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Twitter />
            </a>
          </div>
        </div>

        {/* Footer Columns with Dropdowns */}
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
          title="Industries"
          sectionKey="industries"
          items={["E-Commerce", "Education", "Healthcare", "SaaS", "See All →"]}
        />

        <FooterSection
          title="Resources"
          sectionKey="resources"
          items={["Blog", "Documentation", "Case Studies", "Tutorials", "Built with GS3"]}
        />

        <FooterSection
          title="Community"
          sectionKey="community"
          items={["Help Center", "Community Forum", "Affiliate Program", "Partners"]}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-12 border-t border-white/10 pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
        <p>&copy; {new Date().getFullYear()} GS3 Solutions. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;