"use client";
import { useRef, useEffect } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; phase: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      time += 0.003;
      const width = w();
      const height = h();

      ctx.clearRect(0, 0, width, height);

      // Ambient gradient orbs
      const drawOrb = (x: number, y: number, r: number, a: number) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, `rgba(212, 175, 55, ${a})`);
        grd.addColorStop(0.5, `rgba(212, 175, 55, ${a * 0.3})`);
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };

      drawOrb(
        width * (0.5 + Math.sin(time * 0.7) * 0.15),
        height * (0.4 + Math.cos(time * 0.5) * 0.1),
        width * 0.35,
        0.04
      );

      drawOrb(
        width * (0.3 + Math.cos(time * 0.4) * 0.15),
        height * (0.6 + Math.sin(time * 0.6) * 0.15),
        width * 0.25,
        0.02
      );

      drawOrb(
        width * (0.7 + Math.sin(time * 0.3) * 0.1),
        height * (0.3 + Math.cos(time * 0.8) * 0.1),
        width * 0.2,
        0.015
      );

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const flicker = 0.5 + Math.sin(time * 2 + p.phase) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * flicker})`;
        ctx.fill();
      });

      // Connecting lines (sparse)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
