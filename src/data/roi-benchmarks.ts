export interface CategoryBenchmark {
  id: string;
  label: string;
  revenuePerSqft: number;
  trafficMultiplier: number;
  mallAvgRevenuePerSqft: number;
  conversionRate: number;
}

export const categoryBenchmarks: CategoryBenchmark[] = [
  {
    id: "fashion",
    label: "Fashion",
    revenuePerSqft: 850,
    trafficMultiplier: 1.0,
    mallAvgRevenuePerSqft: 350,
    conversionRate: 22,
  },
  {
    id: "luxury",
    label: "Luxury",
    revenuePerSqft: 1450,
    trafficMultiplier: 0.7,
    mallAvgRevenuePerSqft: 620,
    conversionRate: 18,
  },
  {
    id: "fnb",
    label: "Food & Beverage",
    revenuePerSqft: 620,
    trafficMultiplier: 1.3,
    mallAvgRevenuePerSqft: 280,
    conversionRate: 35,
  },
  {
    id: "sports",
    label: "Sports & Active",
    revenuePerSqft: 780,
    trafficMultiplier: 1.1,
    mallAvgRevenuePerSqft: 320,
    conversionRate: 24,
  },
  {
    id: "beauty",
    label: "Beauty & Wellness",
    revenuePerSqft: 920,
    trafficMultiplier: 0.9,
    mallAvgRevenuePerSqft: 410,
    conversionRate: 28,
  },
  {
    id: "technology",
    label: "Technology",
    revenuePerSqft: 1100,
    trafficMultiplier: 0.8,
    mallAvgRevenuePerSqft: 480,
    conversionRate: 15,
  },
];

export const baseAnnualTraffic = 40_000_000;
export const avgTrafficPerSqft = 2800; // visitors passing per sqft of storefront per year
