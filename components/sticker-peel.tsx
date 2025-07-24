"use client"

import type React from "react"

import { useState } from "react"

interface StickerPeelProps {
  children: React.ReactNode
  className?: string
}

export default function StickerPeel({ children, className = "" }: StickerPeelProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Peel effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 40%, rgba(0, 212, 255, 0.1) 50%, rgba(0, 212, 255, 0.2) 100%)`,
            clipPath: `circle(60px at ${mousePosition.x}px ${mousePosition.y}px)`,
          }}
        />
      )}

      {/* Shine effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
            width: "200px",
            height: "200px",
          }}
        />
      )}
    </div>
  )
}
