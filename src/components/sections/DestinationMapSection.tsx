"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { districts, type District } from "@/data/districts";
import SectionHeading from "@/components/ui/SectionHeading";
import { districtAvailability } from "@/data/availability";
import { X, MapPin, Users, Clock, DollarSign, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap-config";

const districtLayout: { id: string; x: number; y: number; w: number; h: number }[] = [
  { id: "luxury-wing", x: 5, y: 5, w: 30, h: 40 },
  { id: "high-traffic", x: 37, y: 5, w: 26, h: 90 },
  { id: "entertainment-district", x: 65, y: 5, w: 30, h: 40 },
  { id: "dining-district", x: 5, y: 48, w: 30, h: 47 },
  { id: "event-plaza", x: 65, y: 48, w: 30, h: 25 },
  { id: "family-attractions", x: 65, y: 75, w: 30, h: 20 },
];

export default function DestinationMapSection() {
  const [active, setActive] = useState<District | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { persona, personaData } = usePersona();

  const recommendedId = personaData?.recommendedDistrict ?? null;

  return (
    <section
      id="destination-map"
      className="deck-section bg-black relative overflow-hidden"
    >
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Interactive Map"
          title="Explore The Destination"
        />

        <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Map */}
          <div className="flex-1 relative">
            <svg
              viewBox="0 0 100 100"
              className="w-full aspect-square max-w-[600px] mx-auto"
            >
              {districtLayout.map((layout) => {
                const district = districts.find((d) => d.id === layout.id);
                if (!district) return null;
                const isHovered = hovered === district.id;
                const isRecommended = recommendedId === district.id;
                const isActive = active?.id === district.id;

                return (
                  <g
                    key={district.id}
                    onMouseEnter={() => setHovered(district.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(district)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={layout.x}
                      y={layout.y}
                      width={layout.w}
                      height={layout.h}
                      rx={1.5}
                      fill={
                        isActive
                          ? `${district.color}22`
                          : isHovered
                          ? `${district.color}15`
                          : "rgba(255,255,255,0.02)"
                      }
                      stroke={
                        isRecommended
                          ? "#D4AF37"
                          : isHovered || isActive
                          ? district.color
                          : "rgba(255,255,255,0.06)"
                      }
                      strokeWidth={isRecommended ? 0.6 : 0.3}
                      style={{ transition: "all 0.4s ease" }}
                    />
                    {isRecommended && (
                      <rect
                        x={layout.x}
                        y={layout.y}
                        width={layout.w}
                        height={layout.h}
                        rx={1.5}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth={0.4}
                        opacity={0.4}
                        className="animate-pulse"
                      />
                    )}
                    <text
                      x={layout.x + layout.w / 2}
                      y={layout.y + layout.h / 2 - 1}
                      textAnchor="middle"
                      fill={isHovered || isActive ? "white" : "rgba(255,255,255,0.3)"}
                      fontSize={2.2}
                      fontWeight={600}
                      letterSpacing={0.15}
                      style={{ transition: "fill 0.3s", textTransform: "uppercase" }}
                    >
                      {district.name}
                    </text>
                    <text
                      x={layout.x + layout.w / 2}
                      y={layout.y + layout.h / 2 + 2.5}
                      textAnchor="middle"
                      fill={isHovered || isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
                      fontSize={1.6}
                      style={{ transition: "fill 0.3s" }}
                    >
                      {district.dailyVisitors}/day
                    </text>
                    {isRecommended && (
                      <text
                        x={layout.x + layout.w / 2}
                        y={layout.y + layout.h / 2 + 5}
                        textAnchor="middle"
                        fill="#D4AF37"
                        fontSize={1.3}
                        fontWeight={600}
                        letterSpacing={0.1}
                      >
                        RECOMMENDED
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hovered && !active && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 glass border border-white/[0.08] px-5 py-3 pointer-events-none"
                >
                  {(() => {
                    const d = districts.find((d) => d.id === hovered);
                    if (!d) return null;
                    return (
                      <div className="text-center">
                        <p className="text-xs font-semibold text-white mb-1">{d.name}</p>
                        <p className="text-[11px] text-white/40">{d.demographics}</p>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-[380px] border border-white/[0.06] bg-surface/30 p-6 md:p-8 relative"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                <div
                  className="w-8 h-[2px] mb-5"
                  style={{ backgroundColor: active.color }}
                />

                <h3 className="text-xl font-bold text-white mb-2">
                  {active.name}
                </h3>
                <p className="text-[13px] text-white/30 leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-white/20" />
                    <div>
                      <p className="text-sm font-semibold text-white">{active.dailyVisitors}</p>
                      <p className="text-[10px] text-white/25">Daily Visitors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-white/20" />
                    <div>
                      <p className="text-sm font-semibold text-white">{active.avgSpend}</p>
                      <p className="text-[10px] text-white/25">Avg Spend</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-white/20" />
                    <div>
                      <p className="text-sm font-semibold text-white">{active.dwellTime}</p>
                      <p className="text-[10px] text-white/25">Dwell Time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-white/20" />
                    <div>
                      <p className="text-sm font-semibold text-white">{active.tenants.length}+</p>
                      <p className="text-[10px] text-white/25">Tenants</p>
                    </div>
                  </div>
                </div>

                {/* Tenants */}
                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-2">
                    Key Tenants
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tenants.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 border border-white/[0.06] text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Opportunity */}
                <div className="p-4 border border-gold/10 bg-gold/[0.03] mb-4">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-gold/60 mb-1">
                    Opportunity
                  </p>
                  <p className="text-sm text-white/60">{active.opportunities}</p>
                </div>

                {/* Availability */}
                {districtAvailability[active.id] && (
                  <div className="p-4 border border-white/[0.06] bg-surface/20 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${
                        districtAvailability[active.id].status === "available" ? "bg-emerald-400/60" :
                        districtAvailability[active.id].status === "limited" ? "bg-gold/60" : "bg-red-400/60"
                      }`} />
                      <p className="text-[10px] tracking-[0.12em] uppercase text-white/40">
                        {districtAvailability[active.id].status === "waitlist"
                          ? "Waitlist Only"
                          : `${districtAvailability[active.id].spacesAvailable} spaces available`}
                      </p>
                    </div>
                    <p className="text-[10px] text-white/20">
                      Last signed: {districtAvailability[active.id].lastSigning}
                    </p>
                  </div>
                )}

                {persona && active.personaFit[persona] && (
                  <div className="p-4 border border-gold/20 bg-gold/[0.04] mb-6">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-gold mb-1">
                      Match Score
                    </p>
                    <p className="text-2xl font-bold text-gold">
                      {active.personaFit[persona]}%
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setActive(null);
                    gsap.to(window, {
                      scrollTo: { y: "#grand-finale", offsetY: 0 },
                      duration: 1.2,
                      ease: "power3.inOut",
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-[11px] tracking-[0.12em] uppercase border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Inquire About This District
                  <ArrowRight size={12} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:w-[380px] flex items-center justify-center border border-white/[0.04] border-dashed p-8"
              >
                <p className="text-[13px] text-white/15 text-center">
                  Click a district on the map to explore opportunities
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
