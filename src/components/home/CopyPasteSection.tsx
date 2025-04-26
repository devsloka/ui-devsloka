"use client";

import React from "react";
import { motion } from "framer-motion";
import StepCard from "./StepCard";

const CopyPasteSection: React.FC = () => {
  const steps = [
    {
      logo: "1st",
      title: "Copy",
      description: "Select the component you need from our extensive library",
      background: "blue" as const,
    },
    {
      logo: "2nd",
      title: "Paste",
      description: "Paste it directly into your project's UI folder",
      background: "white" as const,
    },
    {
      logo: "3rd",
      title: "Use",
      description: "Import and use the component anywhere in your project",
      background: "dark" as const,
    },
  ];

  return (
    <section className="lg:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Just copy, paste, and build!
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Drop the code into your UI folder and start using the components
            right away. No setup hassle — just pure productivity.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              logo={step.logo}
              title={step.title}
              description={step.description}
              background={step.background}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CopyPasteSection;
