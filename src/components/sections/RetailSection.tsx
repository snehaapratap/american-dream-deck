"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { retailCategories } from "@/data/tenants";
import { recentSignings } from "@/data/availability";
import { usePersona } from "@/context/PersonaContext";
import { gsap } from "@/lib/gsap-config";

const personaCategoryMap: Record<string, string> = {
  "retail-brand": "fashion",
  "luxury-retailer": "luxury",
  "fnb-operator": "lifestyle",
  "popup-brand": "fashion",
};

export default function RetailSection() {
  const { persona, setFormInterest } = usePersona();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const recommendedCategory = persona ? personaCategoryMap[persona] ?? null : null;
  const tickerRef = useRef<HTMLDivElement>(null);

  const scrollToFinale = () => {
    setFormInterest("leasing");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  useEffect(() => {
    if (!tickerRef.current) return;
    const ticker = tickerRef.current;
    const tween = gsap.to(ticker, {
      x: -(ticker.scrollWidth / 2),
      duration: 35,
      ease: "none",
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <section id="retail" className="deck-section bg-surface relative noise">
      <img
        src="/images/retail/corridor.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none"
      />
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Retail Ecosystem"
          title="450+ World-Class Brands"
          subtitle="From global flagships to emerging designers. The most dynamic retail ecosystem in North America."
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
              !activeCategory
                ? "border-white/30 text-white bg-white/5"
                : "border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/15"
            }`}
          >
            All Categories
          </button>
          {retailCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "border-white/30 text-white bg-white/5"
                  : "border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/15"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {retailCategories
              .filter((c) => !activeCategory || c.id === activeCategory)
              .map((cat, i) => (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative border border-white/[0.06] bg-surface-light/50 hover:border-white/15 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                          {cat.name}
                          {recommendedCategory === cat.id && (
                            <span className="ml-2 text-[8px] tracking-[0.15em] uppercase text-gold/70 border border-gold/20 px-1.5 py-0.5 align-middle">
                              Recommended
                            </span>
                          )}
                        </h3>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 mt-1 block">
                          {cat.count} Brands
                        </span>
                      </div>
                    </div>

                    <p className="text-[13px] text-white/35 leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {cat.brands.slice(0, 5).map((brand) => (
                        <span
                          key={brand}
                          className="text-[10px] tracking-[0.1em] uppercase text-white/20 px-3 py-1 border border-white/[0.05] hover:text-white/40 hover:border-white/10 transition-all duration-300"
                        >
                          {brand}
                        </span>
                      ))}
                      {cat.brands.length > 5 && (
                        <span className="text-[10px] tracking-[0.1em] text-white/15 px-3 py-1">
                          +{cat.brands.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 border border-white/[0.06] px-10 py-6 bg-surface-light/30">
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-white">92%</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">Occupancy</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-white">3.5<span className="text-white/40">hrs</span></div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">Avg Dwell Time</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-white">2x</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">vs Traditional Mall</div>
            </div>
          </div>

          <button
            onClick={scrollToFinale}
            className="mt-6 text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Find Your Space &rarr;
          </button>
        </motion.div>

        {/* Recent Signings Ticker */}
        <div className="mt-12 overflow-hidden py-4 border-t border-white/[0.04]">
          <p className="text-[9px] tracking-[0.2em] uppercase text-gold/30 mb-3 px-2">Recent Signings</p>
          <div ref={tickerRef} className="flex whitespace-nowrap">
            {[...recentSignings, ...recentSignings].map((signing, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] text-white/20 tracking-wide mx-8"
              >
                <span className="w-1.5 h-1.5 bg-gold/30 rounded-full mr-3 flex-shrink-0" />
                {signing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
