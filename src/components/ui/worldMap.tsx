"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 120, grid: "diagonal" }); // Increased resolution

  const svgMap = map.getSVG({
    radius: 0.25,
    color: "#1e90ff70", 
    shape: "circle",
    backgroundColor: "transparent", 
  });

  const projectPoint = (lat: number, lng: number) => {
    // Manually adjust Kolkata origin projection to match svgMap rendering
    const viewBoxWidth = 900;
    const viewBoxHeight = 450;

    // Tailor projection to align Kolkata correctly in the viewBox
    const x = ((lng + 180) / 360) * viewBoxWidth; // -180 to 180 → 0 to 900
    const y = ((90 - lat) / 180) * viewBoxHeight; // 90 to -90 → 0 to 450

    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 60;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full  aspect-[2.5/1]  rounded-lg relative font-sans">
      {/* SVG map image */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-cover pointer-events-none select-none"
        alt="world map"
        height="500"
        width="1200"
        draggable={false}
      />

      {/* Animated overlay paths */}
      <svg
        ref={svgRef}
        viewBox="0 0 900 450"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          const pathId = `motion-path-${i}`;

          return (
            <g key={`group-${i}`}>
              {/* Curved path */}
              <motion.path
                id={pathId}
                d={createCurvedPath(start, end)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.3 * i,
                  ease: "easeInOut",
                }}
              />

              {/* Animated moving dot */}
              <circle r="3" fill={lineColor}>
                <animateMotion
                  dur="2s"
                  begin={`${0.3 * i}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref={`#${pathId}`} />
                </animateMotion>
              </circle>

              {/* Start and end pulsing dots */}
              {[start, end].map((point, j) => (
                <g key={`pulse-${j}`}>
                  <circle cx={point.x} cy={point.y} r="2" fill={lineColor} />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="2"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
