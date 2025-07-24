"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"
import RotatingText from "@/components/rotating-text"
import StickerPeel from "@/components/sticker-peel"

interface PreloaderProps {
  onEnter: () => void
  isLoaded: boolean
}

function DroneCamera() {
  const { camera } = useThree()
  const [phase, setPhase] = useState(0)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (phase === 0 && time < 2) {
      const progress = time / 2
      const radius = 10 - progress * 8
      const height = 5 - progress * 4

      camera.position.x = Math.cos(time * 0.3) * radius
      camera.position.z = Math.sin(time * 0.3) * radius
      camera.position.y = height
      camera.lookAt(0, 0, 0)
    } else if (phase === 0) {
      setPhase(1)
    } else if (phase === 1 && time < 4) {
      const circleTime = (time - 2) * 1.2
      camera.position.x = Math.cos(circleTime) * 3
      camera.position.z = Math.sin(circleTime) * 3
      camera.position.y = 2 + Math.sin(circleTime * 2) * 0.4
      camera.lookAt(0, 0, 0)
    } else if (phase === 1) {
      setPhase(2)
    } else if (phase === 2) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3, 0.05)
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

function ReactBitsParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const radius = 5 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const color = new THREE.Color()
    const hue = 0.55 + Math.random() * 0.15
    color.setHSL(hue, 1, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LogoDisplay() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.2, 2.4, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[3.5, 2.3]} />
          <meshBasicMaterial color="#001122" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.7, 2.5]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function GridEnvironment() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial color="#003366" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -25]}>
        <planeGeometry args={[100, 50, 50, 25]} />
        <meshBasicMaterial color="#001133" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function Preloader({ onEnter, isLoaded }: PreloaderProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowButton(true)
    }, 3000)
    return () => clearTimeout(fallbackTimer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      <Canvas camera={{ position: [12, 6, 12], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8000ff" />
        <Stars radius={100} depth={40} count={500} factor={4} saturation={0} fade speed={1} />
        <DroneCamera />
        <ReactBitsParticles />
        <LogoDisplay />
        <GridEnvironment />
      </Canvas>

      {/* Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <StickerPeel className="w-64 h-40">
          <Image src="/images/cygnuz-logo.png" alt="Cygnuz AI" width={256} height={160} className="object-contain" />
        </StickerPeel>
      </div>

      {/* Rotating text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
        <RotatingText
          text="• AI AUTOMATION • INTELLIGENT SYSTEMS • FUTURE TECH • "
          radius={150}
          className="text-cyan-400 text-sm font-light opacity-60"
        />
      </div>

      {/* Loading bar */}
      {!showButton && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s`, animationDuration: "1s" }}
              />
            ))}
          </div>
          <p className="text-cyan-400 text-sm font-light tracking-wider">INITIALIZING AI SYSTEMS</p>
          <div className="mt-2 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
        </div>
      )}

      {/* Skip button */}
      {!showButton && isLoaded && (
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setShowButton(true)}
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors border border-cyan-400/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            Skip Animation
          </button>
        </div>
      )}

      {/* Enter button */}
      {showButton && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="text-center pointer-events-auto relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl animate-pulse" />
            <div className="relative bg-black/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-cyan-400 mb-3 tracking-wider animate-pulse">SYSTEM READY</h1>
              <p className="text-gray-300 mb-6 text-base">Enter the AI Universe</p>
              <button
                onClick={onEnter}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 border-2 border-cyan-400/70 animate-bounce"
              >
                ENTER EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  )
}
