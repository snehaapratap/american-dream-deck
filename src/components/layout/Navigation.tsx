"use client";
import { useState, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";
import { sections } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    gsap.to(window, {
      scrollTo: { y: `#${id}`, offsetY: 0 },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "glass border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => scrollTo("hero")}
            className="text-[13px] font-semibold tracking-[0.25em] uppercase text-white hover:text-gold transition-colors duration-300"
          >
            American Dream
          </button>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1">
            {sections.filter(s => s.nav && s.id !== "hero" && s.id !== "grand-finale").map(({ id, shortTitle }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "px-3 py-2 text-[11px] tracking-[0.12em] uppercase transition-all duration-300",
                  activeSection === id
                    ? "text-white"
                    : "text-white/35 hover:text-white/70"
                )}
              >
                {shortTitle}
              </button>
            ))}
            <button
              onClick={() => scrollTo("grand-finale")}
              className="ml-4 px-5 py-2 text-[11px] tracking-[0.12em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Connect
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden text-white/60 hover:text-white transition-colors p-2"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - full screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            {sections.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "py-3 px-8 text-sm tracking-[0.15em] uppercase transition-colors",
                  activeSection === id ? "text-white" : "text-white/30 hover:text-white/60"
                )}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
