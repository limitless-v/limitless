import { useEffect, useRef } from 'react';

export default function Particles({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, angle = 0, last = 0;
    const pointer = { x: 0, y: 0, active: false };
    const points = Array.from({ length: 1500 }, (_, i) => {
      const y = 1 - (i / 1499) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width; height = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };
    function draw(time: number) {
      if (!ctx) return;
      const moving = !paused && !motion.matches;
      if (moving && last) angle += Math.min(time - last, 40) * 0.00012;
      last = time;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width * 0.36, height * 0.37);
      const tilt = moving ? pointer.y * 0.3 : 0.15;
      const rotation = angle + (moving ? pointer.x * 0.35 : 0);
      const transformed = points.map(p => {
        const x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        const z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        return { x, y: p.y * Math.cos(tilt) - z * Math.sin(tilt), z: p.y * Math.sin(tilt) + z * Math.cos(tilt) };
      }).sort((a, b) => a.z - b.z);
      for (const p of transformed) {
        const perspective = 3 / (3 - p.z);
        let x = width / 2 + p.x * radius * perspective;
        let y = height / 2 + p.y * radius * perspective;
        if (pointer.active && moving) {
          const dx = x - (pointer.x + 1) * width / 2, dy = y - (pointer.y + 1) * height / 2;
          const distance = Math.hypot(dx, dy);
          const force = Math.max(0, 1 - distance / 100) * 18;
          x += dx / (distance || 1) * force; y += dy / (distance || 1) * force;
        }
        ctx.fillStyle = `rgba(242,242,237,${0.15 + (p.z + 1) * 0.4})`;
        ctx.beginPath(); ctx.arc(x, y, Math.max(0.6, perspective * (width < 600 ? 1 : 1.35)), 0, Math.PI * 2); ctx.fill();
      }
    }
    const tick = (time: number) => { draw(time); frame = requestAnimationFrame(tick); };
    const start = () => { cancelAnimationFrame(frame); last = 0; if (!paused && !motion.matches && !document.hidden) frame = requestAnimationFrame(tick); else draw(0); };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / width * 2 - 1;
      pointer.y = (event.clientY - rect.top) / height * 2 - 1; pointer.active = true;
    };
    const leave = () => { pointer.x = 0; pointer.y = 0; pointer.active = false; };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', leave);
    motion.addEventListener('change', start); document.addEventListener('visibilitychange', start);
    resize(); start();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); motion.removeEventListener('change', start); document.removeEventListener('visibilitychange', start); };
  }, [paused]);
  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
