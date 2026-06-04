export interface BrandArchetype {
  id: string;
  name: string;
  icon: string;
  activationConcept: string;
  estimatedReach: number;
  mediaExposure: {
    digital: string;
    social: string;
    physical: string;
  };
  suggestedLocations: string[];
  activationFormat: string;
}

export const brandArchetypes: BrandArchetype[] = [
  {
    id: "athletic",
    name: "Athletic Brand",
    icon: "Dumbbell",
    activationConcept: "Interactive Sports Performance Zone — visitors test gear on a mini basketball court, indoor track sprint, and vertical leap station. Real-time leaderboards and social sharing drive viral engagement.",
    estimatedReach: 8500000,
    mediaExposure: {
      digital: "2.4M digital signage impressions/month",
      social: "5.2M social impressions/campaign",
      physical: "850K direct interactions/quarter",
    },
    suggestedLocations: ["Entertainment District", "High Traffic Corridors", "Event Plaza"],
    activationFormat: "Immersive Sports Installation",
  },
  {
    id: "luxury-auto",
    name: "Luxury Auto",
    icon: "Car",
    activationConcept: "Premium Showroom Experience — a curated display of latest models with VR test drives, configuration stations, and private consultation areas. Positioned in the Luxury Wing for maximum affluent audience alignment.",
    estimatedReach: 4200000,
    mediaExposure: {
      digital: "1.8M digital signage impressions/month",
      social: "3.1M social impressions/campaign",
      physical: "420K direct interactions/quarter",
    },
    suggestedLocations: ["Luxury Wing", "High Traffic Corridors", "Event Plaza"],
    activationFormat: "Premium Showroom Experience",
  },
  {
    id: "tech",
    name: "Tech Company",
    icon: "Cpu",
    activationConcept: "Innovation Lab — hands-on demo stations, AR/VR experiences, and an Instagrammable tech art installation. Live product launches with integrated livestream capabilities.",
    estimatedReach: 11200000,
    mediaExposure: {
      digital: "3.6M digital signage impressions/month",
      social: "7.8M social impressions/campaign",
      physical: "1.1M direct interactions/quarter",
    },
    suggestedLocations: ["High Traffic Corridors", "Entertainment District", "Event Plaza"],
    activationFormat: "Interactive Technology Lab",
  },
  {
    id: "beverage",
    name: "Beverage Brand",
    icon: "Wine",
    activationConcept: "Sampling Oasis — a branded refreshment lounge with product sampling, mixology demonstrations, and a custom drink creation station. Social media integration drives organic content creation.",
    estimatedReach: 12800000,
    mediaExposure: {
      digital: "2.8M digital signage impressions/month",
      social: "9.4M social impressions/campaign",
      physical: "2.1M direct sampling interactions/quarter",
    },
    suggestedLocations: ["High Traffic Corridors", "Dining District", "Entertainment District"],
    activationFormat: "Experiential Sampling Lounge",
  },
  {
    id: "fashion-house",
    name: "Fashion House",
    icon: "Scissors",
    activationConcept: "Style Studio — an immersive fashion experience with AR try-on mirrors, personal styling sessions, and a runway show stage for seasonal showcases. Shop-the-look integration drives direct conversion.",
    estimatedReach: 6400000,
    mediaExposure: {
      digital: "2.2M digital signage impressions/month",
      social: "4.6M social impressions/campaign",
      physical: "640K direct interactions/quarter",
    },
    suggestedLocations: ["Luxury Wing", "High Traffic Corridors", "Event Plaza"],
    activationFormat: "Immersive Style Studio",
  },
  {
    id: "financial",
    name: "Financial Services",
    icon: "Landmark",
    activationConcept: "Wealth & Wellness Lounge — an exclusive, appointment-based consultation space with financial planning workshops, investment seminars, and premium networking events targeting high-net-worth visitors.",
    estimatedReach: 3200000,
    mediaExposure: {
      digital: "1.4M digital signage impressions/month",
      social: "2.2M social impressions/campaign",
      physical: "320K direct interactions/quarter",
    },
    suggestedLocations: ["Luxury Wing", "Event Plaza", "Dining District"],
    activationFormat: "Premium Consultation Lounge",
  },
];
