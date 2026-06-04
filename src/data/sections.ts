export const sections = [
  { id: "hero", title: "Welcome", shortTitle: "Home", nav: true },
  { id: "opportunity-finder", title: "Who Are You", shortTitle: "Start", nav: false },
  { id: "why", title: "Why American Dream", shortTitle: "Why Here", nav: true },
  { id: "destination-map", title: "Explore The Destination", shortTitle: "Map", nav: true },
  { id: "retail", title: "Retail Ecosystem", shortTitle: "Retail", nav: true },
  { id: "luxury", title: "Luxury District", shortTitle: "Luxury", nav: false },
  { id: "dining", title: "Dining & Lifestyle", shortTitle: "Dining", nav: false },
  { id: "entertainment", title: "Entertainment", shortTitle: "Entertainment", nav: false },
  { id: "matchmaker", title: "Business Matchmaker", shortTitle: "Matchmaker", nav: true },
  { id: "events", title: "Events & Activations", shortTitle: "Events", nav: true },
  { id: "venue-explorer", title: "Venue Explorer", shortTitle: "Venues", nav: false },
  { id: "sponsorship", title: "Sponsorship", shortTitle: "Sponsorship", nav: true },
  { id: "sponsorship-sim", title: "Sponsorship Simulator", shortTitle: "Simulator", nav: false },
  { id: "decision-dashboard", title: "Why Brands Invest", shortTitle: "Insights", nav: true },
  { id: "leasing", title: "Leasing", shortTitle: "Leasing", nav: false },
  { id: "grand-finale", title: "Partner With Us", shortTitle: "Connect", nav: true },
] as const;

export type SectionId = (typeof sections)[number]["id"];
