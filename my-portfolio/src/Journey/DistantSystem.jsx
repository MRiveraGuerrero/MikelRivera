import { useEffect, useRef } from 'react';
import { destinations } from './content';

// A small decorative scene: no model downloads or WebGL required at the gateway.
export default function DistantSystem() {
  const canvas = useRef(null);
  useEffect(() => {
    const element = canvas.current;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let time = 0;
    let previous = 0;
    let width = 0;
    let height = 0;
    const bodies = destinations.filter(body => body.type !== 'star');
    const draw = now => {
      if (!document.hidden && previous) time += Math.min(now - previous, 40);
      previous = now;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2;
      const scale = Math.min(width / 560, height / 380);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.28); ctx.scale(scale, scale);
      const halo = ctx.createRadialGradient(0, 0, 2, 0, 0, 100);
      halo.addColorStop(0, '#ffd89560'); halo.addColorStop(0.25, '#e4ab4820'); halo.addColorStop(1, '#d9953300');
      ctx.fillStyle = halo; ctx.fillRect(-100, -100, 200, 200);
      const points = bodies.map((body, i) => {
        const orbit = 48 + i * 29;
        const angle = i * 2.37 + time * 0.000025 / (1 + i * 0.4);
        ctx.beginPath(); ctx.ellipse(0, 0, orbit, orbit * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#b7c5da13'; ctx.lineWidth = 0.7; ctx.stroke();
        return { body, x: Math.cos(angle) * orbit, y: Math.sin(angle) * orbit * 0.38, r: i === 4 ? 4 : 3 + i % 3 };
      });
      for (const { body, x, y, r } of points) {
        const length = Math.hypot(x, y);
        const light = ctx.createRadialGradient(x - x / length * r * 0.5, y - y / length * r * 0.5, 0, x, y, r);
        light.addColorStop(0, body.color); light.addColorStop(1, '#080b13');
        ctx.fillStyle = light; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowColor = '#ffba64'; ctx.shadowBlur = 20; ctx.fillStyle = '#ffe9b6';
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      if (!motion.matches) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = element.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      element.width = width * dpr; element.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cancelAnimationFrame(frame); previous = 0; draw(performance.now());
    };
    const observer = new ResizeObserver(resize); observer.observe(element);
    motion.addEventListener('change', resize);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); motion.removeEventListener('change', resize); };
  }, []);
  return <canvas ref={canvas} aria-hidden="true" style={{ width: '100%', height: '100%' }} />;
}
