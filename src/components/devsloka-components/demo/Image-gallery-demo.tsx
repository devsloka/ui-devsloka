"use client";
import React from "react";
import { Image, ImageGallery } from "../Image-gallery";
import { motion } from "motion/react";

const ImageGalleryDemo = () => {
  return (
    <div>
      {/* Header */}
      <div className="relative overflow-hidden py-24 sm:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Dynamic Image Gallery
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                A responsive gallery with smooth scroll animations and
                accessibility features. Scroll down to see the animations in
                action.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <ImageGallery
        duration={800}
        stagger={100}
        easing="cubic-bezier(0.16, 1, 0.3, 1)"
        images={images}
      />
    </div>
  );
};

export default ImageGalleryDemo;

const images: Image[] = [
  {
    url: "https://plus.unsplash.com/premium_photo-1741858822120-67b84694c095?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Architectural detail of a modern building with geometric patterns",
    width: "1200",
    height: "800",
  },
  {
    url: "https://images.unsplash.com/photo-1648140574809-29426528395e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Abstract art installation with vibrant colors",
    width: "1200",
    height: "800",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Minimalist interior design with natural light",
    width: "1200",
    height: "800",
  },
  {
    url: "https://images.unsplash.com/photo-1648140574809-29426528395e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Urban landscape photography at sunset",
    width: "1200",
    height: "800",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Contemporary sculpture in an outdoor setting",
    width: "1200",
    height: "800",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?q=80&w=1200&h=800&auto=format&fit=crop",
    alt: "Digital art installation with interactive elements",
    width: "1200",
    height: "800",
  },
];
