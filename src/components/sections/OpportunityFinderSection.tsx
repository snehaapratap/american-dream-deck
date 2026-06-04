"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { personaOptions, type PersonaId } from "@/data/personas";
import { gsap } from "@/lib/gsap-config";
import {
  Store,
  Gem,
  Calendar,
  Megaphone,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Store: <Store size={28} />,
  Gem: <Gem size={28} />,
  Calendar: <Calendar size={28} />,
  Megaphone: <Megaphone size={28} />,
  UtensilsCrossed: <UtensilsCrossed size={28} />,
  Sparkles: <Sparkles size={28} />,
};

export default function OpportunityFinderSection() {
  const { persona, setPersona } = usePersona();
  const [selected, setSelected] = useState<NonNullable<PersonaId> | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleSelect = (id: NonNullable<PersonaId>) => {
    setSelected(id);
    setTransitioning(true);

    setTimeout(() => {
      setPersona(id);
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: { y: "#why", offsetY: 0 },
          duration: 1.4,
          ease: "power3.inOut",
        });
      }, 400);
    }, 800);
  };

  const handleSkip = () => {
    gsap.to(window, {
      scrollTo: { y: "#why", offsetY: 0 },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <section
      id="opportunity-finder"
      className="deck-section bg-black relative overflow-hidden flex items-center justify-center"
    >
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.015] rounded-full blur-[250px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        <AnimatePresence mode="wait">
          {!transitioning ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-16 md:mb-20"
              >
                <span className="eyebrow block mb-6">
                  Personalize Your Experience
                </span>
                <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-white">
                  WHO ARE{" "}
                  <span className="text-gradient-gold">YOU</span>
                </h2>
                <p className="mt-6 text-white/25 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                  Tell us about your business and we&apos;ll customize this
                  entire experience to match your goals.
                </p>
              </motion.div>

              {/* Persona Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {personaOptions.map((option, i) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => handleSelect(option.id)}
                    className={`group relative text-left p-7 md:p-8 border transition-all duration-500 cursor-pointer ${
                      selected === option.id
                        ? "border-gold/40 bg-gold/[0.05]"
                        : "border-white/[0.06] hover:border-white/15 bg-surface/20 hover:bg-surface-light/30"
                    }`}
                  >
                    <div
                      className={`mb-5 transition-colors duration-500 ${
                        selected === option.id
                          ? "text-gold"
                          : "text-white/25 group-hover:text-white/50"
                      }`}
                    >
                      {iconMap[option.icon]}
                    </div>
                    <h3
                      className={`text-lg font-bold mb-2 transition-colors duration-500 ${
                        selected === option.id
                          ? "text-gold"
                          : "text-white group-hover:text-white"
                      }`}
                    >
                      {option.name}
                    </h3>
                    <p className="text-[13px] text-white/30 leading-relaxed">
                      {option.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Skip */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center mt-10"
              >
                <button
                  onClick={handleSkip}
                  className="text-[11px] tracking-[0.15em] uppercase text-white/20 hover:text-white/40 transition-colors duration-300"
                >
                  Skip &mdash; Show Me Everything
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="transitioning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-48 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent origin-left mb-8"
              />
              <p className="text-[11px] tracking-[0.25em] uppercase text-gold/60">
                Personalizing your experience
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
