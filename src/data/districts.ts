export interface District {
  id: string;
  name: string;
  color: string;
  dailyVisitors: string;
  demographics: string;
  avgSpend: string;
  dwellTime: string;
  tenants: string[];
  opportunities: string;
  description: string;
  personaFit: Record<string, number>;
}

export const districts: District[] = [
  {
    id: "luxury-wing",
    name: "Luxury Wing",
    color: "#D4AF37",
    dailyVisitors: "12K",
    demographics: "High-income professionals, International tourists",
    avgSpend: "$340",
    dwellTime: "2.1 hrs",
    tenants: ["Hermès", "Tiffany & Co.", "Saint Laurent", "Dolce & Gabbana", "Burberry"],
    opportunities: "2 premium anchor spaces available",
    description: "The crown jewel of American Dream. An exclusive enclave of the world's most prestigious luxury houses, designed for discerning clientele seeking the ultimate retail experience.",
    personaFit: {
      "luxury-retailer": 98,
      "retail-brand": 72,
      "corporate-sponsor": 65,
      "event-organizer": 55,
      "fnb-operator": 40,
      "popup-brand": 60,
    },
  },
  {
    id: "entertainment-district",
    name: "Entertainment District",
    color: "#FF6B35",
    dailyVisitors: "25K",
    demographics: "Families, Millennials, Gen Z, Tourists",
    avgSpend: "$185",
    dwellTime: "4.2 hrs",
    tenants: ["Nickelodeon Universe", "DreamWorks Water Park", "Big SNOW", "SEA LIFE"],
    opportunities: "Activation zones adjacent to major attractions",
    description: "Home to world-class attractions drawing millions annually. The highest foot traffic zone with an unmatched captive audience for brand activations and experiential retail.",
    personaFit: {
      "luxury-retailer": 35,
      "retail-brand": 80,
      "corporate-sponsor": 90,
      "event-organizer": 85,
      "fnb-operator": 75,
      "popup-brand": 88,
    },
  },
  {
    id: "dining-district",
    name: "Dining District",
    color: "#E85D75",
    dailyVisitors: "18K",
    demographics: "Foodies, Families, Date-night couples, Business diners",
    avgSpend: "$65",
    dwellTime: "1.8 hrs",
    tenants: ["The Carpaccio", "Celeste", "American Dream Diner", "Blue Ribbon Sushi"],
    opportunities: "3 prime F&B locations with built-in traffic",
    description: "Over 100 culinary destinations spanning fine dining to fast casual. The anchor of American Dream's legendary dwell times — guests who eat stay 2x longer.",
    personaFit: {
      "luxury-retailer": 45,
      "retail-brand": 55,
      "corporate-sponsor": 50,
      "event-organizer": 60,
      "fnb-operator": 98,
      "popup-brand": 65,
    },
  },
  {
    id: "event-plaza",
    name: "Event Plaza",
    color: "#9B5DE5",
    dailyVisitors: "15K",
    demographics: "Concert-goers, Corporate attendees, Brand enthusiasts",
    avgSpend: "$120",
    dwellTime: "3.0 hrs",
    tenants: ["Center Stage", "Grand Atrium", "Conference Center"],
    opportunities: "Full venue calendar with premium booking windows",
    description: "An 18,000-capacity event ecosystem hosting 500+ events annually. From intimate product launches to stadium-scale concerts — turnkey production with world-class infrastructure.",
    personaFit: {
      "luxury-retailer": 50,
      "retail-brand": 70,
      "corporate-sponsor": 88,
      "event-organizer": 98,
      "fnb-operator": 45,
      "popup-brand": 75,
    },
  },
  {
    id: "family-attractions",
    name: "Family Attractions",
    color: "#00BBF9",
    dailyVisitors: "20K",
    demographics: "Parents with children, Multi-generational families, School groups",
    avgSpend: "$210",
    dwellTime: "3.8 hrs",
    tenants: ["LEGOLAND Discovery Center", "The Rink", "KidZania"],
    opportunities: "Kid-friendly brand activation spaces available",
    description: "Purpose-built for family engagement with the longest dwell times in the complex. Brands positioned here capture multi-generational spending across extended visits.",
    personaFit: {
      "luxury-retailer": 30,
      "retail-brand": 75,
      "corporate-sponsor": 72,
      "event-organizer": 60,
      "fnb-operator": 70,
      "popup-brand": 80,
    },
  },
  {
    id: "high-traffic",
    name: "High Traffic Corridors",
    color: "#FFFFFF",
    dailyVisitors: "35K",
    demographics: "All visitor segments — highest volume pathways",
    avgSpend: "$155",
    dwellTime: "Transit zone",
    tenants: ["Zara", "H&M", "Nike", "Apple", "Sephora"],
    opportunities: "Premium inline and pop-up spaces with maximum visibility",
    description: "The arteries connecting every district. These corridors see the highest daily foot traffic in any retail destination in North America — pure, unfiltered brand visibility.",
    personaFit: {
      "luxury-retailer": 55,
      "retail-brand": 95,
      "corporate-sponsor": 80,
      "event-organizer": 50,
      "fnb-operator": 60,
      "popup-brand": 95,
    },
  },
];
