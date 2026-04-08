'use client';
import { useEffect, useRef, useState } from 'react';

function StarCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>();
  const angleRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);

    const spin = () => {
      angleRef.current += 3;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        style={{
          position: 'absolute',
          left: pos.x - 14,
          top: pos.y - 14,
          transform: `rotate(${angle}deg)`,
          filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
        }}
      >
        {/* 4-point star */}
        <polygon
          points="14,2 16.5,11.5 26,14 16.5,16.5 14,26 11.5,16.5 2,14 11.5,11.5"
          fill="white"
        />
        {/* Center dot */}
        <circle cx="14" cy="14" r="2" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}

export default StarCursor;