"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CircularGalleryProps {
  items: Array<{
    id: string
    title: string
    content: React.ReactNode
  }>
  radius?: number
}

export default function CircularGallery({ items, radius = 200 }: CircularGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotation, setRotation] = useState(0)

  const angleStep = 360 / items.length

  useEffect(() => {
    setRotation(-currentIndex * angleStep)
  }, [currentIndex, angleStep])

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Circular container */}
      <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/30 max-w-sm">
            {items[currentIndex].content}
          </div>
        </div>

        {/* Circular items */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {items.map((item, index) => {
            const angle = index * angleStep * (Math.PI / 180)
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const isActive = index === currentIndex

            return (
              <div
                key={item.id}
                className={`absolute w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-cyan-400 bg-cyan-400/20 scale-125"
                    : "border-gray-600 bg-gray-800/50 hover:border-cyan-400/50"
                }`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-400">
                  {index + 1}
                </div>
                {isActive && <div className="absolute -inset-2 border border-cyan-400/50 rounded-full animate-pulse" />}
              </div>
            )
          })}
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none">
          {items.map((_, index) => {
            const angle = index * angleStep * (Math.PI / 180)
            const x1 = radius + Math.cos(angle) * (radius - 50)
            const y1 = radius + Math.sin(angle) * (radius - 50)
            const x2 = radius + Math.cos(angle) * radius
            const y2 = radius + Math.sin(angle) * radius

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0, 212, 255, 0.2)"
                strokeWidth="1"
                className={index === currentIndex ? "opacity-100" : "opacity-30"}
              />
            )
          })}
        </svg>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={prevItem}
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextItem}
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
