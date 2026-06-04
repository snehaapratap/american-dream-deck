"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { categoryBenchmarks, avgTrafficPerSqft } from "@/data/roi-benchmarks";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Calculator, TrendingUp } from "lucide-react";

export default function ROICalculator() {
  const [categoryId, setCategoryId] = useState("fashion");
  const [storeSize, setStoreSize] = useState(10000);

  const benchmark = categoryBenchmarks.find((b) => b.id === categoryId)!;

  const results = useMemo(() => {
    const annualTraffic = Math.round(avgTrafficPerSqft * benchmark.trafficMultiplier * Math.sqrt(storeSize));
    const estimatedRevenue = benchmark.revenuePerSqft * storeSize;
    const mallAvgRevenue = benchmark.mallAvgRevenuePerSqft * storeSize;
    const premium = (benchmark.revenuePerSqft / benchmark.mallAvgRevenuePerSqft).toFixed(1);
    return { annualTraffic, estimatedRevenue, mallAvgRevenue, premium };
  }, [categoryId, storeSize, benchmark]);

  const formatCurrency = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 border border-gold/15 bg-gold/[0.02] p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calculator size={16} className="text-gold/50" />
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold">
          Revenue Projection Calculator
        </p>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/25 block mb-2">
            Store Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categoryBenchmarks.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-all duration-300 ${
                  categoryId === cat.id
                    ? "border-gold/40 bg-gold/[0.08] text-gold"
                    : "border-white/[0.06] text-white/30 hover:border-white/15"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] tracking-[0.15em] uppercase text-white/25 block mb-2">
            Store Size: {storeSize.toLocaleString()} sqft
          </label>
          <input
            type="range"
            min={1000}
            max={50000}
            step={1000}
            value={storeSize}
            onChange={(e) => setStoreSize(Number(e.target.value))}
            className="w-full h-[2px] appearance-none bg-white/10 rounded-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-white/15 mt-1">
            <span>1K sqft</span>
            <span>50K sqft</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="border border-white/[0.06] bg-black/30 p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-white tabular-nums">
            {(results.annualTraffic / 1000).toFixed(0)}K
          </p>
          <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mt-1">
            Annual Foot Traffic
          </p>
        </div>
        <div className="border border-gold/20 bg-gold/[0.03] p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-gold tabular-nums">
            {formatCurrency(results.estimatedRevenue)}
          </p>
          <p className="text-[9px] tracking-[0.12em] uppercase text-gold/50 mt-1">
            Projected Revenue
          </p>
        </div>
        <div className="border border-white/[0.06] bg-black/30 p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-white/50 tabular-nums">
            {formatCurrency(results.mallAvgRevenue)}
          </p>
          <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mt-1">
            Traditional Mall
          </p>
        </div>
        <div className="border border-white/[0.06] bg-black/30 p-4 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="text-gold/60" />
            <p className="text-xl md:text-2xl font-bold text-gold tabular-nums">
              {results.premium}x
            </p>
          </div>
          <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mt-1">
            AD Premium
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-white/20 leading-relaxed">
        {benchmark.label} retailers at American Dream average{" "}
        <span className="text-white/40">${benchmark.revenuePerSqft}/sqft</span> annual revenue.
        Your {storeSize.toLocaleString()} sqft store projects{" "}
        <span className="text-gold/60">{formatCurrency(results.estimatedRevenue)}/year</span>
        {" "}— {results.premium}x the traditional mall average.
      </p>

      <p className="mt-3 text-[10px] text-white/12 italic">
        Projections based on comparable tenant performance. Schedule a call to discuss your specific opportunity.
      </p>
    </motion.div>
  );
}
