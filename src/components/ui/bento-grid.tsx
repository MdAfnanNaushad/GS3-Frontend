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
  caseStudyLink,
}: {
  className?: string;
  title?: string | React.ReactNode;
  imageUrl: string;
  liveLink: string;
  caseStudyLink: string;
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
        "group/bento shadow-input w-full row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-2 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      <DirectionAwareHover imageUrl={imageUrl} className="w-full">
        <div className="w-full h-full flex flex-col justify-between py-1 gap-2">
          <div className="w-full text-white font-sm font-orbitron text-2xl flex gap-2 items-center">
            <Aperture /> {title}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center w-full mt-4 gap-4 sm:gap-6">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="default"
                className="font-orbitron w-[100px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 hover:backdrop-blur-[2px] hover:text-gray-900 cursor-pointer backdrop-blur-[1px] duration-700"
              >
                <Globe className="mr-1" />
                Live
              </Button>
            </a>
            <Link to={caseStudyLink}>
              <Button
                variant="default"
                className="font-orbitron w-[150px] border border-gray-400/20 bg-neutral-400/20 text-neutral-200 hover:backdrop-blur-[2px] hover:text-gray-900 cursor-pointer backdrop-blur-[1px] duration-700"
              >
                <SearchSlash className="mr-1" />
                Case Study
              </Button>
            </Link>
          </div>
        </div>
      </DirectionAwareHover>
    </div>
  );
};
