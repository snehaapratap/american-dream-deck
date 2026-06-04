"use client";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { attractions } from "@/data/attractions";
import { usePersona } from "@/context/PersonaContext";
import { useLazyVideo } from "@/hooks/useLazyVideo";

export default function EntertainmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const [activeAttraction, setActiveAttraction] = useState<string | null>(null);
  const { setFormInterest } = usePersona();
  const { videoRef: bgVideoRef } = useLazyVideo();

  const scrollToFinale = () => {
    setFormInterest("sponsorship");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Statement parallax reveal
      if (statementRef.current) {
        gsap.from(statementRef.current, {
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
          scale: 0.85,
          opacity: 0,
        });
      }

      // Staggered card reveals
      const cards = sectionRef.current?.querySelectorAll(".attraction-item");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="entertainment"
      className="deck-section bg-surface relative overflow-hidden noise"
    >
      {/* Background video */}
      <video
        ref={bgVideoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none"
      >
        <source src="/videos/entertainment.mp4" type="video/mp4" />
      </video>

      {/* Ambient orbs */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[250px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[250px] pointer-events-none" />

      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Entertainment Destination"
          title="The WOW Factor"
          subtitle="World-class attractions that transform visitors into hours-long guests — driving unmatched foot traffic to every tenant."
        />

        {/* Massive statement */}
        <div ref={statementRef} className="text-center mb-20 md:mb-28">
          <p className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tight text-white/80 max-w-4xl mx-auto leading-tight">
            <span className="text-gold">6 world-class attractions</span>
            <br />
            under one roof.
          </p>
          <p className="mt-4 text-sm text-white/25 max-w-md mx-auto">
            Each one a destination in its own right. Together, they create something
            no other retail property on earth can match.
          </p>
        </div>

        {/* Attraction list - interactive */}
        <div className="space-y-px">
          {attractions.map((attr, i) => (
            <div key={attr.id} className="attraction-item">
              <button
                onClick={() => setActiveAttraction(activeAttraction === attr.id ? null : attr.id)}
                className="w-full group"
              >
                <div className="flex items-center gap-6 md:gap-10 p-6 md:p-8 border border-white/[0.04] bg-black/50 hover:bg-surface-light/30 transition-all duration-500">
                  {/* Number */}
                  <span
                    className="text-4xl md:text-5xl font-bold opacity-15 group-hover:opacity-30 transition-opacity tabular-nums flex-shrink-0 w-16 text-right"
                    style={{ color: attr.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Color bar */}
                  <div
                    className="w-[3px] h-12 flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
                    style={{ background: attr.color }}
                  />

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                      {attr.name}
                    </h3>
                    <p className="text-[11px] tracking-[0.1em] uppercase text-white/25 mt-0.5">
                      {attr.tagline}
                    </p>
                  </div>

                  {/* Stats - desktop */}
                  <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    {attr.stats.map((stat) => (
                      <span
                        key={stat}
                        className="text-[9px] tracking-[0.1em] uppercase text-white/20 px-3 py-1.5 border border-white/[0.04]"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Expand icon */}
                  <motion.div
                    animate={{ rotate: activeAttraction === attr.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/20 group-hover:text-white/40 transition-colors text-lg"
                  >
                    +
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeAttraction === attr.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="p-8 md:p-10 border border-t-0 border-white/[0.04]"
                      style={{ background: `linear-gradient(135deg, ${attr.color}08, transparent)` }}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Attraction image */}
                        {attr.image && (
                          <div className="w-full md:w-48 lg:w-56 flex-shrink-0 overflow-hidden border border-white/[0.06]">
                            <img
                              src={attr.image}
                              alt={attr.name}
                              className="w-full h-32 md:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-white/40 leading-relaxed mb-6">
                            {attr.description}
                          </p>
                          {/* Mobile stats */}
                          <div className="flex flex-wrap gap-2 md:hidden">
                            {attr.stats.map((stat) => (
                              <span
                                key={stat}
                                className="text-[9px] tracking-[0.1em] uppercase text-white/25 px-3 py-1.5 border border-white/[0.06]"
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-8 border border-white/[0.06] px-10 py-7 bg-surface-light/20">
            <div className="text-4xl md:text-5xl font-bold text-gold">8.5+</div>
            <div>
              <div className="text-sm font-medium text-white">Acres of Entertainment</div>
              <div className="text-[11px] text-white/25 mt-0.5">More than any indoor destination in the Western Hemisphere</div>
            </div>
          </div>
          <button
            onClick={scrollToFinale}
            className="mt-6 text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Sponsor an Attraction &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
