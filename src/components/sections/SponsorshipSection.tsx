"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { sponsorshipTiers } from "@/data/tenants";
import { sponsorshipStats as statData } from "@/data/stats";
import { sponsorshipCalendar } from "@/data/availability";
import { usePersona } from "@/context/PersonaContext";
import { gsap } from "@/lib/gsap-config";

export default function SponsorshipSection() {
  const { personaData, setFormInterest } = usePersona();
  const relevantTier = personaData?.relevantSponsorshipTier ?? null;

  const scrollToFinale = () => {
    setFormInterest("sponsorship");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };
  return (
    <section id="sponsorship" className="deck-section bg-surface relative noise">
      <img
        src="/images/sponsorship/activation.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
      />
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Sponsorship Opportunities"
          title="Amplify Your Brand"
          subtitle="Partner with the most dynamic destination in North America. Custom sponsorship packages designed to maximize visibility, engagement, and ROI."
        />

        {/* Reach stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {statData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {sponsorshipTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative border ${
                tier.level.toLowerCase() === relevantTier
                  ? "border-gold/30 bg-gold/[0.04] shadow-[0_0_30px_rgba(212,175,55,0.04)]"
                  : i === 0
                  ? "border-gold/20 bg-gold/[0.02]"
                  : "border-white/[0.06] bg-surface-light/30"
              } p-8 md:p-10 transition-all duration-500 hover:border-white/15`}
            >
              {/* Tier badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-[9px] tracking-[0.25em] uppercase px-3 py-1 border ${
                    i === 0
                      ? "text-gold border-gold/30"
                      : i === 1
                      ? "text-white/50 border-white/15"
                      : "text-white/30 border-white/10"
                  }`}
                >
                  {tier.level}
                </span>
                <span className="text-[10px] text-white/20 tracking-wider">
                  {tier.reach}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                {tier.name}
              </h3>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[12px] text-white/35 leading-relaxed">
                    <span className="w-1 h-1 bg-gold/40 rounded-full mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <button
                  onClick={scrollToFinale}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-gold transition-colors duration-300 cursor-pointer"
                >
                  Request Details &rarr;
                </button>
              </div>

              {/* Premium card glow for platinum */}
              {i === 0 && (
                <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mock activation concept */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 border border-white/[0.06] p-8 md:p-12"
        >
          <div className="text-center">
            <span className="eyebrow block mb-4">Activation Concept</span>
            <h3 className="heading-md text-white mb-4">
              Immersive Brand Takeover
            </h3>
            <p className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed mb-8">
              Imagine your brand taking over 10,000 sq ft of prime space — interactive
              installations, product sampling, social media moments, and direct
              consumer engagement with 40M+ annual visitors walking past your activation.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {["High Traffic Zone", "Full Production", "Digital Amplification"].map((item) => (
                <div key={item} className="text-[9px] tracking-[0.1em] uppercase text-white/20 border border-white/[0.04] py-3 px-2">
                  {item}
                </div>
              ))}
            </div>

            {/* Calendar urgency */}
            <p className="mt-6 text-[10px] tracking-[0.12em] text-gold/40">
              {sponsorshipCalendar.quarter} Calendar: {sponsorshipCalendar.committed}% Committed — {sponsorshipCalendar.remaining} slots remaining
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
