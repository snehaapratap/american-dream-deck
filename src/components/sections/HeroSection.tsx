"use client";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { motion } from "framer-motion";
import { heroStats } from "@/data/stats";
import { useLazyVideo } from "@/hooks/useLazyVideo";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { videoRef } = useLazyVideo();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(".hero-bg", { y: p * 120, scale: 1 + p * 0.05 });
          gsap.set(".hero-inner", { y: p * -50, opacity: 1 - p * 1.3 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="deck-section bg-black relative"
    >
      {/* Video background */}
      <div className="hero-bg absolute inset-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          poster="/images/hero/aerial.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </div>

      {/* Main content */}
      <div className="hero-inner relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-white/40 mb-8 md:mb-10">
              Interactive Sales Experience
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,8rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-white mb-6"
          >
            MORE THAN
            <br />
            A MALL
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 md:w-24 h-[1px] bg-gold mx-auto mb-8 origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base lg:text-lg text-white/40 max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            A destination where retail, entertainment,
            <br className="hidden md:block" />
            culture and commerce converge.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tabular-nums tracking-tight">
                  {typeof stat.value === "number" && stat.value >= 1000
                    ? `${(stat.value / 1000).toFixed(0)}K`
                    : stat.value}
                  <span className="text-white/50">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/25">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-16"
          >
            <button
              onClick={() =>
                gsap.to(window, {
                  scrollTo: { y: "#why", offsetY: 0 },
                  duration: 1.2,
                  ease: "power3.inOut",
                })
              }
              className="px-10 py-4 text-[11px] tracking-[0.2em] uppercase border border-white/15 text-white/70 hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Opportunity
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-1/2 bg-white/40"
                style={{ animation: "scroll-line 1.5s ease-in-out infinite" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner frames */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l border-t border-white/[0.04] hidden lg:block" />
      <div className="absolute top-24 right-8 w-16 h-16 border-r border-t border-white/[0.04] hidden lg:block" />
      <div className="absolute bottom-24 left-8 w-16 h-16 border-l border-b border-white/[0.04] hidden lg:block" />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r border-b border-white/[0.04] hidden lg:block" />
    </section>
  );
}
