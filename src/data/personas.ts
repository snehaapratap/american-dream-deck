export type PersonaId =
  | "retail-brand"
  | "luxury-retailer"
  | "event-organizer"
  | "corporate-sponsor"
  | "fnb-operator"
  | "popup-brand"
  | null;

export interface PersonaOption {
  id: NonNullable<PersonaId>;
  name: string;
  icon: string;
  description: string;
}

export interface PersonaConfig {
  name: string;
  highlightedStats: string[];
  recommendedDistrict: string;
  ctaOverrides: {
    lease: string;
    sponsor: string;
    event: string;
  };
  matchmakerDefaults: {
    industry: string;
    format: string;
  };
  relevantSponsorshipTier: string;
  dashboardCallout: string;
  primaryConversion: "lease" | "sponsor" | "event";
}

export const personaOptions: PersonaOption[] = [
  {
    id: "retail-brand",
    name: "Retail Brand",
    icon: "Store",
    description: "Looking for flagship or multi-store presence",
  },
  {
    id: "luxury-retailer",
    name: "Luxury Retailer",
    icon: "Gem",
    description: "Seeking premium positioning for luxury goods",
  },
  {
    id: "event-organizer",
    name: "Event Organizer",
    icon: "Calendar",
    description: "Planning concerts, launches, or experiences",
  },
  {
    id: "corporate-sponsor",
    name: "Corporate Sponsor",
    icon: "Megaphone",
    description: "Exploring brand partnership opportunities",
  },
  {
    id: "fnb-operator",
    name: "Food & Beverage",
    icon: "UtensilsCrossed",
    description: "Opening a restaurant or food concept",
  },
  {
    id: "popup-brand",
    name: "Pop-Up Brand",
    icon: "Sparkles",
    description: "Testing a concept with short-term activation",
  },
];

export const personas: Record<NonNullable<PersonaId>, PersonaConfig> = {
  "retail-brand": {
    name: "Retail Brand",
    highlightedStats: ["brands", "sqft", "visitors"],
    recommendedDistrict: "high-traffic",
    ctaOverrides: {
      lease: "Secure Your Storefront",
      sponsor: "Amplify Your Brand",
      event: "Host a Launch Event",
    },
    matchmakerDefaults: { industry: "fashion", format: "flagship" },
    relevantSponsorshipTier: "gold",
    dashboardCallout:
      "Retail brands at American Dream see 3.2x higher foot traffic than traditional malls, with an average dwell time that drives 40% more conversions.",
    primaryConversion: "lease",
  },
  "luxury-retailer": {
    name: "Luxury Retailer",
    highlightedStats: ["hhi", "visitors", "sqft"],
    recommendedDistrict: "luxury-wing",
    ctaOverrides: {
      lease: "Explore The Collections",
      sponsor: "Elevate Your Presence",
      event: "Curate an Experience",
    },
    matchmakerDefaults: { industry: "luxury", format: "flagship" },
    relevantSponsorshipTier: "platinum",
    dashboardCallout:
      "The Luxury Wing attracts visitors with $185K+ median household income. Brands report 28% higher average transaction values compared to standalone flagships.",
    primaryConversion: "lease",
  },
  "event-organizer": {
    name: "Event Organizer",
    highlightedStats: ["capacity", "events", "impressions"],
    recommendedDistrict: "event-plaza",
    ctaOverrides: {
      lease: "Explore Venue Spaces",
      sponsor: "Find Event Sponsors",
      event: "Book Your Venue",
    },
    matchmakerDefaults: { industry: "entertainment", format: "flagship" },
    relevantSponsorshipTier: "platinum",
    dashboardCallout:
      "American Dream hosts 500+ events annually with built-in audiences of 40M+ visitors. Our venues offer turnkey production with world-class infrastructure.",
    primaryConversion: "event",
  },
  "corporate-sponsor": {
    name: "Corporate Sponsor",
    highlightedStats: ["impressions", "visitors", "reach"],
    recommendedDistrict: "high-traffic",
    ctaOverrides: {
      lease: "See Activation Spaces",
      sponsor: "Build Your Partnership",
      event: "Sponsor an Event",
    },
    matchmakerDefaults: { industry: "technology", format: "pop-up" },
    relevantSponsorshipTier: "platinum",
    dashboardCallout:
      "Sponsors at American Dream achieve 500M+ social impressions annually. Our integrated media network delivers unmatched brand visibility across digital and physical touchpoints.",
    primaryConversion: "sponsor",
  },
  "fnb-operator": {
    name: "Food & Beverage",
    highlightedStats: ["visitors", "dwellTime", "dining"],
    recommendedDistrict: "dining-district",
    ctaOverrides: {
      lease: "Open Your Restaurant",
      sponsor: "Partner With Dining",
      event: "Host a Culinary Event",
    },
    matchmakerDefaults: { industry: "dining", format: "standard" },
    relevantSponsorshipTier: "gold",
    dashboardCallout:
      "F&B operators at American Dream benefit from 3.5-hour average dwell times — the longest in North American retail — driving consistent dining traffic across all dayparts.",
    primaryConversion: "lease",
  },
  "popup-brand": {
    name: "Pop-Up Brand",
    highlightedStats: ["visitors", "impressions", "reach"],
    recommendedDistrict: "high-traffic",
    ctaOverrides: {
      lease: "Launch Your Pop-Up",
      sponsor: "Amplify Your Activation",
      event: "Create an Experience",
    },
    matchmakerDefaults: { industry: "fashion", format: "pop-up" },
    relevantSponsorshipTier: "silver",
    dashboardCallout:
      "Pop-up brands at American Dream average 15K daily impressions with zero long-term commitment. Test your concept where 40M+ visitors already shop.",
    primaryConversion: "lease",
  },
};
