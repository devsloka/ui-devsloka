"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const EmptyResult = () => {
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <MotionCard
      className="max-w-sm mx-auto shadow-lg"
      initial="initial"
      animate="animate"
    >
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-32 h-32">
          <DotLottieReact src="/dot-lottie/empty.lottie" loop autoplay />
        </div>

        {/* Animated Heading */}
        <motion.h2
          initial="initial"
          animate="animate"
          variants={textVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4 text-xl font-semibold text-center"
        >
          No Data Found
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
          It looks like there&apos;s nothing here yet!
        </motion.p>
      </CardContent>
    </MotionCard>
  );
};

export default EmptyResult;
