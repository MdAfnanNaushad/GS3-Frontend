import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./direction-aware-hover";
import { Aperture, Globe, SearchSlash } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] lg:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  imageUrl,
  liveLink,
  caseStudyId,
}: {
  className?: string;
  title?: string | React.ReactNode;
  imageUrl?: string;
  liveLink?: string;
  caseStudyId?: { _id: string } | null;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group/bento shadow-input w-full flex-col rounded-xl border border-neutral-200 bg-white transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none overflow-hidden",
        className
      )}
    >
      {/* --- MOBILE VIEW --- */}
      {/* This layout is visible by default and hidden on medium screens and up. */}
      {/* The image is edge-to-edge, and padding is applied only to the content below. */}
      <div className="block md:hidden">
        <img
          src={imageUrl}
          alt={typeof title === "string" ? title : "Project image"}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 bg-black">
          <div className="w-full text-white font-sm font-orbitron text-xl flex gap-2 items-center mb-4">
            <Aperture size={20} /> {title}
          </div>
          <div className="flex flex-row justify-start items-center w-full gap-4">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="font-orbitron w-[100px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 text-sm">
                  <Globe className="mr-1" size={16} />
                  Live
                </Button>
              </a>
            )}
            {caseStudyId && (
              <Link to={`/case-study/${caseStudyId._id}`}>
                <Button variant="default" className="font-orbitron w-[150px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 text-sm">
                  <SearchSlash className="mr-1" size={16} />
                  Case Study
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      {/* This layout is hidden on mobile. The wrapper div restores the original padding and flex behavior for desktop. */}
      <div className="hidden md:flex w-full h-full flex-col justify-between px-3.5 py-2">
        {imageUrl && (
          <DirectionAwareHover
            imageUrl={imageUrl}
            className="w-full h-full rounded-t-md"
          >
            <div className="w-full h-full flex flex-col justify-between py-1 gap-2">
              <div className="w-full text-white font-sm font-orbitron text-2xl flex gap-2 items-center">
                <Aperture /> {title}
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center w-full mt-4 gap-4 sm:gap-6">
                {liveLink && (
                  <a href={liveLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="default"
                      className="font-orbitron w-[100px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 hover:backdrop-blur-[2px] hover:text-gray-900 cursor-pointer backdrop-blur-[1px] duration-700"
                    >
                      <Globe className="mr-1" />
                      Live
                    </Button>
                  </a>
                )}
                {caseStudyId && (
                  <Link to={`/case-study/${caseStudyId._id}`}>
                    <Button
                      variant="default"
                      className="font-orbitron w-[150px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 hover:backdrop-blur-[2px] hover:text-gray-900 cursor-pointer backdrop-blur-[1px] duration-700"
                    >
                      <SearchSlash className="mr-1" />
                      Case Study
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </DirectionAwareHover>
        )}
      </div>
    </div>
  );
};
