"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersona, type FormInterest } from "@/context/PersonaContext";
import { Phone, Download, X, Check } from "lucide-react";
import { gsap } from "@/lib/gsap-config";

const personaCTAText: Record<string, string> = {
  "retail-brand": "Ready to secure your storefront?",
  "luxury-retailer": "Explore luxury leasing opportunities",
  "event-organizer": "Book your next venue",
  "corporate-sponsor": "Build your brand partnership",
  "fnb-operator": "Open your restaurant here",
  "popup-brand": "Launch your pop-up concept",
};

export default function FloatingCTABar() {
  const { persona, personaData } = usePersona();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"call" | "download">("call");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: "morning", interest: "leasing" as FormInterest });
  const lastScrollY = useRef(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const finderEl = document.getElementById("opportunity-finder");
      if (finderEl) {
        const rect = finderEl.getBoundingClientRect();
        setVisible(rect.bottom < 0);
      }
      setScrollingDown(window.scrollY > lastScrollY.current);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (type: "call" | "download") => {
    setModalType(type);
    setModalOpen(true);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    const submissions = JSON.parse(localStorage.getItem("ad-leads") || "[]");
    submissions.push({ ...form, type: modalType, persona, timestamp: new Date().toISOString() });
    localStorage.setItem("ad-leads", JSON.stringify(submissions));
    console.log("[Lead Captured]", { ...form, type: modalType, persona });

    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", time: "morning", interest: "leasing" });
    }, 3000);
  };

  const ctaText = persona ? personaCTAText[persona] ?? "Explore your opportunity" : "Explore your opportunity";

  if (!visible) return null;

  return (
    <>
      <AnimatePresence>
        {!scrollingDown && !modalOpen && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/[0.06]"
          >
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between h-14">
              <span className="text-[11px] md:text-[12px] text-white/40 tracking-wide hidden sm:block">
                {ctaText}
              </span>
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <button
                  onClick={() => openModal("call")}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 text-[10px] tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  <Phone size={11} />
                  Schedule a Call
                </button>
                <button
                  onClick={() => openModal("download")}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 text-[10px] tracking-[0.12em] uppercase border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Download size={11} />
                  <span className="hidden md:inline">Download Deck</span>
                  <span className="md:hidden">Deck</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md border border-white/[0.08] bg-[#0a0a0a] p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white/20 hover:text-white/50 transition-colors"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2">
                        {modalType === "call" ? "Schedule a Call" : "Download Custom Deck"}
                      </p>
                      <h3 className="text-lg font-bold text-white">
                        {modalType === "call"
                          ? "Let's discuss your opportunity"
                          : "Get your personalized deck"}
                      </h3>
                    </div>

                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 placeholder:text-white/15 focus:outline-none focus:border-gold/30 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 placeholder:text-white/15 focus:outline-none focus:border-gold/30 transition-colors"
                    />

                    {modalType === "call" && (
                      <>
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={form.phone}
                          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 placeholder:text-white/15 focus:outline-none focus:border-gold/30 transition-colors"
                        />
                        <select
                          value={form.time}
                          onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
                          className="w-full bg-transparent border-b border-white/10 text-white/40 text-sm py-2.5 focus:outline-none focus:border-gold/30 transition-colors [&>option]:bg-black"
                        >
                          <option value="morning">Morning (9am–12pm)</option>
                          <option value="afternoon">Afternoon (12pm–5pm)</option>
                          <option value="evening">Evening (5pm–7pm)</option>
                        </select>
                      </>
                    )}

                    <select
                      value={form.interest}
                      onChange={(e) => setForm(f => ({ ...f, interest: e.target.value as FormInterest }))}
                      className="w-full bg-transparent border-b border-white/10 text-white/40 text-sm py-2.5 focus:outline-none focus:border-gold/30 transition-colors [&>option]:bg-black"
                    >
                      <option value="leasing">Leasing</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="events">Events</option>
                      <option value="other">Other</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 text-[11px] tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
                    >
                      {modalType === "call" ? "Request Call" : "Send My Deck"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-12 h-12 rounded-full border-2 border-gold/60 flex items-center justify-center mx-auto mb-4"
                    >
                      <Check size={20} className="text-gold" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Thank you, {form.name.split(" ")[0]}
                    </h3>
                    <p className="text-[13px] text-white/30">
                      {modalType === "call"
                        ? "Our team will call you within 24 hours."
                        : "Your custom deck will arrive within 24 hours."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
