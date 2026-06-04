export interface DistrictAvailability {
  districtId: string;
  spacesAvailable: number;
  status: "available" | "limited" | "waitlist";
  lastSigning: string;
  commitment2026: number;
}

export const districtAvailability: Record<string, DistrictAvailability> = {
  "luxury-wing": {
    districtId: "luxury-wing",
    spacesAvailable: 2,
    status: "limited",
    lastSigning: "Tiffany & Co. — Q4 2025",
    commitment2026: 94,
  },
  "entertainment-district": {
    districtId: "entertainment-district",
    spacesAvailable: 5,
    status: "available",
    lastSigning: "Samsung Experience — Q1 2026",
    commitment2026: 82,
  },
  "dining-district": {
    districtId: "dining-district",
    spacesAvailable: 3,
    status: "limited",
    lastSigning: "Nobu — Q3 2025",
    commitment2026: 88,
  },
  "event-plaza": {
    districtId: "event-plaza",
    spacesAvailable: 0,
    status: "waitlist",
    lastSigning: "Live Nation — Q2 2026",
    commitment2026: 97,
  },
  "family-attractions": {
    districtId: "family-attractions",
    spacesAvailable: 4,
    status: "available",
    lastSigning: "LEGO Pop-Up — Q1 2026",
    commitment2026: 78,
  },
  "high-traffic": {
    districtId: "high-traffic",
    spacesAvailable: 6,
    status: "available",
    lastSigning: "Nike Flagship — 12K sqft — June 2025",
    commitment2026: 75,
  },
};

export const recentSignings = [
  "Nike Flagship — 12K sqft — High Traffic Corridors — June 2025",
  "Tiffany & Co. — 4K sqft — Luxury Wing — Q4 2025",
  "Samsung Experience — 8K sqft — Entertainment District — Q1 2026",
  "Nobu — 6K sqft — Dining District — Q3 2025",
  "Zara Mega Store — 15K sqft — High Traffic Corridors — Q2 2025",
  "Louis Vuitton — 5K sqft — Luxury Wing — Q1 2025",
];

export const leasingPricing: Record<string, string> = {
  luxury: "Custom pricing from $350/sqft/year",
  retail: "From $180/sqft/year",
  fnb: "From $220/sqft/year",
  popup: "From $8K/month (3-month minimum)",
};

export const venueAvailability: Record<string, string> = {
  concert: "Next Available: September 2026",
  "product-launch": "Next Available: August 2026",
  "fashion-show": "Next Available: July 2026",
  convention: "Next Available: October 2026",
  corporate: "Next Available: August 2026",
};

export const sponsorshipCalendar = {
  quarter: "Q3 2026",
  committed: 60,
  remaining: 8,
};
