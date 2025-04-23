"use client";

import React from "react";
import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import Image from "next/image";
import Spotlight from "../templates/spotlight-background";

const HeroSectionBlock = () => {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-20">
        {[...Array(144)].map((_, i) => (
          <div
            key={i}
            className="border-[0.5px] w- border-gray-300 dark:border-gray-600"
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg"></div>
          <span className="text-black dark:text-white text-xl font-semibold">
            Devsloka
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "About us", "Products", "Features"].map((item) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-2 rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
        >
          Book Now
        </motion.button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
        {/* Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="px-6 py-2 rounded-full border bg-gradient-to-r from-white via-gray-100 to-gray-200 dark:from-zinc-700 dark:via-zinc-900 dark:to-black text-black dark:text-white text-xs lg:text-sm shadow-md dark:shadow-xl transition-colors duration-300">
            All in one Saas Dashboard, Get 50% Off Now
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6"
        >
          Efficiency Management
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg mb-12"
        >
          Optimize Operations, Elevate Performance. Unlock Your Team&apos;s Full
          Potential with Seamless Workflow Solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Try Free Version
          </button>
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg hover:border-black dark:hover:border-white transition-colors">
            Book Your Demo
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 w-full max-w-5xl mx-auto"
        >
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dashboard Preview"
            className="w-full rounded-lg shadow-2xl"
            width={1920}
            height={1080}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default HeroSectionBlock;
