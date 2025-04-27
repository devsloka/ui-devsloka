"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop",
    bio: "Former tech lead at Google, passionate about building innovative solutions.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop",
    bio: "12+ years experience in scaling distributed systems and cloud architecture.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Aisha Patel",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop",
    bio: "Award-winning designer specializing in user-centered product experiences.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "David Kim",
    role: "Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&h=800&fit=crop",
    bio: "Open source contributor and advocate for developer experience.",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function TeamBlock() {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-primary">
            Our Team
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Meet the innovators
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Passionate experts committed to transforming ideas into reality.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end"
                >
                  <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white/80">{member.bio}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={member.social.twitter}
                        className="text-white/80 hover:text-white"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.github}
                        className="text-white/80 hover:text-white"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-white/80 hover:text-white"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
