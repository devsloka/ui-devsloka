"use client";
import type React from "react";
import { useState, useEffect } from "react";
import {
  LucideIcon,
  ArrowRight,
  Play,
  Sparkles,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

function FloatingCard({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card/20 backdrop-blur-2xl rounded-2xl p-6 border border-border/10 hover:border-primary/20 transition-all duration-300 hover:scale-105">
      <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
        <Icon size={24} className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Send money to 180+ countries with real-time exchange rates",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your transactions are protected with enterprise-grade encryption",
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description: "Lightning-fast transfers that arrive in minutes, not days",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* Animated Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div
          className={`transition-all duration-2000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <h1 className="text-[25rem] font-bold text-muted/30 leading-none">
            SEND
          </h1>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          <FloatingCard delay={200}>
            <div className="inline-flex items-center gap-2 bg-card/40 backdrop-blur-xl px-4 py-2 rounded-full border border-border/10 mb-8">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Trusted by 10M+ users worldwide
              </span>
            </div>
          </FloatingCard>

          <FloatingCard delay={400}>
            <h1 className="text-7xl md:text-9xl font-bold mb-6 leading-none">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Send Money
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Anywhere
              </span>
            </h1>
          </FloatingCard>

          <FloatingCard delay={600}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of international money transfers. Fast,
              secure, and transparent with real-time tracking and the best
              exchange rates.
            </p>
          </FloatingCard>

          <FloatingCard delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                Start Sending Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="group bg-card/40 backdrop-blur-xl text-foreground px-8 py-4 rounded-full text-lg font-medium border border-border/10 hover:border-primary/20 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                <div className="bg-primary/10 rounded-full p-2">
                  <Play size={16} className="text-primary ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
          </FloatingCard>
        </div>

        {/* Stats Section */}
        <FloatingCard delay={1000}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                $2.5B+
              </div>
              <div className="text-muted-foreground">Transferred Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                180+
              </div>
              <div className="text-muted-foreground">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
          </div>
        </FloatingCard>

        {/* Features Grid */}
        <FloatingCard delay={1200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </FloatingCard>

        {/* Bottom CTA */}
        <FloatingCard delay={1400}>
          <div className="text-center mt-20">
            <div className="bg-card/20 backdrop-blur-2xl rounded-3xl p-12 border border-border/10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to revolutionize your transfers?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join millions who trust us with their international money
                transfers. Get started in less than 2 minutes.
              </p>
              <button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-4 rounded-full text-lg font-medium hover:scale-105 transition-all duration-300 shadow-2xl">
                Create Free Account
              </button>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
}

export default HeroSection;
