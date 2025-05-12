"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Shield } from "lucide-react";

const IconRadio = () => {
  const [selected, setSelected] = useState("favorite");

  const options = [
    { id: "favorite", label: "Favorite", icon: Heart },
    { id: "popular", label: "Popular", icon: Star },
    { id: "trending", label: "Trending", icon: Zap },
    { id: "secure", label: "Secure", icon: Shield },
  ];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Icon Radio Selection</h2>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isSelected = selected === option.id;
          const Icon = option.icon;

          return (
            <motion.div
              key={option.id}
              className={`
            cursor-pointer flex flex-col items-center space-y-2
            ${
              isSelected
                ? "text-[#0A6EFF]"
                : "text-primary/50 hover:text-primary/80"
            }
          `}
              onClick={() => setSelected(option.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`
              w-16 h-16 rounded-full border flex items-center justify-center
              ${isSelected ? "border-[#0A6EFF]" : ""}
            `}
                animate={{
                  scale: isSelected ? [1, 1.2, 1] : 1,
                  rotate: isSelected ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.5, 1],
                  ease: "easeInOut",
                }}
              >
                <Icon
                  className={`h-6 w-6 ${isSelected ? "text-[#0A6EFF]" : ""}`}
                />
              </motion.div>
              <span className="font-medium">{option.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IconRadio;
