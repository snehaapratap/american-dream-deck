"use client";
import { motion } from "framer-motion";

interface DataBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  suffix?: string;
}

export default function DataBar({
  label,
  value,
  maxValue,
  color = "#D4AF37",
  suffix = "",
}: DataBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] tracking-[0.12em] uppercase text-white/40">
          {label}
        </span>
        <span className="text-sm font-semibold text-white tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-[3px] w-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full origin-left"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
