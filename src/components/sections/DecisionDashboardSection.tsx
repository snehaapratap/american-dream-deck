"use client";
import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import {
  executiveMetrics,
  competitiveComparisons,
} from "@/data/dashboard-metrics";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RadialProgress from "@/components/ui/RadialProgress";
import ROICalculator from "@/components/ui/ROICalculator";
import DataBar from "@/components/ui/DataBar";
import {
  Users,
  DollarSign,
  Clock,
  Globe,
  Award,
  Gem,
  CalendarCheck,
} from "lucide-react";

const metricIcons: Record<string, React.ReactNode> = {
  "visitor-reach": <Users size={16} />,
  "consumer-spending": <DollarSign size={16} />,
  "dwell-time": <Clock size={16} />,
  "regional-influence": <Globe size={16} />,
  "audience-quality": <Award size={16} />,
  "luxury-affinity": <Gem size={16} />,
  "event-engagement": <CalendarCheck size={16} />,
};

export default function DecisionDashboardSection() {
  const { personaData } = usePersona();

  return (
    <section
      id="decision-dashboard"
      className="deck-section bg-black relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 deck-section-padding max-w-[1200px] mx-auto w-full">
        <SectionHeading
          eyebrow="Executive Insights"
          title="Why Brands Invest Here"
        />

        {/* Metrics Grid */}
        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {executiveMetrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: i * 0.07,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative border border-white/[0.06] bg-surface/20 p-6"
            >
              {/* Gold accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

              <div className="flex items-start justify-between mb-5">
                <div className="text-white/15">{metricIcons[metric.id]}</div>
              </div>

              {metric.visualization === "radial" ? (
                <div className="flex justify-center mb-3">
                  <RadialProgress
                    value={metric.value}
                    maxValue={metric.maxValue ?? 100}
                    size={90}
                    suffix={metric.suffix}
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix ?? ""}
                    prefix={metric.prefix}
                    decimals={metric.id === "dwell-time" ? 1 : 0}
                    label=""
                  />
                </div>
              )}

              <h4 className="text-[10px] tracking-[0.15em] uppercase text-gold/70 mb-1">
                {metric.label}
              </h4>
              <p className="text-[11px] text-white/20 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Competitive Comparisons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border border-white/[0.06] bg-surface/10 p-6 md:p-8"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-6">
            American Dream vs. Traditional Malls
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {competitiveComparisons.map((comp) => (
              <div key={comp.label}>
                <DataBar
                  label={`${comp.label} — American Dream`}
                  value={comp.us}
                  maxValue={Math.max(comp.us, comp.them) * 1.1}
                  color="#D4AF37"
                  suffix={` ${comp.unit}`}
                />
                <div className="mt-2">
                  <DataBar
                    label={`${comp.label} — Industry Avg`}
                    value={comp.them}
                    maxValue={Math.max(comp.us, comp.them) * 1.1}
                    color="rgba(255,255,255,0.15)"
                    suffix={` ${comp.unit}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Persona Callout */}
        {personaData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 border border-gold/15 bg-gold/[0.02] p-6 md:p-8"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-3">
              What This Means For {personaData.name}
            </p>
            <p className="text-[14px] text-white/40 leading-relaxed">
              {personaData.dashboardCallout}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
