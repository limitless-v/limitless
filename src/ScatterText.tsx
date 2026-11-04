import { useEffect, useRef } from 'react';

type Dot = { homeX: number; homeY: number; x: number; y: number; targetX: number; targetY: number; vx: number; vy: number };

export default function ScatterText({ children }: { children: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const padding = 70;
    let dots: Dot[] = [], frame = 0, hovering = false, previous = 0;
    let width = 0, height = 0, radius = 65;
    const pointer = { x: 0, y: 0 };
    let disposed = false;
    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#eeeee9';
      for (const dot of dots) {
        ctx.beginPath(); ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2); ctx.fill();
      }
    };

    const reset = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0; hovering = false;
      for (const dot of dots) {
        dot.x = dot.targetX = dot.homeX; dot.y = dot.targetY = dot.homeY;
        dot.vx = dot.vy = 0;
      }
      paint();
    };
    const prepare = () => {
      const bounds = host.getBoundingClientRect();
      const style = getComputedStyle(host);
      width = bounds.width + padding * 2; height = bounds.height + padding * 2;
      radius = Math.max(38, Math.min(85, parseFloat(style.fontSize) * .65));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(width * dpr); canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.letterSpacing = style.letterSpacing;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#eeeee9';
      const metrics = ctx.measureText(children);
      const baseline = padding + (bounds.height + metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent) / 2;
      ctx.fillText(children, padding, baseline);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      dots = [];
      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          const alpha = pixels.data[(Math.floor(y * dpr) * canvas.width + Math.floor(x * dpr)) * 4 + 3];
          if (alpha > 100) dots.push({ homeX: x, homeY: y, x, y, targetX: x, targetY: y, vx: 0, vy: 0 });
        }
      }
      host.classList.add('is-scattering');
      paint();
    };
    const draw = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 16.667, 2) : 1;
      previous = now;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#eeeee9';
      let unsettled = false;
      for (const dot of dots) {
        if (hovering) {
          const dx = dot.homeX - pointer.x, dy = dot.homeY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius * 1.8) {
            const influence = Math.exp(-distance * distance / (radius * radius * .7));
            const force = influence * radius * .65;
            const direction = Math.atan2(dy, dx);
            // A radial push with a little tangential pull gives a soft field effect.
            const targetX = dot.homeX + (Math.cos(direction) - Math.sin(direction) * .3) * force;
            const targetY = dot.homeY + (Math.sin(direction) + Math.cos(direction) * .3) * force;
            const blend = Math.min(1, influence * .08 * dt);
            dot.targetX += (targetX - dot.targetX) * blend;
            dot.targetY += (targetY - dot.targetY) * blend;
          }
        } else { dot.targetX = dot.homeX; dot.targetY = dot.homeY; }
        const damping = Math.pow(.84, dt);
        dot.vx = (dot.vx + (dot.targetX - dot.x) * .012 * dt) * damping;
        dot.vy = (dot.vy + (dot.targetY - dot.y) * .012 * dt) * damping;
        dot.x += dot.vx * dt; dot.y += dot.vy * dt;
        if (Math.hypot(dot.x - dot.homeX, dot.y - dot.homeY) > .12 || Math.hypot(dot.vx, dot.vy) > .03) unsettled = true;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2); ctx.fill();
      }
      if (hovering || unsettled) frame = requestAnimationFrame(draw);
      else reset();
    };
    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left + padding;
      pointer.y = event.clientY - bounds.top + padding;
    };
    const enter = (event: PointerEvent) => {
      if (motion.matches || event.pointerType === 'touch') return;
      move(event); hovering = true;
      if (!frame) { previous = 0; frame = requestAnimationFrame(draw); }
    };
    const leave = () => { hovering = false; };
    const visibility = () => { if (document.hidden) reset(); };
    const rebuild = () => { reset(); prepare(); };
    const observer = new ResizeObserver(rebuild);
    observer.observe(host);
    prepare();
    void document.fonts.ready.then(() => { if (!disposed) rebuild(); });
    host.addEventListener('pointerenter', enter); host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave); host.addEventListener('pointercancel', leave);
    motion.addEventListener('change', reset);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      disposed = true; observer.disconnect(); reset(); host.classList.remove('is-scattering');
      host.removeEventListener('pointerenter', enter); host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave); host.removeEventListener('pointercancel', leave);
      motion.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [children]);

  return <span ref={hostRef} className="scatter-text"><span className="halftone-text">{children}</span><canvas ref={canvasRef} aria-hidden="true" /></span>;
}
