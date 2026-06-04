"use client";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
  highlight?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "heading-lg",
  lg: "text-4xl md:text-5xl font-extrabold",
  xl: "text-5xl md:text-6xl font-extrabold",
};

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  size = "md",
  highlight = false,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 2200;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * value;
            setDisplay(current.toFixed(decimals));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <div ref={ref} className={`text-center group ${highlight ? "relative" : ""}`}>
      {highlight && (
        <div className="absolute -inset-3 bg-gold/[0.04] rounded-lg blur-xl pointer-events-none" />
      )}
      <div className={`${sizeClasses[size]} text-white tabular-nums relative`}>
        {prefix && <span className="text-white/60">{prefix}</span>}
        {display}
        <span className="text-white/60">{suffix}</span>
      </div>
      {label && (
        <div className="mt-2 text-[11px] tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors relative">
          {label}
        </div>
      )}
    </div>
  );
}
