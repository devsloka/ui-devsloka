"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedSmartwatchProps {
  /** Content to display on the watch screen (URL or component) */
  screenContent?: string;
  /** Watch color */
  color?: "black" | "silver" | "gold";
  /** Band color */
  bandColor?: "black" | "white" | "blue" | "red" | "green";
  /** Scale factor for the watch size (default: 1) */
  scale?: number;
  /** Custom class name for the container */
  className?: string;
  /** Whether to fix position at center point (default: false) */
  fixPositionAtCenter?: boolean;
}

export default function AnimatedSmartwatch({
  screenContent = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  color = "black",
  bandColor = "black",
  scale = 1,
  className,
  fixPositionAtCenter = false,
}: AnimatedSmartwatchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format time values
  const hours = currentTime.getHours() % 12 || 12;
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
    currentTime.getDay()
  ];
  const date = currentTime.getDate();

  // Heart rate simulation
  const heartRate =
    72 + Math.floor(Math.sin(currentTime.getSeconds() * 0.1) * 5);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create scroll-based animations
  // If fixPositionAtCenter is true, maintain the center position (0.5) values after reaching the midpoint
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [-45, 0, 0] : [-45, 0, 45]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [10, 0, 0] : [10, 0, 10]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [-10, 0, 0] : [-10, 0, 10]
  );

  const scale3d = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [0.8, 1, 1] : [0.8, 1, 0.8]
  );

  // Lighting effects - also fixed at optimal values if fixPositionAtCenter is true
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [0.7, 1, 1] : [0.7, 1, 0.7]
  );

  const reflectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [0.1, 0.4, 0.4] : [0.1, 0.4, 0.1]
  );

  // Shadow effects - also fixed at optimal values if fixPositionAtCenter is true
  const shadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [0.2, 0.5, 0.5] : [0.2, 0.5, 0.2]
  );

  const shadowBlur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fixPositionAtCenter ? [10, 25, 25] : [10, 25, 10]
  );

  // Color styles with enhanced metallic effects
  const caseColors = {
    black: {
      main: "from-gray-800 to-gray-950",
      highlight: "from-gray-700 to-gray-800",
      edge: "bg-gray-700",
      button: "from-gray-600 to-gray-800",
    },
    silver: {
      main: "from-gray-300 to-gray-400",
      highlight: "from-gray-200 to-gray-300",
      edge: "bg-gray-200",
      button: "from-gray-400 to-gray-500",
    },
    gold: {
      main: "from-amber-200 to-amber-400",
      highlight: "from-amber-100 to-amber-300",
      edge: "bg-amber-100",
      button: "from-amber-300 to-amber-500",
    },
  };

  const bandColors = {
    black: {
      main: "from-gray-800 to-gray-950",
      texture: "opacity-10",
      highlight: "bg-gray-700",
    },
    white: {
      main: "from-gray-100 to-gray-200",
      texture: "opacity-5",
      highlight: "bg-white",
    },
    blue: {
      main: "from-blue-600 to-blue-800",
      texture: "opacity-10",
      highlight: "bg-blue-500",
    },
    red: {
      main: "from-red-600 to-red-800",
      texture: "opacity-10",
      highlight: "bg-red-500",
    },
    green: {
      main: "from-green-600 to-green-800",
      texture: "opacity-10",
      highlight: "bg-green-500",
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[150vh] w-full flex items-start justify-center",
        className
      )}
    >
      <div
        className="sticky top-[30vh] w-full max-w-xs mx-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        {/* Watch Container with 3D perspective */}
        <div className="relative w-full perspective-[2000px] flex flex-col items-center">
          {/* Upper watch band with enhanced realism */}
          <div
            className={cn(
              "w-[40%] h-24 rounded-t-2xl bg-gradient-to-b",
              bandColors[bandColor].main,
              "relative overflow-hidden"
            )}
          >
            {/* Band texture */}
            <div
              className={cn("absolute inset-0", bandColors[bandColor].texture)}
            >
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 4px)",
                }}
              ></div>
            </div>

            {/* Band highlights */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20"></div>

            {/* Band connection to watch */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[10%] bg-gradient-to-b from-black/20 to-transparent"></div>

            {/* Band clasp */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[10%] rounded-sm bg-black/10 flex items-center justify-center">
              <div
                className={cn(
                  "w-[80%] h-[2px]",
                  bandColors[bandColor].highlight,
                  "opacity-30"
                )}
              ></div>
            </div>
          </div>

          {/* Watch body with animations and enhanced realism */}
          <motion.div
            className="relative w-[80%] aspect-square origin-center"
            style={{
              rotateZ,
              rotateX,
              rotateY,
              scale: scale3d,
            }}
          >
            {/* Watch case with enhanced metallic effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-3xl border-[3px] border-black/10 shadow-lg overflow-hidden",
                "bg-gradient-to-b",
                caseColors[color].main
              )}
            >
              {/* Metallic texture */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                }}
              ></div>

              {/* Circular brushed metal texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "conic-gradient(from 0deg, rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1))",
                }}
              ></div>

              {/* Case highlights for realism */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-full"></div>
              <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10 rounded-full"></div>
              <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10 rounded-full"></div>
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20 rounded-full"></div>

              {/* Enhanced digital crown */}
              <div className="absolute top-1/2 -right-[8px] -translate-y-1/2 h-[30%] w-[8px] rounded-r-md overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b",
                    caseColors[color].button
                  )}
                ></div>
                <div className="absolute inset-0 flex flex-col justify-around items-center py-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-[4px] h-[1px] bg-black/20"></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Side button */}
              <div className="absolute top-[30%] -right-[6px] h-[15%] w-[6px] rounded-r-md overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b",
                    caseColors[color].button
                  )}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Screen with enhanced bezel */}
              <motion.div
                className="absolute inset-[6px] rounded-2xl bg-black overflow-hidden"
                style={{
                  filter: `brightness(${brightness})`,
                }}
              >
                {/* Watch face with live time */}
                <div className="relative w-full h-full bg-black">
                  {/* Background image with reduced opacity */}
                  {screenContent && (
                    <div className="absolute inset-0 opacity-40">
                      <img
                        src={screenContent || "/placeholder.svg"}
                        alt="Watch face background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Digital time display with enhanced typography */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-4xl font-bold tracking-tight flex items-baseline">
                      <span>{hours}</span>
                      <span className="animate-pulse">:</span>
                      <span>{minutes}</span>
                      <span className="text-sm ml-1 opacity-60">{seconds}</span>
                    </div>
                    <div className="text-sm mt-1 opacity-80 font-medium tracking-wide">
                      {day} {date}
                    </div>

                    {/* Watch complications with enhanced design */}
                    <div className="absolute bottom-[15%] left-0 right-0 flex justify-around text-xs">
                      {/* Heart rate */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border border-red-500/50 mb-1 flex items-center justify-center">
                          <div className="text-red-500 animate-pulse">♥</div>
                        </div>
                        <span className="text-red-400">{heartRate}</span>
                      </div>

                      {/* Steps */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border border-green-500/50 mb-1 flex items-center justify-center">
                          <div className="w-3 h-3">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-green-500"
                            >
                              <path d="M19 15l-7-7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-green-400">8.2k</span>
                      </div>

                      {/* Weather */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border border-blue-500/50 mb-1 flex items-center justify-center">
                          <div className="w-3 h-3">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-blue-500"
                            >
                              <path d="M12 2v2m0 16v2M4 12H2m20 0h-2m-8 8a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-blue-400">18°</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced screen reflections */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent"
                    style={{ opacity: reflectionOpacity }}
                  ></motion.div>

                  {/* Screen edge vignette */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
                    }}
                  ></div>

                  {/* Subtle screen texture */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 30%)",
                    }}
                  ></div>
                </div>
              </motion.div>
            </div>

            {/* Watch sensors on the back */}
            <div className="absolute inset-0 rounded-3xl z-[-1] bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-b from-gray-600 to-gray-700 flex items-center justify-center">
                  {/* Heart rate sensor */}
                  <div className="w-[60%] h-[60%] rounded-full bg-black flex items-center justify-center">
                    <div className="w-[70%] h-[70%] rounded-full bg-green-900/30 flex items-center justify-center">
                      <div className="w-[50%] h-[50%] rounded-full bg-green-500/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small charging contacts */}
              <div className="absolute bottom-[20%] flex gap-2">
                <div className="w-2 h-1 rounded-full bg-gray-600"></div>
                <div className="w-2 h-1 rounded-full bg-gray-600"></div>
              </div>

              {/* Serial number */}
              <div className="absolute bottom-[10%] text-[6px] text-gray-600 opacity-60">
                SN: WCH94720XZYA
              </div>
            </div>
          </motion.div>

          {/* Lower watch band with enhanced realism */}
          <div
            className={cn(
              "w-[40%] h-24 rounded-b-2xl bg-gradient-to-b",
              bandColors[bandColor].main,
              "relative overflow-hidden"
            )}
          >
            {/* Band texture */}
            <div
              className={cn("absolute inset-0", bandColors[bandColor].texture)}
            >
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 4px)",
                }}
              ></div>
            </div>

            {/* Band highlights */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20"></div>

            {/* Band connection to watch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[10%] bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Band adjustment holes */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[60%] flex justify-between">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[4px] h-[4px] rounded-full bg-black/20"
                ></div>
              ))}
            </div>

            {/* Band buckle */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[15%] rounded-sm bg-black/10 flex items-center justify-center">
              <div
                className={cn(
                  "w-[60%] h-[4px] rounded-sm",
                  bandColors[bandColor].highlight,
                  "opacity-30"
                )}
              ></div>
            </div>
          </div>

          {/* Enhanced dynamic shadow with more realistic shape */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[60%] rounded-[50%]"
            style={{
              bottom: -20,
              height: 20,
              opacity: shadowOpacity,
              filter: `blur(${shadowBlur}px)`,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
            }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
