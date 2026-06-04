"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { brandArchetypes, type BrandArchetype } from "@/data/sponsorship-simulator";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  Dumbbell,
  Car,
  Cpu,
  Wine,
  Scissors,
  Landmark,
  Pencil,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Monitor,
  Share2,
  Footprints,
} from "lucide-react";
import { gsap } from "@/lib/gsap-config";

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell size={24} />,
  Car: <Car size={24} />,
  Cpu: <Cpu size={24} />,
  Wine: <Wine size={24} />,
  Scissors: <Scissors size={24} />,
  Landmark: <Landmark size={24} />,
};

export default function SponsorshipSimulatorSection() {
  const [selected, setSelected] = useState<BrandArchetype | null>(null);
  const [customName, setCustomName] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const { persona } = usePersona();

  const handleSelect = (arch: BrandArchetype) => {
    setSelected(arch);
    setShowCustom(false);
  };

  const handleCustom = () => {
    if (!customName.trim()) return;
    // Use the first archetype as a template for custom brands
    const customArch: BrandArchetype = {
      ...brandArchetypes[0],
      id: "custom",
      name: customName,
      activationConcept: `Custom brand activation for ${customName} — a tailored experiential marketing campaign designed around your brand identity. Our partnerships team will develop a bespoke concept leveraging American Dream's unique venue ecosystem.`,
    };
    setSelected(customArch);
  };

  return (
    <section
      id="sponsorship-sim"
      className="deck-section bg-black relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gold/[0.015] rounded-full blur-[250px] pointer-events-none" />

      <div className="relative z-10 deck-section-padding max-w-[1200px] mx-auto w-full">
        <SectionHeading
          eyebrow="Sponsorship Simulator"
          title="Imagine Your Brand Here"
        />

        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="pick"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mt-12 md:mt-16"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-6">
                Choose a brand type
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {brandArchetypes.map((arch, i) => (
                  <motion.button
                    key={arch.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    onClick={() => handleSelect(arch)}
                    className="group text-left p-6 border border-white/[0.06] hover:border-white/15 bg-surface/20 hover:bg-surface-light/30 transition-all duration-500 cursor-pointer"
                  >
                    <div className="text-white/20 group-hover:text-white/40 transition-colors mb-4">
                      {iconMap[arch.icon]}
                    </div>
                    <h4 className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      {arch.name}
                    </h4>
                  </motion.button>
                ))}

                {/* Custom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.36, duration: 0.5 }}
                  className="p-6 border border-dashed border-white/[0.08] hover:border-white/15 transition-all duration-500"
                >
                  {!showCustom ? (
                    <button
                      onClick={() => setShowCustom(true)}
                      className="w-full h-full flex flex-col items-start justify-center cursor-pointer"
                    >
                      <Pencil size={24} className="text-white/20 mb-4" />
                      <span className="text-sm text-white/40">Custom Brand</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCustom()}
                        placeholder="Brand name..."
                        className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2 placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                        autoFocus
                      />
                      <button
                        onClick={handleCustom}
                        className="text-[10px] tracking-[0.12em] uppercase text-gold/60 hover:text-gold transition-colors"
                      >
                        Simulate
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 md:mt-16"
            >
              {/* Activation Concept */}
              <div className="border border-gold/15 bg-gold/[0.02] p-6 md:p-8 mb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold/50 mb-3">
                  {selected.name} — Activation Concept
                </p>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {selected.activationFormat}
                </h3>
                <p className="text-[14px] text-white/35 leading-relaxed">
                  {selected.activationConcept}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Estimated Reach */}
                <div className="border border-white/[0.06] bg-surface/20 p-5">
                  <AnimatedCounter
                    value={selected.estimatedReach / 1000000}
                    suffix="M"
                    decimals={1}
                    label="Estimated Reach"
                  />
                </div>

                {/* Media Exposure */}
                <div className="border border-white/[0.06] bg-surface/20 p-5 space-y-3">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-white/25">
                    Media Exposure
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <Monitor size={12} className="text-white/20 flex-shrink-0" />
                    {selected.mediaExposure.digital}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <Share2 size={12} className="text-white/20 flex-shrink-0" />
                    {selected.mediaExposure.social}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <Footprints size={12} className="text-white/20 flex-shrink-0" />
                    {selected.mediaExposure.physical}
                  </div>
                </div>

                {/* Locations */}
                <div className="border border-white/[0.06] bg-surface/20 p-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={12} className="text-gold/50" />
                    <p className="text-[10px] tracking-[0.12em] uppercase text-white/25">
                      Suggested Locations
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {selected.suggestedLocations.map((loc) => (
                      <li
                        key={loc}
                        className="text-[12px] text-white/40 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gold/40 rounded-full" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Format */}
                <div className="border border-white/[0.06] bg-surface/20 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-2">
                      Activation Format
                    </p>
                    <p className="text-sm font-semibold text-white/70">
                      {selected.activationFormat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-[11px] tracking-[0.12em] uppercase border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-300"
                >
                  <ArrowLeft size={12} />
                  Try Another Brand
                </button>
                <button
                  onClick={() => {
                    gsap.to(window, {
                      scrollTo: { y: "#grand-finale", offsetY: 0 },
                      duration: 1.2,
                      ease: "power3.inOut",
                    });
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  Connect with Partnerships <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
