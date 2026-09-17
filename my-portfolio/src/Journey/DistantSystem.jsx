import { useEffect, useRef } from 'react';
import { destinations } from './content';

// Stylized distant solar system: lightweight, performant, toy-like PS2/PS3 sci-fi aesthetic
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

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width / 540, height / 360);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.24);
      ctx.scale(scale, scale);

      // Deep space atmospheric ambient glow
      const bgGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 220);
      bgGlow.addColorStop(0, 'rgba(255, 175, 60, 0.14)');
      bgGlow.addColorStop(0.35, 'rgba(64, 120, 220, 0.08)');
      bgGlow.addColorStop(0.8, 'rgba(20, 30, 60, 0.02)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(-240, -180, 480, 360);

      // Solar Corona / Sun Glow
      const corona = ctx.createRadialGradient(0, 0, 4, 0, 0, 110);
      corona.addColorStop(0, 'rgba(255, 225, 140, 0.7)');
      corona.addColorStop(0.2, 'rgba(255, 155, 50, 0.3)');
      corona.addColorStop(0.5, 'rgba(255, 100, 30, 0.1)');
      corona.addColorStop(1, 'rgba(255, 100, 30, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.fill();

      // Orbital paths & Planets
      const points = bodies.map((body, i) => {
        const orbit = 52 + i * 28;
        const speedMultiplier = 1 / (1 + i * 0.35);
        const angle = i * 2.15 + time * 0.000032 * speedMultiplier;

        // Draw styled orbit ellipse with slight luminous tech dash
        ctx.beginPath();
        ctx.ellipse(0, 0, orbit, orbit * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(148, 195, 235, 0.12)' : 'rgba(180, 210, 245, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const x = Math.cos(angle) * orbit;
        const y = Math.sin(angle) * orbit * 0.38;
        const r = i === 2 ? 5.5 : i === 4 ? 4.5 : 3.2 + (i % 3);

        return { body, x, y, r, i, angle };
      });

      // Render planets with stylized lighting and planetary rings
      for (const { body, x, y, r, i } of points) {
        const dist = Math.hypot(x, y);
        const lightDirX = dist > 0.1 ? (x / dist) * (r * 0.55) : 0;
        const lightDirY = dist > 0.1 ? (y / dist) * (r * 0.55) : 0;

        // Planetary glow / atmosphere
        const atmo = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.2);
        atmo.addColorStop(0, `${body.color}44`);
        atmo.addColorStop(1, `${body.color}00`);
        ctx.fillStyle = atmo;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Planet surface gradient (toy-like spherical lighting)
        const light = ctx.createRadialGradient(x - lightDirX, y - lightDirY, 0.5, x, y, r);
        light.addColorStop(0, '#ffffff');
        light.addColorStop(0.3, body.color);
        light.addColorStop(0.85, '#0c1524');
        light.addColorStop(1, '#050a12');
        ctx.fillStyle = light;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Rings on specific planet (stylized Saturn-like ring)
        if (i === 1 || i === 3) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-0.35);
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.2, r * 0.65, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `${body.color}88`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        // Little moon around one of the outer planets
        if (i === 2) {
          const moonAngle = time * 0.0018;
          const moonDist = r * 2.2;
          const mx = x + Math.cos(moonAngle) * moonDist;
          const my = y + Math.sin(moonAngle) * (moonDist * 0.45);
          ctx.beginPath();
          ctx.arc(mx, my, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = '#b8d8ff';
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Miniature Stylized Spaceship cruising around an outer orbit
      const shipOrbit = 175;
      const shipAngle = time * 0.000045 + 1.2;
      const sx = Math.cos(shipAngle) * shipOrbit;
      const sy = Math.sin(shipAngle) * shipOrbit * 0.38;

      // Small thruster flare
      const shipAngleTangent = shipAngle + Math.PI / 2;
      const thrusterX = sx - Math.cos(shipAngleTangent) * 4;
      const thrusterY = sy - Math.sin(shipAngleTangent) * (4 * 0.38);

      // Thruster trail
      ctx.beginPath();
      ctx.arc(thrusterX, thrusterY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ship body (stylized triangle)
      ctx.save();
      ctx.translate(sx, sy);
      const shipHeading = Math.atan2(Math.sin(shipAngleTangent) * 0.38, Math.cos(shipAngleTangent));
      ctx.rotate(shipHeading);
      ctx.beginPath();
      ctx.moveTo(3.5, 0);
      ctx.lineTo(-2.5, -2);
      ctx.lineTo(-1.5, 0);
      ctx.lineTo(-2.5, 2);
      ctx.closePath();
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();
      ctx.restore();

      // Central Golden Sun
      ctx.shadowColor = '#ffb347';
      ctx.shadowBlur = 24;
      const sunCore = ctx.createRadialGradient(-2, -2, 1, 0, 0, 14);
      sunCore.addColorStop(0, '#ffffff');
      sunCore.addColorStop(0.35, '#ffe58f');
      sunCore.addColorStop(0.75, '#ff9922');
      sunCore.addColorStop(1, '#ff6a00');
      ctx.fillStyle = sunCore;
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2);
      ctx.fill();

      // Corona pulse ring
      const pulseSize = 15 + Math.sin(time * 0.002) * 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 190, 80, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      if (!motion.matches) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      element.width = width * dpr;
      element.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cancelAnimationFrame(frame);
      previous = 0;
      draw(performance.now());
    };

    const observer = new ResizeObserver(resize);
    observer.observe(element);
    motion.addEventListener('change', resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener('change', resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} />;
}
