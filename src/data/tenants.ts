export const retailCategories = [
  {
    id: "luxury",
    name: "Luxury",
    brands: ["Hermes", "Tiffany & Co.", "Dolce & Gabbana", "Saint Laurent", "Saks Fifth Avenue", "Mulberry", "Breitling"],
    count: "30+",
    description: "The Collections at American Dream — a curated luxury wing rivaling the world's finest shopping destinations.",
  },
  {
    id: "fashion",
    name: "Fashion",
    brands: ["Zara", "H&M", "Primark", "Uniqlo", "Lululemon", "Mango", "COS", "& Other Stories"],
    count: "120+",
    description: "From fast fashion to premium contemporary, the most sought-after fashion brands under one roof.",
  },
  {
    id: "beauty",
    name: "Beauty",
    brands: ["Sephora", "MAC", "Charlotte Tilbury", "Kiehl's", "Jo Malone", "L'Occitane"],
    count: "40+",
    description: "Prestige beauty and wellness destinations for every skincare, fragrance, and cosmetics need.",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    brands: ["Apple", "Microsoft", "Dyson", "Sonos", "CB2", "West Elm"],
    count: "60+",
    description: "Tech, home, and lifestyle brands that define modern living.",
  },
  {
    id: "sports",
    name: "Sports",
    brands: ["Nike", "Adidas", "Under Armour", "Foot Locker", "Lids", "DICK'S Sporting Goods"],
    count: "25+",
    description: "Performance and athleisure brands for every athlete and enthusiast.",
  },
  {
    id: "specialty",
    name: "Specialty",
    brands: ["IT'SUGAR", "Toys R Us", "CAMP", "Build-A-Bear", "American Girl"],
    count: "50+",
    description: "Unique destination retailers that create experiences, not just transactions.",
  },
];

export const luxuryBrands = [
  "Hermes", "Tiffany & Co.", "Dolce & Gabbana",
  "Saint Laurent", "Saks Fifth Avenue", "Mulberry",
  "Breitling", "Watches of Switzerland",
];

export const diningVenues = [
  { name: "American Cut", category: "Fine Dining", desc: "Award-winning steakhouse by Marc Forgione" },
  { name: "Carpaccio", category: "Fine Dining", desc: "Authentic Italian from Bal Harbour" },
  { name: "Nuvola", category: "Fine Dining", desc: "Modern Mediterranean with panoramic views" },
  { name: "Shake Shack", category: "Fast Casual", desc: "Iconic burgers, fries & shakes" },
  { name: "Sugar Factory", category: "Experience Dining", desc: "Celebrity-favorite dessert destination" },
  { name: "CJ's Crab Shack", category: "Casual Dining", desc: "Fresh seafood & coastal atmosphere" },
  { name: "Five Guys", category: "Fast Casual", desc: "Made-to-order burgers & fries" },
  { name: "Market Food Hall", category: "Food Hall", desc: "Curated artisanal vendors & global cuisine" },
  { name: "The Terrace", category: "Bar & Lounge", desc: "Craft cocktails & social atmosphere" },
  { name: "Din Tai Fung", category: "Fine Dining", desc: "World-renowned dumpling house" },
  { name: "Poke Bowl", category: "Fast Casual", desc: "Fresh Hawaiian-inspired bowls" },
  { name: "Starbucks Reserve", category: "Cafe", desc: "Premium coffee experience" },
];

export const eventTypes = [
  {
    id: "concerts",
    name: "Concerts & Live Music",
    description: "State-of-the-art venues for touring artists and emerging talent",
    capacity: "Up to 3,000",
    icon: "music",
  },
  {
    id: "activations",
    name: "Brand Activations",
    description: "Immersive brand experiences reaching 40M+ annual visitors",
    capacity: "Customizable",
    icon: "zap",
  },
  {
    id: "corporate",
    name: "Corporate Events",
    description: "Premium spaces for product launches, galas, and conferences",
    capacity: "Up to 5,000",
    icon: "briefcase",
  },
  {
    id: "holiday",
    name: "Seasonal Experiences",
    description: "Large-scale seasonal programming driving record attendance",
    capacity: "Property-Wide",
    icon: "star",
  },
  {
    id: "popup",
    name: "Pop-Up Retail",
    description: "Short-term activations in high-traffic premium locations",
    capacity: "500–5,000 Sq Ft",
    icon: "shopping-bag",
  },
];

export const sponsorshipTiers = [
  {
    name: "Presenting Partner",
    level: "Platinum",
    reach: "40M+ Impressions",
    features: [
      "Exclusive naming rights on marquee venues",
      "Premium digital signage network access",
      "VIP hospitality & suite access",
      "Year-round brand integration",
      "Custom content creation partnership",
    ],
  },
  {
    name: "Official Partner",
    level: "Gold",
    reach: "20M+ Impressions",
    features: [
      "Co-branded experiential activations",
      "Digital & physical signage package",
      "Seasonal campaign integration",
      "Dedicated activation zones",
      "Social media amplification",
    ],
  },
  {
    name: "Activation Partner",
    level: "Silver",
    reach: "5M+ Impressions",
    features: [
      "Pop-up activation spaces",
      "Event sponsorship opportunities",
      "Sampling & demonstration zones",
      "Digital directory presence",
      "Audience data insights",
    ],
  },
];

export const leasingPaths = [
  {
    id: "luxury",
    title: "Luxury Brands",
    subtitle: "The Collections",
    description: "Join the most prestigious luxury address in the Northeast. Curated positioning alongside the world's finest brands.",
    benefits: ["Premium foot traffic from affluent demographics", "Dedicated luxury wing with bespoke finishes", "Concierge-level property management", "Adjacent to world-class entertainment"],
    cta: "Inquire About Luxury Space",
  },
  {
    id: "retail",
    title: "Retail Brands",
    subtitle: "Flagship & Multi-Brand",
    description: "Position your brand in front of 40M+ annual visitors. From flagships to multi-brand concepts.",
    benefits: ["Unmatched foot traffic volume", "Flexible build-out packages", "Marketing & promotional support", "Extended dwell times vs. traditional malls"],
    cta: "Explore Retail Leasing",
  },
  {
    id: "fnb",
    title: "Food & Beverage",
    subtitle: "Culinary Concepts",
    description: "From celebrity chef restaurants to fast-casual concepts. 100+ dining options and growing.",
    benefits: ["Captive dining audience from attractions", "High average spend per visitor", "Premium locations near entertainment", "Full liquor license availability"],
    cta: "Explore F&B Opportunities",
  },
  {
    id: "popup",
    title: "Pop-Up & Short-Term",
    subtitle: "Temporary Activations",
    description: "Test your concept with minimal commitment. Premium locations, turnkey infrastructure, guaranteed traffic.",
    benefits: ["Low-risk market testing", "Turnkey retail infrastructure", "500–5,000 sq ft options", "Ideal for DTC & emerging brands"],
    cta: "Book a Pop-Up Space",
  },
];
