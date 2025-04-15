"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  accent: "blue" | "purple" | "green" | "amber";
}

export default function TestimonialsBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "This product has completely transformed our workflow. The intuitive interface and powerful features have increased our team's productivity by 40%. I can't imagine going back to our old system.",
      accent: "blue",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      company: "CodeCraft",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "The API documentation is excellent, and integration was seamless. We were able to deploy within days instead of weeks. The support team was incredibly responsive when we had questions.",
      accent: "purple",
    },
    {
      id: 3,
      name: "Olivia Rodriguez",
      role: "Product Manager",
      company: "InnovateCo",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "After evaluating several solutions, we chose this platform for its robust feature set and scalability. It has exceeded our expectations and helped us deliver projects ahead of schedule.",
      accent: "green",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "CEO",
      company: "StartupBoost",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "As a startup founder, I needed a solution that could grow with my business. This platform has been the perfect fit, offering enterprise-level features at a price point that makes sense for us.",
      accent: "amber",
    },
  ];

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getAccentColor = (accent: Testimonial["accent"], isDark: boolean) => {
    const colors = {
      blue: {
        light: "bg-blue-50 border-blue-200 text-blue-600",
        dark: "dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400",
      },
      purple: {
        light: "bg-purple-50 border-purple-200 text-purple-600",
        dark: "dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-400",
      },
      green: {
        light: "bg-green-50 border-green-200 text-green-600",
        dark: "dark:bg-green-950/40 dark:border-green-800 dark:text-green-400",
      },
      amber: {
        light: "bg-amber-50 border-amber-200 text-amber-600",
        dark: "dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400",
      },
    };

    return isDark ? colors[accent].dark : colors[accent].light;
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Here&apos;s what our customers
          have to say about their experience.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -top-12 left-0 opacity-10 dark:opacity-5">
          <Quote size={120} className="text-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Testimonial Cards */}
          <div className="lg:col-span-8 relative">
            <Card
              className={cn(
                "overflow-hidden transition-all duration-500 h-full border-2",
                isAnimating ? "opacity-80 scale-95" : "opacity-100 scale-100",
                `border-${activeTestimonial.accent}-200 dark:border-${activeTestimonial.accent}-800`
              )}
            >
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < activeTestimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic leading-relaxed">
                    {activeTestimonial.text}
                  </p>
                </div>

                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage
                      src={activeTestimonial.avatar || "/placeholder.svg"}
                      alt={activeTestimonial.name}
                    />
                    <AvatarFallback>
                      {activeTestimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-medium">{activeTestimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {activeTestimonial.role}, {activeTestimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation and Indicators */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div
              className={cn(
                "p-6 rounded-xl border-2 transition-colors",
                getAccentColor(activeTestimonial.accent, false),
                getAccentColor(activeTestimonial.accent, true)
              )}
            >
              <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">✓</div>
                  <span>Industry-leading customer satisfaction</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">✓</div>
                  <span>24/7 dedicated support team</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">✓</div>
                  <span>Continuous feature updates</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">✓</div>
                  <span>Flexible pricing plans</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Customer Stories</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-2">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isAnimating) return;
                        setIsAnimating(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }}
                      className={cn(
                        "flex-1 h-2 rounded-full transition-all duration-300",
                        isActive
                          ? [
                              testimonial.accent === "blue" && "bg-blue-500",
                              testimonial.accent === "purple" &&
                                "bg-purple-500 ",
                              testimonial.accent === "green" && "bg-green-500",
                              testimonial.accent === "amber" && "bg-amber-500",
                            ]
                          : "bg-gray-200 dark:bg-gray-700"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
