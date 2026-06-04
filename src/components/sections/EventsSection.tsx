"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { eventTypes } from "@/data/tenants";
import { usePersona } from "@/context/PersonaContext";
import { gsap } from "@/lib/gsap-config";
import { Music, Zap, Briefcase, Star, ShoppingBag } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={18} />,
  zap: <Zap size={18} />,
  briefcase: <Briefcase size={18} />,
  star: <Star size={18} />,
  "shopping-bag": <ShoppingBag size={18} />,
};

export default function EventsSection() {
  const { setFormInterest } = usePersona();

  const scrollToFinale = () => {
    setFormInterest("events");
    gsap.to(window, { scrollTo: { y: "#grand-finale", offsetY: 0 }, duration: 1.2, ease: "power3.inOut" });
  };

  return (
    <section id="events" className="deck-section bg-black relative noise">
      <img
        src="/images/events/concert.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
      />
      <div className="relative z-10 deck-section-padding max-w-[1400px] mx-auto w-full">
        <SectionHeading
          eyebrow="Events & Activations"
          title="Your Stage. Your Audience."
          subtitle="American Dream isn't just a venue — it's a platform. With 40M+ annual visitors, your brand reaches an audience no single venue can deliver."
        />

        {/* Event types grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-20">
          {eventTypes.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/[0.04] bg-surface/30 p-8 hover:border-white/10 transition-all duration-500"
            >
              <div className="text-gold/50 mb-5 group-hover:text-gold/80 transition-colors">
                {iconMap[event.icon]}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{event.name}</h3>
              <p className="text-[12px] text-white/30 leading-relaxed mb-5">
                {event.description}
              </p>
              <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                <span className="text-[9px] tracking-[0.2em] uppercase text-gold/40">
                  Capacity
                </span>
                <span className="text-[11px] text-white/40">{event.capacity}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
          {[
            { stat: "500+", label: "Events Per Year" },
            { stat: "40M+", label: "Annual Foot Traffic" },
            { stat: "500M+", label: "Social Impressions" },
            { stat: "365", label: "Days of Programming" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-black p-8 md:p-10 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{item.stat}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/20 mt-2">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <button
            onClick={scrollToFinale}
            className="px-8 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer"
          >
            Book Your Event &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  );
}
