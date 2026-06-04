"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion } from "framer-motion";
import { Building, Users, Calendar, ArrowRight } from "lucide-react";

const ctaPaths = [
  {
    icon: <Building size={22} />,
    title: "Lease Space",
    description: "Join 450+ world-class brands in the most dynamic retail destination in North America.",
    action: "Start Leasing Inquiry",
  },
  {
    icon: <Users size={22} />,
    title: "Become A Sponsor",
    description: "Custom partnership packages reaching 40M+ annual visitors across 500M+ social impressions.",
    action: "Explore Partnerships",
  },
  {
    icon: <Calendar size={22} />,
    title: "Book An Event",
    description: "Concerts, brand activations, product launches — the stage is set. Your audience is waiting.",
    action: "Plan Your Event",
  },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          y: 60,
          scale: 0.92,
          opacity: 0,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="deck-section bg-black relative overflow-hidden"
    >
      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/[0.02] rounded-full blur-[300px] pointer-events-none" />

      <div className="relative z-10 deck-section-padding max-w-[1200px] mx-auto w-full">
        {/* Massive headline */}
        <div className="text-center mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow block mb-8"
          >
            Partner With Us
          </motion.span>

          <h2
            ref={headingRef}
            className="text-[clamp(2.5rem,7vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-white"
          >
            YOUR BRAND
            <br />
            <span className="text-gradient-gold">BELONGS HERE</span>
          </h2>
        </div>

        {/* Three CTA cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-24">
          {ctaPaths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer border border-white/[0.06] bg-surface/20 p-8 md:p-10 hover:border-white/15 hover:bg-surface-light/30 transition-all duration-500"
            >
              <div className="text-white/30 mb-6 group-hover:text-gold transition-colors duration-500">
                {path.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-500">
                {path.title}
              </h3>

              <p className="text-[13px] text-white/30 leading-relaxed mb-8">
                {path.description}
              </p>

              <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white/30 group-hover:text-gold transition-colors duration-500">
                {path.action}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <div className="hr-gold mb-12 max-w-xs mx-auto" />

          <p className="text-sm md:text-base text-white/20 mb-12 max-w-md mx-auto leading-relaxed">
            Ready to explore the opportunity? Our team is available to discuss
            your goals and create a tailored proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/modules/events"
              className="px-10 py-4 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
            >
              Get Started
            </a>
            <a
              href="/modules/events"
              className="px-10 py-4 text-[11px] tracking-[0.15em] uppercase border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all duration-500"
            >
              View Events
            </a>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/15 text-[11px] tracking-wider">
            <span>leasing@americandream.com</span>
            <span className="hidden sm:block">&bull;</span>
            <span>+1 (201) 000-0000</span>
            <span className="hidden sm:block">&bull;</span>
            <span>1 American Dream Way, East Rutherford, NJ 07073</span>
          </div>

          <p className="mt-12 text-white/[0.08] text-[10px] tracking-[0.15em]">
            &copy; {new Date().getFullYear()} American Dream. Interactive Sales Deck.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
