'use client';
import { useEffect, useRef } from 'react';

function SplashCursor({
  SIM_RESOLUTION = 64,
  DYE_RESOLUTION = 512,
  CAPTURE_RESOLUTION = 256,
  DENSITY_DISSIPATION = 2.5,
  VELOCITY_DISSIPATION = 1.8,
  PRESSURE = 0.05,
  PRESSURE_ITERATIONS = 10,
  CURL = 1.5,
  SPLAT_RADIUS = 0.15,
  SPLAT_FORCE = 4000,
  SHADING = false,
  COLOR_UPDATE_SPEED = 5,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastFrameTime = 0;

    function pointerPrototype() {
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.moved = false;
      this.color = [1, 0, 0];
    }

    const pointer = new pointerPrototype();

    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    if (!gl) return;

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function clear() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function updatePointer(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pointer.deltaX = x - pointer.texcoordX;
      pointer.deltaY = y - pointer.texcoordY;

      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;

      pointer.texcoordX = x;
      pointer.texcoordY = y;

      pointer.moved = true;
    }

    window.addEventListener('mousemove', updatePointer);

    function renderFakeFluid() {
      if (!pointer.moved) return;

      pointer.moved = false;

      const size = 40;

      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(
        pointer.texcoordX - size / 2,
        canvas.height - pointer.texcoordY - size / 2,
        size,
        size
      );

      gl.clearColor(Math.random(), 0, 0.2, 0.3);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.disable(gl.SCISSOR_TEST);
    }

    function loop(time) {
      if (time - lastFrameTime < 16) {
        requestAnimationFrame(loop);
        return;
      }

      lastFrameTime = time;

      resizeCanvas();
      clear();
      renderFakeFluid();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', updatePointer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;