"use client";
import { useRef, useEffect, useState } from "react";

interface RadialProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  label?: string;
  suffix?: string;
}

export default function RadialProgress({
  value,
  maxValue = 100,
  size = 100,
  label,
  suffix = "",
}: RadialProgressProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [animated, setAnimated] = useState(false);

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - (animated ? pct : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="text-center -mt-[calc(50%+0.5rem)] mb-[calc(50%-1.5rem)]">
        <span className="text-lg font-bold text-white tabular-nums">
          {value}{suffix}
        </span>
      </div>
      {label && (
        <span className="text-[10px] tracking-[0.15em] uppercase text-white/30">
          {label}
        </span>
      )}
    </div>
  );
}
