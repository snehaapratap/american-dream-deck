"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Music, Zap, Briefcase, Star, ShoppingBag, Send } from "lucide-react";

const eventCategories = [
  {
    id: "concerts",
    icon: <Music size={20} />,
    name: "Concerts & Live Music",
    description: "State-of-the-art sound and staging in purpose-built performance spaces.",
    capacity: "Up to 3,000",
    examples: ["Live Nation Concert Series", "Holiday Music Festival", "Emerging Artist Showcases"],
    benefits: [
      "Built-in audience from 40M+ annual visitors",
      "Premium production facilities & acoustics",
      "Full-service event coordination",
      "Multi-channel marketing support",
    ],
  },
  {
    id: "activations",
    icon: <Zap size={20} />,
    name: "Brand Activations",
    description: "Immersive brand experiences in high-traffic, high-visibility locations.",
    capacity: "500 to 50,000 sq ft",
    examples: ["Nike Interactive Experience", "Samsung Galaxy Launch", "Holiday Brand Pop-Ups"],
    benefits: [
      "500M+ annual social media impressions",
      "Premium positioning in high-traffic zones",
      "Flexible space configurations",
      "Integrated digital amplification",
    ],
  },
  {
    id: "corporate",
    icon: <Briefcase size={20} />,
    name: "Corporate Events",
    description: "Versatile premium spaces for launches, conferences, galas, and private events.",
    capacity: "Up to 5,000",
    examples: ["Fortune 500 Product Launch", "Annual Gala Dinner", "Industry Conference"],
    benefits: [
      "World-class catering partners",
      "Full AV & production infrastructure",
      "VIP and breakout spaces",
      "NYC-adjacent convenience",
    ],
  },
  {
    id: "holiday",
    icon: <Star size={20} />,
    name: "Seasonal Experiences",
    description: "Large-scale seasonal programming that transforms the property.",
    capacity: "Property-wide",
    examples: ["Winter Wonderland", "Summer Concert Series", "Halloween Spectacular"],
    benefits: [
      "Peak foot traffic periods",
      "Cross-promotional opportunities",
      "Significant media & PR value",
      "Multi-week engagement windows",
    ],
  },
  {
    id: "popup",
    icon: <ShoppingBag size={20} />,
    name: "Pop-Up Retail",
    description: "Short-term retail activations in premium high-traffic locations.",
    capacity: "500 to 5,000 sq ft",
    examples: ["Celebrity Brand Launch", "Seasonal Fashion Pop-Up", "Art Installation & Sales"],
    benefits: [
      "Low commitment, high impact",
      "Turnkey retail infrastructure",
      "Test market before long-term lease",
      "Premium foot traffic guaranteed",
    ],
  },
];

export default function EventsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <a
            href="/"
            className="flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            <span className="text-[11px] tracking-[0.15em] uppercase">Back to Deck</span>
          </a>
          <span className="text-[11px] tracking-[0.25em] uppercase text-white/60">
            Events & Activations
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 md:px-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/[0.03] rounded-full blur-[200px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <span className="eyebrow block mb-6">Events & Experiences</span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.03em] leading-[1] text-white mb-5">
            Your Stage.
            <br />
            <span className="text-white/40">40 Million Strong.</span>
          </h1>
          <p className="text-sm md:text-base text-white/30 max-w-lg mx-auto leading-relaxed">
            From intimate brand activations to large-scale concerts, American Dream provides
            the platform, the audience, and the infrastructure.
          </p>
        </div>
      </section>

      {/* Event Categories - Accordion */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-[1200px] mx-auto space-y-px">
          {eventCategories.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="w-full group"
              >
                <div className="flex items-center gap-6 p-6 md:p-8 border border-white/[0.04] bg-surface/30 hover:bg-surface-light/30 transition-all duration-500">
                  <div className="text-gold/50 flex-shrink-0">{cat.icon}</div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-white/25 mt-0.5">{cat.description}</p>
                  </div>
                  <span className="hidden md:block text-[10px] text-white/15 tracking-wider flex-shrink-0">
                    {cat.capacity}
                  </span>
                  <motion.div
                    animate={{ rotate: expanded === cat.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/20 text-lg flex-shrink-0"
                  >
                    +
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expanded === cat.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 md:p-10 border border-t-0 border-white/[0.04] bg-surface/10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[9px] tracking-[0.25em] uppercase text-gold/50 mb-4">
                            Past Highlights
                          </h4>
                          <ul className="space-y-2.5">
                            {cat.examples.map((ex) => (
                              <li key={ex} className="flex items-center gap-3 text-[12px] text-white/35">
                                <span className="w-1 h-1 bg-gold/30 rounded-full" />
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[9px] tracking-[0.25em] uppercase text-gold/50 mb-4">
                            Partner Benefits
                          </h4>
                          <ul className="space-y-2.5">
                            {cat.benefits.map((b) => (
                              <li key={b} className="flex items-center gap-3 text-[12px] text-white/35">
                                <span className="w-1 h-1 bg-gold/30 rounded-full" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow block mb-4">Get Started</span>
            <h2 className="heading-md text-white mb-3">Book Your Experience</h2>
            <p className="text-[13px] text-white/25">
              Tell us about your vision and our events team will create a tailored proposal.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border border-gold/15"
            >
              <div className="text-gold text-3xl mb-4">&#10003;</div>
              <h3 className="text-xl font-semibold text-white mb-2">Thank You</h3>
              <p className="text-[13px] text-white/30">
                Our events team will be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full bg-transparent border border-white/[0.08] px-5 py-3.5 text-white text-[13px] placeholder:text-white/15 focus:border-gold/30 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Company"
                  className="w-full bg-transparent border border-white/[0.08] px-5 py-3.5 text-white text-[13px] placeholder:text-white/15 focus:border-gold/30 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <select
                  required
                  className="w-full bg-transparent border border-white/[0.08] px-5 py-3.5 text-white text-[13px] focus:border-gold/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-black">Event Type</option>
                  {eventCategories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-black">{c.name}</option>
                  ))}
                </select>
                <select
                  className="w-full bg-transparent border border-white/[0.08] px-5 py-3.5 text-white text-[13px] focus:border-gold/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-black">Budget Range</option>
                  <option value="10-50" className="bg-black">$10K - $50K</option>
                  <option value="50-150" className="bg-black">$50K - $150K</option>
                  <option value="150-500" className="bg-black">$150K - $500K</option>
                  <option value="500+" className="bg-black">$500K+</option>
                </select>
              </div>
              <textarea
                rows={4}
                placeholder="Tell us about your vision..."
                className="w-full bg-transparent border border-white/[0.08] px-5 py-3.5 text-white text-[13px] placeholder:text-white/15 focus:border-gold/30 focus:outline-none transition-colors resize-none"
              />
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  <Send size={12} />
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
