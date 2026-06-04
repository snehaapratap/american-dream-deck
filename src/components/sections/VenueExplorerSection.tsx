"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { eventTypes } from "@/data/venues";
import { venueAvailability } from "@/data/availability";
import SectionHeading from "@/components/ui/SectionHeading";
import { Users, Layout, TrendingUp, Tag, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap-config";

export default function VenueExplorerSection() {
  const [activeId, setActiveId] = useState(eventTypes[0].id);
  const { persona } = usePersona();
  const active = eventTypes.find((e) => e.id === activeId)!;
  const isEventOrganizer = persona === "event-organizer";

  return (
    <section
      id="venue-explorer"
      className="deck-section bg-black relative overflow-hidden"
    >
      <div className="relative z-10 deck-section-padding max-w-[1200px] mx-auto w-full">
        <SectionHeading
          eyebrow="Venue Explorer"
          title="Your Stage Awaits"
        />

        {isEventOrganizer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-gold/20 bg-gold/[0.04]"
          >
            <span className="text-[10px] tracking-[0.15em] uppercase text-gold">
              Curated for Event Organizers
            </span>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mt-10 md:mt-14 flex flex-wrap gap-1 border-b border-white/[0.06] pb-px relative">
          {eventTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveId(type.id)}
              className={`relative px-5 py-3 text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                activeId === type.id
                  ? "text-white"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {type.name}
              {activeId === type.id && (
                <motion.div
                  layoutId="venue-tab"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <p className="text-[14px] text-white/30 leading-relaxed max-w-2xl">
                {active.description}
              </p>
            </div>
            {venueAvailability[active.id] && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 bg-gold/[0.03] mb-6">
                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                <span className="text-[10px] tracking-[0.1em] text-gold/60">
                  {venueAvailability[active.id]} — Venues book 3+ months in advance
                </span>
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              <div className="border border-white/[0.06] bg-surface/20 p-5">
                <Users size={16} className="text-white/20 mb-3" />
                <p className="text-xl font-bold text-white">{active.capacity}</p>
                <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mt-1">
                  Capacity
                </p>
              </div>
              <div className="border border-white/[0.06] bg-surface/20 p-5">
                <Layout size={16} className="text-white/20 mb-3" />
                <p className="text-sm font-semibold text-white leading-snug">{active.layout}</p>
                <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mt-1">
                  Layout
                </p>
              </div>
              <div className="border border-white/[0.06] bg-surface/20 p-5">
                <TrendingUp size={16} className="text-white/20 mb-3" />
                <p className="text-sm font-semibold text-white">{active.footTraffic}</p>
                <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mt-1">
                  Foot Traffic
                </p>
              </div>
              <div className="border border-white/[0.06] bg-surface/20 p-5">
                <Tag size={16} className="text-white/20 mb-3" />
                <p className="text-xl font-bold text-white">{active.brandingSlots}</p>
                <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mt-1">
                  Branding Slots
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Past Events */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4">
                  Past Events
                </p>
                <div className="space-y-2">
                  {active.pastEvents.map((evt) => (
                    <div
                      key={evt.name}
                      className="flex items-center justify-between border border-white/[0.04] p-4"
                    >
                      <span className="text-[13px] text-white/50">{evt.name}</span>
                      <span className="text-[12px] font-semibold text-white/70 tabular-nums">
                        {evt.attendance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branding Opportunities */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4">
                  Branding Opportunities
                </p>
                <ul className="space-y-2">
                  {active.brandingOpportunities.map((opp) => (
                    <li
                      key={opp}
                      className="flex items-center gap-2 text-[13px] text-white/40"
                    >
                      <span className="w-1 h-1 bg-gold/40 rounded-full flex-shrink-0" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                onClick={() => {
                  gsap.to(window, {
                    scrollTo: { y: "#grand-finale", offsetY: 0 },
                    duration: 1.2,
                    ease: "power3.inOut",
                  });
                }}
                className="flex items-center gap-2 px-8 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
              >
                Book This Venue <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
