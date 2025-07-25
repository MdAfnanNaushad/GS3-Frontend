"use client";

import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export interface TimelineEntry {
  title: ReactNode;
  content: ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

const TimelineItem = ({ title, content }: TimelineEntry) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entryRef, {
    margin: "-20% 0px -60% 0px",
    once: false,
  });

  return (
    <div ref={entryRef} className="flex justify-start pt-10 md:pt-20 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
       
        <div
          className={cn(
            "h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center transition-all duration-100",
            isInView ? "border-4" : ""
          )}
          style={
            isInView
              ? {
                  background:
                    "linear-gradient(#000000, #000000) padding-box, linear-gradient(280deg, rgb(99, 102, 241), rgb(236, 72, 153)) border-box",
                  border: "4px solid transparent",
                  borderRadius: "9999px",
                }
              : undefined
          }
        >
        
          <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
        </div>

        <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-300 dark:text-gray-300">
          {title}
        </h3>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block text-5xl sm:text-5xl mb-4 text-left font-semibold text-neutral-500 dark:text-neutral-500">
          {title}
        </h3>
        {content}
      </div>
    </div>
  );
};

export const Timeline = ({ data, className }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 30%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [1, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-transparent font-sans md:px-2 ",
        className
      )}
      ref={containerRef}
    >
      <div ref={ref} className="relative mx-auto pb-20 ">
        {data.map((item, index) => (
          <TimelineItem key={index} title={item.title} content={item.content} />
        ))}

        
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
