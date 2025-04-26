"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  logo: string;
  title: string;
  description: string;
  background?: "blue" | "white" | "dark";
}

const StepCard: React.FC<StepCardProps> = ({
  logo,
  title,
  description,
  background = "blue",
}) => {
  const getBgColor = () => {
    switch (background) {
      case "blue":
        return "bg-gradient-to-br from-blue-600 to-blue-900";
      case "white":
        return "bg-gradient-to-br from-white to-zinc-200 dark:from-gray-100 dark:to-gray-500";
      case "dark":
        return "bg-gradient-to-br from-zinc-500 to-black dark:from-zinc-700 dark:to-black";
      default:
        return "bg-gradient-to-br from-blue-600 to-blue-900";
    }
  };

  const getTextColor = () => {
    return background === "white" ? "text-black" : "text-white";
  };

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${getBgColor()} p-6 `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-6">
        <span className={`font-mono text-sm ${getTextColor()}`}>{logo}</span>
      </div>

      {/* Content */}
      <div className="h-full flex flex-col py-6">
        <div className="flex-grow flex items-center">
          <div>
            <h3
              className={`text-2xl md:text-3xl font-bold mb-4 ${getTextColor()}`}
            >
              {title}
            </h3>
            <p className={`${getTextColor()} opacity-90`}>{description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${getTextColor()} opacity-80 hover:opacity-100`}
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${getTextColor()} opacity-80 hover:opacity-100`}
            >
              <MessageCircle size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${getTextColor()} opacity-80 hover:opacity-100`}
            >
              <Share size={20} />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${getTextColor()} opacity-80 hover:opacity-100`}
          >
            <Bookmark size={20} />
          </motion.button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default StepCard;
