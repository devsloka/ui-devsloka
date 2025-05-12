"use client";

import React from "react";
import { motion } from "motion/react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
  animationDuration?: number;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  gradient = "bg-gradient-to-r from-[#E43D19] via-[#3472BC] to-[#06D7D7]",
  animate = true,
  animationDuration = 4,
}) => {
  const animationProps = animate
    ? {
        animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
        transition: {
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear",
        },
      }
    : {};

  return (
    <motion.span
      className={`relative ${gradient} bg-clip-text text-transparent font-edu ${className}`}
      style={{
        backgroundSize: animate ? "200% 200%" : "100% 100%",
      }}
      {...animationProps}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
