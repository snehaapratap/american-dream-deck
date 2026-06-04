"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { leasingPaths } from "@/data/tenants";
import { leasingPricing } from "@/data/availability";
import { usePersona } from "@/context/PersonaContext";
import { gsap } from "@/lib/gsap-config";
import { Building, Store, UtensilsCrossed, Sparkles } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  luxury: <Sparkles size={20} />,
  retail: <Store size={20} />,
  fnb: <UtensilsCrossed size={20} />,
  popup: <Building size={20} />,
};

export default function LeasingSection() {
  const { setFormInterest } = usePersona();

  const scrollToFinale = () => {
    setFormInterest("leasing");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  return (
    <section id="leasing" className="deck-section bg-black relative noise">
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Leasing Opportunities"
          title="Find Your Space"
          subtitle="Tailored leasing pathways for every brand — from luxury flagships to pop-up activations."
        />

        {/* Leasing path cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {leasingPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/[0.04] bg-surface/20 hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="text-gold/40 group-hover:text-gold/70 transition-colors mt-1">
                    {icons[path.id]}
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-gold/40 block mb-1">
                      {path.subtitle}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                      {path.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[13px] text-white/30 leading-relaxed mb-6">
                  {path.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {path.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="w-1 h-1 bg-gold/40 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[12px] text-white/35 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                {leasingPricing[path.id] && (
                  <p className="text-[10px] text-gold/40 mb-4 tracking-wide">
                    {leasingPricing[path.id]}
                  </p>
                )}

                <button
                  onClick={scrollToFinale}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-gold transition-colors duration-300 flex items-center gap-2 group/btn cursor-pointer"
                >
                  {path.cta}
                  <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>

              {/* Bottom accent */}
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-gold/40 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
