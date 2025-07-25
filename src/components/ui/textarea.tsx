"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            #3b82f6,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        ref={ref}
        {...props}
        className={cn(
          `shadow-input flex w-full rounded-md  bg-transparent px-3 py-2 text-sm 
          text-black transition duration-400 group-hover/input:shadow-none 
          placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 
          focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 
          dark:bg-black dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] 
          dark:focus-visible:ring-neutral-600 border-gray-700 border-2 border-solid`,
          className
        )}
      />
    </motion.div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
