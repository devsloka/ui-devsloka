"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Card, CardContent } from "../ui/card";

const SuccessResult: React.FC = () => {
  // Animation variants for reusability
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <Card className="max-w-sm mx-auto shadow-lg">
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-32 h-32">
          <DotLottieReact src="/dot-lottie/success.lottie" loop autoplay />
        </div>

        {/* Animated Heading */}
        <motion.h2
          initial="initial"
          animate="animate"
          variants={textVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4 text-xl font-semibold text-center text-green-600"
        >
          Success!
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial="initial"
          animate="animate"
          variants={textVariants}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2, // Staggered animation
          }}
          className="mt-2 text-center text-gray-600"
        >
          Your operation was completed successfully.
        </motion.p>
      </CardContent>
    </Card>
  );
};

export default SuccessResult;
