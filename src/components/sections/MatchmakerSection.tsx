"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RadialProgress from "@/components/ui/RadialProgress";
import {
  industryOptions,
  formatOptions,
  budgetOptions,
  computeMatch,
  type Industry,
  type StoreFormat,
  type BudgetTier,
  type MatchmakerResult,
} from "@/data/matchmaker";
import { districtAvailability } from "@/data/availability";
import { ArrowRight, RotateCcw, MapPin, Zap } from "lucide-react";
import { gsap } from "@/lib/gsap-config";

export default function MatchmakerSection() {
  const { personaData } = usePersona();
  const [industry, setIndustry] = useState<Industry | null>(
    (personaData?.matchmakerDefaults.industry as Industry) ?? null
  );
  const [format, setFormat] = useState<StoreFormat | null>(
    (personaData?.matchmakerDefaults.format as StoreFormat) ?? null
  );
  const [budget, setBudget] = useState<BudgetTier | null>(null);
  const [result, setResult] = useState<MatchmakerResult | null>(null);

  const canSubmit = industry && format && budget;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const r = computeMatch(industry, format, budget);
    setResult(r);
  };

  const handleReset = () => {
    setResult(null);
    setIndustry((personaData?.matchmakerDefaults.industry as Industry) ?? null);
    setFormat((personaData?.matchmakerDefaults.format as StoreFormat) ?? null);
    setBudget(null);
  };

  return (
    <section
      id="matchmaker"
      className="deck-section bg-black relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.01] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 deck-section-padding max-w-[1200px] mx-auto w-full">
        <SectionHeading
          eyebrow="Business Matchmaker"
          title="Find Your Perfect Space"
        />

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 md:mt-16"
            >
              {/* Industry */}
              <div className="mb-10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Your Industry
                </p>
                <div className="flex flex-wrap gap-2">
                  {industryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setIndustry(opt.id)}
                      className={`px-5 py-3 text-[12px] tracking-[0.1em] uppercase border transition-all duration-300 cursor-pointer ${
                        industry === opt.id
                          ? "border-gold/40 bg-gold/[0.08] text-gold"
                          : "border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="mb-10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Store Format
                </p>
                <div className="flex flex-wrap gap-2">
                  {formatOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormat(opt.id)}
                      className={`px-5 py-3 text-[12px] tracking-[0.1em] uppercase border transition-all duration-300 cursor-pointer ${
                        format === opt.id
                          ? "border-gold/40 bg-gold/[0.08] text-gold"
                          : "border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-12">
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Annual Budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBudget(opt.id)}
                      className={`px-5 py-3 text-[12px] border transition-all duration-300 cursor-pointer ${
                        budget === opt.id
                          ? "border-gold/40 bg-gold/[0.08] text-gold"
                          : "border-white/[0.06] text-white/40 hover:border-white/15 hover:text-white/60"
                      }`}
                    >
                      <span className="tracking-[0.1em] uppercase">{opt.label}</span>
                      <span className="ml-2 text-[10px] text-white/20">{opt.range}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`px-10 py-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                  canSubmit
                    ? "bg-white text-black hover:bg-white/90 cursor-pointer"
                    : "bg-white/5 text-white/15 cursor-not-allowed"
                }`}
              >
                Find My Match
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 md:mt-16"
            >
              {/* Top result */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {/* District */}
                <div className="md:col-span-2 border border-gold/20 bg-gold/[0.03] p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-gold" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gold">
                      Recommended District
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {result.district.name}
                  </h3>
                  <p className="text-[13px] text-white/30 leading-relaxed mb-4">
                    {result.district.description}
                  </p>
                  {districtAvailability[result.district.id] && (
                    <p className="text-[10px] text-gold/40 mb-3">
                      {districtAvailability[result.district.id].spacesAvailable > 0
                        ? `${districtAvailability[result.district.id].spacesAvailable} spaces available — ${districtAvailability[result.district.id].commitment2026}% committed for 2026`
                        : `Waitlist only — ${districtAvailability[result.district.id].commitment2026}% committed for 2026`}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      gsap.to(window, {
                        scrollTo: { y: "#destination-map", offsetY: 0 },
                        duration: 1.2,
                        ease: "power3.inOut",
                      });
                    }}
                    className="text-[10px] tracking-[0.12em] uppercase text-gold/60 hover:text-gold transition-colors flex items-center gap-1"
                  >
                    View on Map <ArrowRight size={10} />
                  </button>
                </div>

                {/* Audience Match */}
                <div className="border border-white/[0.06] bg-surface/20 p-6 flex flex-col items-center justify-center">
                  <RadialProgress
                    value={result.audienceMatch}
                    maxValue={100}
                    size={110}
                    suffix="%"
                  />
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 mt-2">
                    Audience Match
                  </p>
                </div>
              </div>

              {/* Secondary results */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Exposure */}
                <div className="border border-white/[0.06] bg-surface/20 p-6">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-3">
                    Projected Annual Exposure
                  </p>
                  <AnimatedCounter
                    value={result.projectedExposure / 1000000}
                    suffix="M"
                    decimals={1}
                    label="Impressions"
                  />
                </div>

                {/* Nearby Brands */}
                <div className="border border-white/[0.06] bg-surface/20 p-6">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-3">
                    Complementary Brands Nearby
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.nearbyBrands.map((b) => (
                      <span
                        key={b}
                        className="text-[11px] px-2.5 py-1 border border-white/[0.06] text-white/50"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activations */}
                <div className="border border-white/[0.06] bg-surface/20 p-6">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Zap size={12} className="text-gold/50" />
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/25">
                      Suggested Activations
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {result.activations.map((a) => (
                      <li
                        key={a}
                        className="text-[12px] text-white/40 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gold/40 rounded-full" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-[11px] tracking-[0.12em] uppercase border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-300"
                >
                  <RotateCcw size={12} />
                  Recalculate
                </button>
                <button
                  onClick={() => {
                    gsap.to(window, {
                      scrollTo: { y: "#grand-finale", offsetY: 0 },
                      duration: 1.2,
                      ease: "power3.inOut",
                    });
                  }}
                  className="px-8 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  Talk to Leasing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
