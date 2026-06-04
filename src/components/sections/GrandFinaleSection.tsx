"use client";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { AnimatePresence } from "framer-motion";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import { Building, Users, Calendar, ArrowRight, Send, Check, Loader2 } from "lucide-react";

const ctaPaths = [
  {
    key: "lease",
    icon: <Building size={28} />,
    title: "Lease Space",
    description:
      "Join 450+ world-class brands in the most dynamic retail destination in North America. Premium locations with unmatched foot traffic.",
    benefits: [
      "40M+ annual visitors",
      "3.5-hour average dwell time",
      "22M regional catchment",
      "Turnkey build-out options",
    ],
    action: "Start Leasing Inquiry",
  },
  {
    key: "sponsor",
    icon: <Users size={28} />,
    title: "Become A Sponsor",
    description:
      "Custom partnership packages reaching 40M+ annual visitors across 500M+ social impressions. Unmatched brand visibility.",
    benefits: [
      "500M+ social impressions",
      "Integrated media network",
      "Experiential activations",
      "Custom partnership tiers",
    ],
    action: "Explore Partnerships",
  },
  {
    key: "event",
    icon: <Calendar size={28} />,
    title: "Book An Event",
    description:
      "From intimate product launches to 18,000-capacity concerts — turnkey production with world-class infrastructure.",
    benefits: [
      "18,000 max capacity",
      "500+ events per year",
      "Full production support",
      "Built-in audiences",
    ],
    action: "Plan Your Event",
  },
];

export default function GrandFinaleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { persona, personaData, formInterest } = usePersona();
  const { videoRef: bgVideoRef } = useLazyVideo();
  const [formData, setFormData] = useState({ name: "", email: "", interest: "leasing" });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [returnVisitor, setReturnVisitor] = useState<string | null>(null);

  // Sync formInterest from context
  useEffect(() => {
    if (formInterest) {
      setFormData((d) => ({ ...d, interest: formInterest }));
    }
  }, [formInterest]);

  // Check for return visitor
  useEffect(() => {
    const submissions = JSON.parse(localStorage.getItem("ad-submissions") || "[]");
    if (submissions.length > 0) {
      setReturnVisitor(submissions[submissions.length - 1].name);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });

      if (line1Ref.current) {
        tl.from(line1Ref.current, { y: 60, opacity: 0 }, 0);
      }
      if (line2Ref.current) {
        tl.from(line2Ref.current, { y: 60, opacity: 0 }, 0.15);
      }
      if (line3Ref.current) {
        tl.from(line3Ref.current, { y: 60, opacity: 0 }, 0.3);
      }
      if (glowRef.current) {
        tl.from(glowRef.current, { opacity: 0, scale: 0.8 }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const primaryConversion = personaData?.primaryConversion ?? null;

  return (
    <section
      ref={sectionRef}
      id="grand-finale"
      className="bg-black relative overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={bgVideoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
      >
        <source src="/videos/finale.mp4" type="video/mp4" />
      </video>

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gold/[0.025] rounded-full blur-[350px] pointer-events-none"
      />

      {/* Part 1: The Statement */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 lg:px-16">
        <div className="text-center">
          <div
            ref={line1Ref}
            className="text-[clamp(2rem,5.5vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-white"
          >
            YOUR NEXT <span className="text-gradient-gold">FLAGSHIP.</span>
          </div>
          <div
            ref={line2Ref}
            className="text-[clamp(2rem,5.5vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mt-2"
          >
            YOUR NEXT <span className="text-gradient-gold">ACTIVATION.</span>
          </div>
          <div
            ref={line3Ref}
            className="text-[clamp(2rem,5.5vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mt-2"
          >
            YOUR NEXT <span className="text-gradient-gold">BIG EVENT.</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-white/20 text-base md:text-lg max-w-md mx-auto"
          >
            All in one destination.
          </motion.p>
        </div>
      </div>

      {/* Part 2: Conversion Cards */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {ctaPaths.map((path, i) => {
            const isRecommended = primaryConversion === path.key;
            const ctaText =
              personaData?.ctaOverrides?.[path.key as keyof typeof personaData.ctaOverrides] ??
              path.action;

            return (
              <motion.div
                key={path.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group cursor-pointer border p-8 md:p-10 transition-all duration-500 relative ${
                  isRecommended
                    ? "border-gold/30 bg-gold/[0.04] shadow-[0_0_40px_rgba(212,175,55,0.06)]"
                    : "border-white/[0.06] bg-surface/20 hover:border-white/15 hover:bg-surface-light/30"
                }`}
              >
                {isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
                {isRecommended && (
                  <span className="absolute top-3 right-4 text-[9px] tracking-[0.2em] uppercase text-gold/70">
                    Recommended
                  </span>
                )}

                <div
                  className={`mb-6 transition-colors duration-500 ${
                    isRecommended
                      ? "text-gold"
                      : "text-white/20 group-hover:text-gold"
                  }`}
                >
                  {path.icon}
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${
                    isRecommended
                      ? "text-gold"
                      : "text-white group-hover:text-gold"
                  }`}
                >
                  {path.title}
                </h3>

                <p className="text-[13px] text-white/25 leading-relaxed mb-6">
                  {path.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {path.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-[12px] text-white/35"
                    >
                      <span className="w-1 h-1 bg-gold/40 rounded-full flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div
                  className={`flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase transition-colors duration-500 ${
                    isRecommended
                      ? "text-gold"
                      : "text-white/30 group-hover:text-gold"
                  }`}
                >
                  {ctaText}
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part 3: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 border border-white/[0.06] bg-surface/10 p-6 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-4">
                Get In Touch
              </p>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                Ready to explore the opportunity?
              </h4>
              <p className="text-[13px] text-white/25 leading-relaxed mb-8">
                Our team is available to discuss your goals and create a
                tailored proposal for your business.
              </p>
              <div className="space-y-3 text-white/15 text-[12px] tracking-wider">
                <p>leasing@americandream.com</p>
                <p>+1 (201) 000-0000</p>
                <p>1 American Dream Way, East Rutherford, NJ 07073</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newErrors: { name?: string; email?: string } = {};
                    if (!formData.name.trim()) newErrors.name = "Name is required";
                    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                      newErrors.email = "Valid email is required";
                    setErrors(newErrors);
                    if (Object.keys(newErrors).length > 0) return;

                    setFormState("submitting");
                    setTimeout(() => {
                      const submissions = JSON.parse(localStorage.getItem("ad-submissions") || "[]");
                      submissions.push({ ...formData, persona, timestamp: new Date().toISOString() });
                      localStorage.setItem("ad-submissions", JSON.stringify(submissions));
                      console.log("[Inquiry Submitted]", { ...formData, persona });
                      setFormState("success");
                    }, 1500);
                  }}
                  className="space-y-4"
                >
                  {returnVisitor && (
                    <div className="px-3 py-2 border border-gold/15 bg-gold/[0.03] mb-2">
                      <p className="text-[10px] text-gold/60">
                        Welcome back, {returnVisitor.split(" ")[0]}
                      </p>
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((d) => ({ ...d, name: e.target.value }));
                        if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                      }}
                      className={`w-full bg-transparent border-b text-white text-sm py-3 placeholder:text-white/15 focus:outline-none transition-colors ${
                        errors.name ? "border-red-400/60" : "border-white/10 focus:border-gold/30"
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-400/70 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((d) => ({ ...d, email: e.target.value }));
                        if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                      }}
                      className={`w-full bg-transparent border-b text-white text-sm py-3 placeholder:text-white/15 focus:outline-none transition-colors ${
                        errors.email ? "border-red-400/60" : "border-white/10 focus:border-gold/30"
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-400/70 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <select
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData((d) => ({ ...d, interest: e.target.value }))
                      }
                      className="w-full bg-transparent border-b border-white/10 text-white/40 text-sm py-3 focus:outline-none focus:border-gold/30 transition-colors [&>option]:bg-black"
                    >
                      <option value="leasing">Leasing Inquiry</option>
                      <option value="sponsorship">Sponsorship Partnership</option>
                      <option value="events">Event Booking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="mt-4 flex items-center justify-center gap-2 px-8 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 min-w-[180px] disabled:opacity-70"
                  >
                    {formState === "submitting" ? (
                      <Loader2 size={14} className="animate-spin text-gold" />
                    ) : (
                      <>
                        <Send size={12} />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center mb-5"
                  >
                    <Check size={24} className="text-gold" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Thank you, {formData.name.split(" ")[0]}.
                  </h4>
                  <p className="text-[13px] text-white/30 mb-1">
                    Our {formData.interest === "leasing" ? "Leasing" : formData.interest === "sponsorship" ? "Partnerships" : formData.interest === "events" ? "Events" : "Sales"} team will contact you within 24 hours.
                  </p>
                  <p className="text-[11px] text-white/15">
                    A confirmation has been saved to your session.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="hr-gold mb-8 max-w-xs mx-auto" />
          <p className="text-white/[0.06] text-[10px] tracking-[0.15em]">
            &copy; {new Date().getFullYear()} American Dream. Interactive Sales
            Deck.
          </p>
        </div>
      </div>
    </section>
  );
}
