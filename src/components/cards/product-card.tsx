"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { ShoppingCart, Heart, Star, RotateCcw } from "lucide-react"

export function ProductCard() {
  const [isHovering, setIsHovering] = useState(false)
  const [isRotated, setIsRotated] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRotated(!isRotated)

    if (!isRotated) {
      controls.start({
        rotateY: 180,
        transition: { duration: 0.6 },
      })
    } else {
      controls.start({
        rotateY: 0,
        transition: { duration: 0.6 },
      })
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="relative w-full aspect-[3/4] perspective-1000">
      <motion.div
        ref={cardRef}
        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl bg-white"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={controls}
        initial={{ rotateY: 0 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Product image */}
          <div className="relative h-[60%] overflow-hidden">
            <motion.img
              src="/images/headphones.jpg"
              alt="Premium Headphones"
              className="w-full h-full object-cover"
              animate={{
                scale: isHovering && !isRotated ? 1.05 : 1,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Floating product gif */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovering && !isRotated ? 1 : 0,
                y: isHovering && !isRotated ? 0 : 10,
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/headphones-floating.gif"
                alt="Floating headphones"
                className="w-[80%] h-[80%] object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </motion.div>

            {/* Discount badge */}
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -25%
            </div>

            {/* Favorite button */}
            <motion.button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
              onClick={handleFavorite}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </motion.button>
          </div>

          {/* Product info */}
          <div className="p-5">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="text-xs text-gray-500 ml-2">(42)</span>
            </div>

            <h3 className="font-medium text-gray-900 mb-1">SonicWave Pro X7</h3>
            <p className="text-xs text-gray-500 mb-3">Wireless Noise-Cancelling Headphones</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">$149.99</span>
                <span className="text-sm text-gray-500 line-through">$199.99</span>
              </div>

              <motion.button
                className="text-xs text-blue-600 flex items-center gap-1"
                onClick={handleRotate}
                whileHover={{ scale: 1.05 }}
              >
                <RotateCcw className="w-3 h-3" />
                Details
              </motion.button>
            </div>

            <motion.button
              className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </motion.button>
          </div>

          {/* 3D floating effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovering && !isRotated ? "0 20px 30px rgba(0, 0, 0, 0.2)" : "0 10px 20px rgba(0, 0, 0, 0.1)",
              y: isHovering && !isRotated ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden bg-gray-50 p-5"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="font-medium text-gray-900 mb-3">Product Specifications</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Battery Life</span>
              <span className="font-medium">Up to 30 hours</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Connectivity</span>
              <span className="font-medium">Bluetooth 5.2</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Noise Cancellation</span>
              <span className="font-medium">Active (ANC)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Water Resistance</span>
              <span className="font-medium">IPX4</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Weight</span>
              <span className="font-medium">250g</span>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
            <p className="font-medium mb-1">Limited Time Offer</p>
            <p>Free premium carrying case with your purchase!</p>
          </div>

          <motion.button
            className="mt-6 w-full border border-black text-black py-2 rounded-lg flex items-center justify-center gap-2"
            onClick={handleRotate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
            Back to Product
          </motion.button>

          {/* 3D floating effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovering && isRotated ? "0 20px 30px rgba(0, 0, 0, 0.2)" : "0 10px 20px rgba(0, 0, 0, 0.1)",
              y: isHovering && isRotated ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

