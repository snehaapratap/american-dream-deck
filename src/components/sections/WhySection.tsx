"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { whyStats, demographicHighlights } from "@/data/stats";
import { usePersona } from "@/context/PersonaContext";

const statKeyMap: Record<string, string> = {
  "Square Feet": "sqft",
  "Regional Reach": "reach",
  "Annual Visitors": "visitors",
  "Median HHI": "hhi",
  "From Manhattan": "distance",
  "Acres Under One Roof": "acres",
};

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const { personaData } = usePersona();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map pulse animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          },
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Ticker
      if (tickerRef.current) {
        const ticker = tickerRef.current;
        gsap.to(ticker, {
          x: -(ticker.scrollWidth / 2),
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="deck-section bg-black relative noise"
    >
      <img
        src="/images/why/map.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
      />
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="The Opportunity"
          title="Why American Dream"
          subtitle="A once-in-a-generation destination combining unmatched scale, premium audiences, and world-class entertainment — minutes from the nation's largest metro."
        />

        {/* Interactive Map Visual */}
        <div ref={mapRef} className="mb-24 relative">
          <div className="relative mx-auto max-w-3xl aspect-[2/1] flex items-center justify-center">
            {/* Concentric rings - geographic reach */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[300, 220, 140, 60].map((size, i) => (
                <motion.div
                  key={size}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{ width: `${size}px`, height: `${size}px` }}
                />
              ))}
              {/* Center dot - American Dream */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-4 h-4 bg-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute w-8 h-8 bg-gold/10 rounded-full animate-pulse-soft"
              />
            </div>

            {/* Labels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-white/25"
            >
              22M People Within 25 Miles
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
                East Rutherford, NJ
              </span>
              <br />
              <span className="text-[10px] tracking-[0.15em] text-white/20">
                5 Miles from Manhattan &bull; Adjacent to MetLife Stadium
              </span>
            </motion.div>

            {/* NYC label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute right-8 top-1/2 -translate-y-1/2"
            >
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/20">
                NYC &rarr;
              </span>
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16 mb-24">
          {whyStats.map((stat) => {
            const key = statKeyMap[stat.label] ?? "";
            const isHighlighted = personaData?.highlightedStats.includes(key) ?? false;
            return (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                decimals={"decimals" in stat ? stat.decimals : 0}
                label={stat.label}
                highlight={isHighlighted}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="hr-gold mb-12" />

        {/* Demographic ticker */}
        <div className="overflow-hidden py-6">
          <div ref={tickerRef} className="flex whitespace-nowrap">
            {[...demographicHighlights, ...demographicHighlights].map((text, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[11px] text-white/20 tracking-[0.1em] mx-10"
              >
                <span className="w-1 h-1 bg-gold/30 rounded-full mr-4 flex-shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
