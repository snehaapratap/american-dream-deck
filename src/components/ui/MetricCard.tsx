"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon?: ReactNode;
  children?: ReactNode;
  highlight?: boolean;
}

export default function MetricCard({
  title,
  value,
  description,
  icon,
  children,
  highlight = false,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-6 md:p-7 border bg-surface/20 transition-all duration-500 ${
        highlight
          ? "border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.06)]"
          : "border-white/[0.06]"
      }`}
    >
      {/* Gold accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] ${
          highlight
            ? "bg-gradient-to-r from-transparent via-gold to-transparent"
            : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
        }`}
      />

      <div className="flex items-start justify-between mb-4">
        {icon && <div className="text-white/20">{icon}</div>}
        <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
          {value}
        </span>
      </div>

      <h4 className="text-[11px] tracking-[0.15em] uppercase text-gold/80 mb-2">
        {title}
      </h4>
      <p className="text-[12px] text-white/25 leading-relaxed">{description}</p>

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
