"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CardRadio() {
  const [selected, setSelected] = useState("option1");

  const options = [
    {
      id: "option1",
      title: "Basic Plan",
      description: "Perfect for starters",
      price: "$9/mo",
    },
    {
      id: "option2",
      title: "Pro Plan",
      description: "For growing businesses",
      price: "$19/mo",
    },
    {
      id: "option3",
      title: "Enterprise",
      description: "For large organizations",
      price: "$49/mo",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Card Radio Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`relative bg-background dark:bg-zinc-900 cursor-pointer rounded-xl border-2 p-4 ${
              selected === option.id ? "border-[#0A6EFF]" : ""
            }`}
            onClick={() => setSelected(option.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-lg">{option.title}</h3>
              <p className="text-gray-500 flex-grow">{option.description}</p>
              <p className="font-bold text-xl mt-2">{option.price}</p>
            </div>

            {selected === option.id && (
              <motion.div
                className="absolute top-2 right-2 bg-[#0A6EFF] text-white rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
