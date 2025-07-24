"use client"

import { useEffect, useState } from "react"

export default function SplashCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrails((prev) => [...prev.slice(-8), newTrail])
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <div
        className={`fixed w-6 h-6 rounded-full border-2 border-cyan-400 transition-all duration-150 ${
          isClicking ? "scale-150 bg-cyan-400/20" : "scale-100"
        }`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
        }}
      />

      {/* Splash effect */}
      {isClicking && (
        <div
          className="fixed w-16 h-16 rounded-full border border-cyan-400/50 animate-ping"
          style={{
            left: mousePosition.x - 32,
            top: mousePosition.y - 32,
          }}
        />
      )}

      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: ((index + 1) / trails.length) * 0.5,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}
