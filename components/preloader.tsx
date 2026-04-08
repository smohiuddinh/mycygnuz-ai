"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"

interface PreloaderProps {
  onEnter: () => void
  isLoaded: boolean
}

// ─── Cinematic Camera ────────────────────────────────────────────────────────
// Phase 0 (0–1.2s):  Wide drone sweep, high altitude
// Phase 1 (1.2–2.4s): Descends, tightens orbit
// Phase 2 (2.4–3.6s): Locks on logo, slow hover
// Phase 3 (3.6–4.6s): Push-in zoom straight at logo
// Phase 4 (4.6s+):   Hold, signal parent
function CinematicCamera({
  onZoomComplete,
  skipSignal,
}: {
  onZoomComplete: () => void
  skipSignal: boolean
}) {
  const { camera } = useThree()
  const notified = useRef(false)
  const lastAngle = useRef(0)
  const skipTime = useRef<number | null>(null)

  useFrame((state) => {
    // If skip was triggered, fast-forward camera to end position
    if (skipSignal && skipTime.current === null) {
      skipTime.current = state.clock.elapsedTime
    }

    const t = skipSignal && skipTime.current !== null
      ? 4.8 + (state.clock.elapsedTime - skipTime.current)
      : state.clock.elapsedTime

    if (t < 1.2) {
      const p = t / 1.2
      const radius = 20 - p * 5
      const height = 13 - p * 3
      const angle = t * 0.55
      lastAngle.current = angle
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 0.35) * 1.2,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 2.4) {
      const p = (t - 1.2) / 1.2
      const ease = 1 - Math.pow(1 - p, 3)
      const radius = 15 - ease * 12
      const height = 10 - ease * 9
      const angle = lastAngle.current + p * 1.8
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 0.5) * 0.6,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 3.6) {
      const p = (t - 2.4) / 1.2
      const ease = 1 - Math.pow(1 - p, 2)
      const radius = 3 - ease * 1.8
      const height = 1 - ease * 0.9
      const angle = lastAngle.current + 1.8 + p * 0.8
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 1.1) * 0.1,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 4.6) {
      const p = (t - 3.6) / 1.0
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      const z = THREE.MathUtils.lerp(1.2, 0.05, ease)
      camera.position.set(
        THREE.MathUtils.lerp(camera.position.x, 0, 0.18),
        THREE.MathUtils.lerp(camera.position.y, 0, 0.18),
        z
      )
      camera.lookAt(0, 0, 0)

    } else {
      camera.position.set(0, 0, 0.05)
      camera.lookAt(0, 0, 0)
      if (!notified.current) {
        notified.current = true
        onZoomComplete()
      }
    }
  })

  return null
}

// ─── Ambient Particles ───────────────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 1800

  const [positions, colors] = (() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = new THREE.Color().setHSL(0.52 + Math.random() * 0.14, 1, 0.5 + Math.random() * 0.25)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return [pos, col]
  })()

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.055
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045} vertexColors transparent opacity={0.7}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  )
}

// ─── Grid ────────────────────────────────────────────────────────────────────
function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[150, 150, 70, 70]} />
      <meshBasicMaterial color="#003366" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

// ─── Moving Drone Light ───────────────────────────────────────────────────────
function DroneLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ref.current.position.set(Math.cos(t * 0.7) * 10, 7, Math.sin(t * 0.7) * 10)
    }
  })
  return <pointLight ref={ref} intensity={2.5} color="#00d4ff" distance={35} />
}

// ─── Logo Target Glow (3D plane behind logo) ──────────────────────────────────
function LogoGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 1.4) * 0.04
      ref.current.position.y = Math.sin(t * 0.7) * 0.06
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <planeGeometry args={[5, 3]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} />
    </mesh>
  )
}

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onEnter, isLoaded }: PreloaderProps) {
  const [zoomDone,     setZoomDone]     = useState(false)
  const [fadeOut,      setFadeOut]      = useState(false)
  const [logoOpacity,  setLogoOpacity]  = useState(0)
  const [logoScale,    setLogoScale]    = useState(1)
  const [reticleGone,  setReticleGone]  = useState(false)
  const [skipSignal,   setSkipSignal]   = useState(false)
  const [skipVisible,  setSkipVisible]  = useState(false)

  // Fade logo in gently on mount
  useEffect(() => {
    const t = setTimeout(() => setLogoOpacity(1), 300)
    // Show skip button after 0.8s
    const t2 = setTimeout(() => setSkipVisible(true), 800)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const handleZoomComplete = useCallback(() => {
    setZoomDone(true)
    setReticleGone(true)
  }, [])

  // Zoom complete → scale logo → fade out → call parent (NO white flash)
  useEffect(() => {
    if (!zoomDone) return

    setLogoScale(14)

    // Fade the whole preloader out smoothly
    const t1 = setTimeout(() => setFadeOut(true), 150)

    // Call parent — site appears behind the fade
    const t2 = setTimeout(() => onEnter(), 550)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [zoomDone, onEnter])

  // Skip handler
  const handleSkip = useCallback(() => {
    if (zoomDone) return
    setSkipVisible(false)
    setSkipSignal(true)
    setReticleGone(true)
  }, [zoomDone])

  // Hard fallback
  useEffect(() => {
    const t = setTimeout(onEnter, 10000)
    return () => clearTimeout(t)
  }, [onEnter])

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: "#000008",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* ── 3D Scene ── */}
      <Canvas
        camera={{ position: [20, 13, 20], fov: 52 }}
        gl={{ antialias: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.04} />
        <DroneLight />
        <pointLight position={[-14, 9, -9]} intensity={0.9} color="#5500cc" />
        <pointLight position={[0,  0,  2]}  intensity={0.3} color="#00aaff" />
        <Stars radius={130} depth={55} count={700} factor={5} saturation={0} fade speed={1.5} />
        <CinematicCamera onZoomComplete={handleZoomComplete} skipSignal={skipSignal} />
        <Particles />
        <LogoGlow />
        <Grid />
      </Canvas>

      {/* ── Scanlines ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,212,255,0.012) 3px,rgba(0,212,255,0.012) 4px)",
          zIndex: 3,
        }}
      />

      {/* ── Logo (HTML overlay, centered) ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 12 }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            transition: zoomDone
              ? "opacity 0.2s ease-in, transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)"
              : "opacity 1s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform, opacity",
            filter: zoomDone
              ? "brightness(2.5) saturate(0)"
              : "drop-shadow(0 0 20px rgba(0,212,255,0.35))",
          }}
        >
          <Image
            src="/images/cygnuz-logo.png"
            alt="Cygnuz AI"
            width={290}
            height={180}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Targeting Reticle ── */}
      {!reticleGone && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 11 }}
        >
          <div style={{ animation: "reticle 4.8s cubic-bezier(0.4,0,0.2,1) forwards" }}>
            <div
              className="absolute rounded-full border border-cyan-500/25"
              style={{ inset: -80, animation: "spin 6s linear infinite" }}
            />
            <div
              className="absolute rounded-full border border-cyan-400/40"
              style={{ inset: -48, animation: "spin 3.5s linear infinite reverse" }}
            />
            <div
              className="absolute rounded-full border-2 border-cyan-400/60"
              style={{ inset: -24, animation: "spin 1.5s linear infinite" }}
            />
            <div className="absolute" style={{ inset: -70 }}>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            </div>
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 border-cyan-400 ${cls}`}
                style={{ margin: -28 }}
              />
            ))}
            <div className="relative w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,212,255,0.7)]" />
          </div>
        </div>
      )}

      {/* ── HUD corners ── */}
      {["top-5 left-5 border-l-2 border-t-2", "top-5 right-5 border-r-2 border-t-2",
        "bottom-5 left-5 border-l-2 border-b-2", "bottom-5 right-5 border-r-2 border-b-2"].map((cls, i) => (
        <div key={i} className={`absolute w-7 h-7 border-cyan-500/50 ${cls}`} style={{ zIndex: 15 }} />
      ))}

      {/* ── Skip Button ── */}
      {skipVisible && !zoomDone && (
        <button
          onClick={handleSkip}
          className="absolute top-5 right-16 flex items-center gap-2 px-4 py-1.5 font-mono text-xs tracking-widest uppercase"
          style={{
            zIndex: 20,
            color: "rgba(0,212,255,0.7)",
            border: "1px solid rgba(0,212,255,0.3)",
            background: "rgba(0,0,20,0.6)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            animation: "fadeInSkip 0.4s ease forwards",
            transition: "color 0.2s, border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.color = "rgba(0,212,255,1)"
            el.style.borderColor = "rgba(0,212,255,0.7)"
            el.style.background = "rgba(0,30,60,0.85)"
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.color = "rgba(0,212,255,0.7)"
            el.style.borderColor = "rgba(0,212,255,0.3)"
            el.style.background = "rgba(0,0,20,0.6)"
          }}
        >
          {/* Triangle play icon */}
          <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
            <polygon points="0,0 8,4.5 0,9" />
          </svg>
          Skip
        </button>
      )}

      {/* ── Status bar ── */}
      {!zoomDone && (
        <div
          className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
          style={{ zIndex: 15 }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <p className="text-cyan-400/75 text-xs tracking-[0.35em] font-mono uppercase select-none">
              Acquiring Target
            </p>
          </div>
          <div className="flex items-end gap-0.5">
            {[4,7,5,9,6,8,4,7,5,6].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-sm bg-cyan-400/50"
                style={{
                  height: h * 2,
                  animation: `waveBar 0.55s ease-in-out ${i * 0.045}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes reticle {
          0%   { transform: scale(3);   opacity: 0;   }
          10%  { opacity: 1; }
          70%  { transform: scale(0.9); opacity: 1;   }
          90%  { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(0.1); opacity: 0;   }
        }
        @keyframes waveBar {
          from { transform: scaleY(0.4); opacity: 0.4; }
          to   { transform: scaleY(1.6); opacity: 1;   }
        }
        @keyframes fadeInSkip {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}