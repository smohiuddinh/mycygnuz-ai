"use client"

import { useEffect, useRef } from "react"

interface RotatingTextProps {
  text: string
  radius?: number
  className?: string
}

export default function RotatingText({ text, radius = 80, className = "" }: RotatingTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const chars = text.split("")
    element.innerHTML = ""

    chars.forEach((char, index) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.position = "absolute"
      span.style.left = "50%"
      span.style.transformOrigin = `0 ${radius}px`
      span.style.transform = `rotate(${(360 / chars.length) * index}deg)`
      element.appendChild(span)
    })

    // Rotation animation
    let rotation = 0
    const animate = () => {
      rotation += 0.5
      element.style.transform = `rotate(${rotation}deg)`
      requestAnimationFrame(animate)
    }
    animate()
  }, [text, radius])

  return (
    <div className={`relative ${className}`} style={{ width: radius * 2, height: radius * 2 }}>
      <div ref={textRef} className="absolute inset-0" />
    </div>
  )
}
