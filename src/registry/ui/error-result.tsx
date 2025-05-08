"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";

const MotionCard = motion(Card);

const ErrorResult = () => {
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const cardShake = {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 0],
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        // repeat: Infinity,
        // repeatType: "loop" as const,
      },
    },
  };

  return (
    <MotionCard
      className="max-w-sm mx-auto shadow-lg"
      variants={cardShake}
      initial="initial"
      animate="animate"
    >
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-32 h-32">
          <DotLottieReact src="/dot-lottie/error.lottie" loop autoplay />
        </div>

        {/* Animated Heading */}
        <motion.h2
          initial="initial"
          animate="animate"
          variants={textVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4 text-xl font-semibold text-center text-red-600"
        >
          Error Occurred!
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial="initial"
          animate="animate"
          variants={textVariants}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="mt-2 text-center text-gray-600"
        >
          There was a problem processing your request. Please try again.
        </motion.p>
      </CardContent>
    </MotionCard>
  );
};

export default ErrorResult;
