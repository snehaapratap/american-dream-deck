import { districts } from "./districts";

export type Industry = "fashion" | "luxury" | "sports" | "beauty" | "technology" | "dining";
export type StoreFormat = "flagship" | "standard" | "pop-up" | "multi-brand";
export type BudgetTier = "tier1" | "tier2" | "tier3" | "tier4";

export const industryOptions: { id: Industry; label: string }[] = [
  { id: "fashion", label: "Fashion" },
  { id: "luxury", label: "Luxury" },
  { id: "sports", label: "Sports" },
  { id: "beauty", label: "Beauty" },
  { id: "technology", label: "Technology" },
  { id: "dining", label: "Dining" },
];

export const formatOptions: { id: StoreFormat; label: string }[] = [
  { id: "flagship", label: "Flagship" },
  { id: "standard", label: "Boutique" },
  { id: "pop-up", label: "Pop-Up" },
  { id: "multi-brand", label: "Multi-Brand" },
];

export const budgetOptions: { id: BudgetTier; label: string; range: string }[] = [
  { id: "tier1", label: "$", range: "$50K – $150K" },
  { id: "tier2", label: "$$", range: "$150K – $500K" },
  { id: "tier3", label: "$$$", range: "$500K – $1M" },
  { id: "tier4", label: "$$$$", range: "$1M+" },
];

const industryDistrictAffinity: Record<Industry, Record<string, number>> = {
  fashion: { "luxury-wing": 70, "high-traffic": 90, "entertainment-district": 60, "dining-district": 30, "event-plaza": 50, "family-attractions": 45 },
  luxury: { "luxury-wing": 100, "high-traffic": 60, "entertainment-district": 30, "dining-district": 40, "event-plaza": 55, "family-attractions": 20 },
  sports: { "luxury-wing": 25, "high-traffic": 85, "entertainment-district": 90, "dining-district": 35, "event-plaza": 75, "family-attractions": 70 },
  beauty: { "luxury-wing": 80, "high-traffic": 85, "entertainment-district": 50, "dining-district": 40, "event-plaza": 45, "family-attractions": 40 },
  technology: { "luxury-wing": 50, "high-traffic": 80, "entertainment-district": 75, "dining-district": 25, "event-plaza": 85, "family-attractions": 55 },
  dining: { "luxury-wing": 40, "high-traffic": 70, "entertainment-district": 65, "dining-district": 100, "event-plaza": 55, "family-attractions": 60 },
};

const formatMultiplier: Record<StoreFormat, Record<string, number>> = {
  flagship: { "luxury-wing": 1.3, "high-traffic": 1.2, "entertainment-district": 1.0, "dining-district": 1.0, "event-plaza": 0.8, "family-attractions": 0.9 },
  standard: { "luxury-wing": 1.0, "high-traffic": 1.1, "entertainment-district": 1.0, "dining-district": 1.1, "event-plaza": 0.9, "family-attractions": 1.0 },
  "pop-up": { "luxury-wing": 0.7, "high-traffic": 1.3, "entertainment-district": 1.2, "dining-district": 0.8, "event-plaza": 1.1, "family-attractions": 1.1 },
  "multi-brand": { "luxury-wing": 0.8, "high-traffic": 1.2, "entertainment-district": 1.0, "dining-district": 0.9, "event-plaza": 0.7, "family-attractions": 0.9 },
};

const budgetMinimums: Record<BudgetTier, Record<string, boolean>> = {
  tier1: { "luxury-wing": false, "high-traffic": true, "entertainment-district": true, "dining-district": true, "event-plaza": true, "family-attractions": true },
  tier2: { "luxury-wing": true, "high-traffic": true, "entertainment-district": true, "dining-district": true, "event-plaza": true, "family-attractions": true },
  tier3: { "luxury-wing": true, "high-traffic": true, "entertainment-district": true, "dining-district": true, "event-plaza": true, "family-attractions": true },
  tier4: { "luxury-wing": true, "high-traffic": true, "entertainment-district": true, "dining-district": true, "event-plaza": true, "family-attractions": true },
};

const exposureBase: Record<string, number> = {
  "luxury-wing": 4400000,
  "high-traffic": 12700000,
  "entertainment-district": 9100000,
  "dining-district": 6500000,
  "event-plaza": 5400000,
  "family-attractions": 7300000,
};

const activationSuggestions: Record<Industry, string[]> = {
  fashion: ["Seasonal Collection Preview", "Styling Pop-Up Experience", "Fashion Show Activation"],
  luxury: ["VIP Private Shopping Event", "Immersive Brand Exhibition", "Luxury Lifestyle Showcase"],
  sports: ["Interactive Sports Zone", "Athlete Meet & Greet", "Performance Demo Station"],
  beauty: ["Sampling & Makeover Bar", "Influencer Content Studio", "Product Launch Experience"],
  technology: ["Interactive Product Demo", "Innovation Showroom", "Tech Experience Lab"],
  dining: ["Chef's Table Pop-Up", "Tasting Experience", "Culinary Masterclass Series"],
};

export interface MatchmakerResult {
  district: typeof districts[number];
  audienceMatch: number;
  projectedExposure: number;
  nearbyBrands: string[];
  activations: string[];
  score: number;
}

export function computeMatch(
  industry: Industry,
  format: StoreFormat,
  budget: BudgetTier
): MatchmakerResult {
  const scored = districts.map((district) => {
    const base = industryDistrictAffinity[industry][district.id] ?? 50;
    const mult = formatMultiplier[format][district.id] ?? 1;
    const eligible = budgetMinimums[budget][district.id] ?? true;
    const score = eligible ? Math.round(base * mult) : 0;
    return { district, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  const audienceMatch = Math.min(99, best.score + Math.floor(Math.random() * 3));
  const budgetMultiplier = budget === "tier4" ? 1.5 : budget === "tier3" ? 1.2 : budget === "tier2" ? 1.0 : 0.7;
  const projectedExposure = Math.round((exposureBase[best.district.id] ?? 5000000) * budgetMultiplier);

  return {
    district: best.district,
    audienceMatch,
    projectedExposure,
    nearbyBrands: best.district.tenants.slice(0, 4),
    activations: activationSuggestions[industry],
    score: best.score,
  };
}
