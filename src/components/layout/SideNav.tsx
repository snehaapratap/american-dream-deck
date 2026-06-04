"use client";
import { sections } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

export default function SideNav() {
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    gsap.to(window, {
      scrollTo: { y: `#${id}`, offsetY: 0 },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5">
      {sections.filter(s => s.nav).map(({ id, shortTitle }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group relative flex items-center"
          aria-label={`Navigate to ${shortTitle}`}
        >
          <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 text-[10px] text-white/60 tracking-[0.15em] uppercase whitespace-nowrap">
            {shortTitle}
          </span>
          <span
            className={cn(
              "block transition-all duration-500",
              activeSection === id
                ? "w-6 h-[2px] bg-white"
                : "w-3 h-[1px] bg-white/20 group-hover:w-4 group-hover:bg-white/40"
            )}
          />
        </button>
      ))}
    </div>
  );
}
