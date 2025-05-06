"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ArrowRight, Zap, Sparkles, Cpu } from "lucide-react";

const FeaturesBlockFour = () => {
  const { theme } = useTheme();
  return (
    <section className="relative w-full overflow-hidden px-4 py-16">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 -z-10 ">
        <svg
          className="h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={theme === "dark" ? "#ffffff" : "#000000"}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke={theme === "dark" ? "#ffffff" : "#000000"}
                strokeWidth="1"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 px-3 py-1 text-sm" variant="secondary">
              Innovative Design
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Features That <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 dark:from-pink-400 dark:to-violet-400">
                Transform
              </span>{" "}
              Work
            </h2>
            <p className="mb-8 text-lg text-muted-foreground max-w-lg">
              Our platform combines cutting-edge technology with intuitive
              design to deliver an unparalleled user experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              {
                title: "Seamless Integration",
                description:
                  "Connect with your existing tools and workflows without disruption.",
                icon: <Zap className="h-5 w-5" />,
              },
              {
                title: "Real-time Collaboration",
                description:
                  "Work together with your team in real-time, from anywhere in the world.",
                icon: <Sparkles className="h-5 w-5" />,
              },
              {
                title: "Advanced Analytics",
                description:
                  "Gain valuable insights with comprehensive data visualization tools.",
                icon: <Cpu className="h-5 w-5" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 dark:from-pink-400 dark:to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Card className="relative h-full border-0 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    className="mt-4 ml-12 flex items-center text-sm text-primary font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="mr-1">Learn more</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.span>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBlockFour;
