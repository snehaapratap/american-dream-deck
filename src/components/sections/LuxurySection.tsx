"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion } from "framer-motion";
import { luxuryBrands } from "@/data/tenants";
import { usePersona } from "@/context/PersonaContext";

export default function LuxurySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { setFormInterest } = usePersona();

  const scrollToFinale = () => {
    setFormInterest("leasing");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          y: 80,
          opacity: 0,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="luxury"
      className="deck-section bg-black relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <img
          src="/images/luxury/wing.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-black to-[#0f0a05]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 deck-section-padding flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[1200px] mx-auto w-full text-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eyebrow block mb-6"
          >
            The Collections
          </motion.span>

          {/* Main headline - massive */}
          <div ref={textRef}>
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-white mb-8">
              LUXURY
              <br />
              <span className="text-gradient-gold">REDEFINED</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-white/35 max-w-lg mx-auto leading-relaxed mb-20"
          >
            An elevated retail environment that rivals the world&apos;s most exclusive
            shopping destinations. Where discerning tastes meet uncompromising curation.
          </motion.p>

          {/* Luxury brand names - editorial reveal */}
          <div className="mb-20">
            <div className="flex flex-wrap justify-center gap-x-12 md:gap-x-20 gap-y-6">
              {luxuryBrands.map((brand, i) => (
                <motion.span
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-xl lg:text-2xl font-light text-white/15 hover:text-gold/60 transition-colors duration-700 tracking-[0.05em] cursor-default"
                >
                  {brand}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Feature pillars */}
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] max-w-[900px] mx-auto">
            {[
              {
                title: "Curated Experience",
                desc: "Every brand hand-selected for a cohesive luxury journey",
              },
              {
                title: "Premium Positioning",
                desc: "Dedicated wing with bespoke architecture and finishes",
              },
              {
                title: "Affluent Audience",
                desc: "Direct access to the tri-state's highest-income demographics",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="bg-black p-10 text-center group hover:bg-surface/30 transition-colors duration-500"
              >
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold/70 mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <button
              onClick={scrollToFinale}
              className="text-[10px] tracking-[0.15em] uppercase text-white/25 hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              Explore Luxury Leasing &rarr;
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
