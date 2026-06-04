export interface ExecutiveMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  visualization: "radial" | "counter" | "bar";
  maxValue?: number;
}

export const executiveMetrics: ExecutiveMetric[] = [
  {
    id: "visitor-reach",
    label: "Visitor Reach",
    value: 40,
    suffix: "M+",
    description: "Annual unique visitors making it the most visited destination in North America",
    visualization: "counter",
  },
  {
    id: "consumer-spending",
    label: "Consumer Spending",
    value: 127,
    prefix: "$",
    description: "Average spend per visit — 2.4x the national mall average",
    visualization: "counter",
  },
  {
    id: "dwell-time",
    label: "Dwell Time",
    value: 3.5,
    suffix: " hrs",
    description: "Average visit duration — the longest of any retail destination in North America",
    visualization: "radial",
    maxValue: 5,
  },
  {
    id: "regional-influence",
    label: "Regional Influence",
    value: 22,
    suffix: "M",
    description: "Consumers within the primary catchment area across the tri-state region",
    visualization: "counter",
  },
  {
    id: "audience-quality",
    label: "Audience Quality",
    value: 92,
    suffix: "/100",
    description: "Composite index measuring spending power, brand affinity, and engagement propensity",
    visualization: "radial",
    maxValue: 100,
  },
  {
    id: "luxury-affinity",
    label: "Luxury Affinity",
    value: 78,
    suffix: "%",
    description: "Of visitors express interest in premium and luxury brand experiences",
    visualization: "radial",
    maxValue: 100,
  },
  {
    id: "event-engagement",
    label: "Event Engagement",
    value: 500,
    suffix: "+",
    description: "Events hosted annually with 94% attendee satisfaction rating",
    visualization: "counter",
  },
];

export interface CompetitiveComparison {
  label: string;
  us: number;
  them: number;
  unit: string;
}

export const competitiveComparisons: CompetitiveComparison[] = [
  { label: "Dwell Time", us: 3.5, them: 1.2, unit: "hrs" },
  { label: "Social Reach", us: 500, them: 45, unit: "M impressions" },
  { label: "Visitor Spend", us: 127, them: 53, unit: "$ avg" },
  { label: "Annual Events", us: 500, them: 80, unit: "events" },
];
