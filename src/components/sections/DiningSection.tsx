"use client";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { diningVenues } from "@/data/tenants";
import { usePersona } from "@/context/PersonaContext";
import { useLazyVideo } from "@/hooks/useLazyVideo";

const categories = ["All", "Fine Dining", "Fast Casual", "Experience Dining", "Casual Dining", "Food Hall", "Bar & Lounge", "Cafe"];

export default function DiningSection() {
  const [active, setActive] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setFormInterest } = usePersona();
  const { videoRef: bgVideoRef } = useLazyVideo();

  const scrollToFinale = () => {
    setFormInterest("leasing");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  const filtered =
    active === "All"
      ? diningVenues
      : diningVenues.filter((v) => v.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll for categories on mobile
      if (scrollRef.current) {
        ScrollTrigger.refresh();
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="dining" className="deck-section bg-black relative noise">
      {/* Background video */}
      <video
        ref={bgVideoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
      >
        <source src="/videos/dining.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Dining & Lifestyle"
          title="100+ Culinary Destinations"
          subtitle="From celebrity chef restaurants to artisanal food halls. Dining at American Dream is a destination in itself."
        />

        {/* Category filters - horizontal scroll on mobile */}
        <div ref={scrollRef} className="overflow-x-auto pb-4 mb-12 -mx-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2.5 text-[10px] tracking-[0.12em] uppercase transition-all duration-300 whitespace-nowrap ${
                  active === cat
                    ? "text-white"
                    : "text-white/25 hover:text-white/50"
                }`}
              >
                {cat}
                {active === cat && (
                  <motion.div
                    layoutId="dining-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Venue grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((venue) => (
              <motion.div
                key={venue.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 border border-white/[0.04] bg-surface/30 hover:border-white/10 hover:bg-surface-light/40 transition-all duration-500"
              >
                <h3 className="text-[15px] font-medium text-white group-hover:text-gold transition-colors duration-300 mb-1">
                  {venue.name}
                </h3>
                <span className="text-[9px] tracking-[0.2em] uppercase text-gold/40 block mb-3">
                  {venue.category}
                </span>
                <p className="text-[12px] text-white/25 leading-relaxed">{venue.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="heading-md text-white/60">
            <span className="text-white">100+</span> restaurants.{" "}
            <span className="text-white">Every cuisine.</span>{" "}
            <span className="text-white/30">One destination.</span>
          </p>
          <button
            onClick={scrollToFinale}
            className="mt-6 text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Open Your Restaurant Here &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
