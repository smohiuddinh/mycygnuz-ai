"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface StarBorderButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline"
  className?: string
}

export default function StarBorderButton({
  children,
  onClick,
  variant = "default",
  className = "",
}: StarBorderButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30 * (Math.PI / 180),
    delay: i * 0.1,
  }))

  return (
    <div className="relative inline-block">
      {/* Animated stars */}
      {isHovered &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${Math.cos(star.angle) * 40}px, ${Math.sin(star.angle) * 40}px)`,
              animationDelay: `${star.delay}s`,
              animationDuration: "2s",
            }}
          />
        ))}

      {/* Main button */}
      <Button
        variant={variant}
        onClick={onClick}
        className={`relative ${className} transition-all duration-300 ${
          isHovered ? "shadow-lg shadow-cyan-500/25 scale-105" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}

        {/* Border animation */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-cyan-400/50 transition-all duration-300 ${
            isHovered ? "scale-110 opacity-100" : "scale-100 opacity-0"
          }`}
        />
      </Button>
    </div>
  )
}
