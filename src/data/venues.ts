export interface EventType {
  id: string;
  name: string;
  capacity: string;
  layout: string;
  footTraffic: string;
  brandingSlots: number;
  description: string;
  pastEvents: { name: string; attendance: string }[];
  brandingOpportunities: string[];
}

export const eventTypes: EventType[] = [
  {
    id: "concert",
    name: "Concert",
    capacity: "18,000",
    layout: "Standing + Reserved Seating",
    footTraffic: "45K event-day visitors",
    brandingSlots: 12,
    description: "World-class concert venue with state-of-the-art acoustics, LED production walls, and VIP hospitality suites. Seamless integration with surrounding retail creates a concert-to-commerce pipeline.",
    pastEvents: [
      { name: "Summer Music Festival", attendance: "16,500" },
      { name: "NYE Spectacular", attendance: "18,000" },
      { name: "Latin Music Showcase", attendance: "14,200" },
    ],
    brandingOpportunities: [
      "Main stage backdrop & LED walls",
      "VIP lounge naming rights",
      "Concourse digital signage network",
      "Branded merchandise stations",
      "Entry arch & wristband sponsorship",
      "Social media content wall",
    ],
  },
  {
    id: "product-launch",
    name: "Product Launch",
    capacity: "2,500",
    layout: "Theater-style + Demo Zones",
    footTraffic: "25K event-day visitors",
    brandingSlots: 8,
    description: "Purpose-built launch environments with modular staging, controlled lighting, and live-stream infrastructure. Adjacent retail traffic provides organic buzz amplification.",
    pastEvents: [
      { name: "Luxury Auto Unveil", attendance: "2,200" },
      { name: "Tech Product Reveal", attendance: "1,800" },
      { name: "Sneaker Drop Experience", attendance: "2,500" },
    ],
    brandingOpportunities: [
      "360° immersive brand environment",
      "Digital display takeover",
      "Hands-on demo stations",
      "Media wall & press area",
      "Influencer content creation zone",
      "Post-launch pop-up retail",
    ],
  },
  {
    id: "fashion-show",
    name: "Fashion Show",
    capacity: "3,000",
    layout: "Runway + Front Row + Standing",
    footTraffic: "30K event-day visitors",
    brandingSlots: 10,
    description: "Professional runway infrastructure with backstage facilities, professional lighting rigs, and front-row VIP seating. The retail setting enables instant shop-the-runway experiences.",
    pastEvents: [
      { name: "NYFW Satellite Show", attendance: "2,800" },
      { name: "Emerging Designers Showcase", attendance: "2,200" },
      { name: "Holiday Collections Preview", attendance: "3,000" },
    ],
    brandingOpportunities: [
      "Runway branding & lighting",
      "Front-row VIP gifting",
      "Backstage naming rights",
      "Shop-the-look digital stations",
      "Red carpet photo activation",
      "After-party venue sponsorship",
    ],
  },
  {
    id: "convention",
    name: "Convention",
    capacity: "8,000",
    layout: "Exhibition Hall + Breakout Rooms",
    footTraffic: "35K event-day visitors",
    brandingSlots: 15,
    description: "Flexible convention infrastructure with modular booth systems, breakout rooms, keynote theater, and integrated Wi-Fi. Built-in dining and entertainment keep attendees on-site longer.",
    pastEvents: [
      { name: "Consumer Electronics Expo", attendance: "7,500" },
      { name: "Beauty & Wellness Summit", attendance: "6,200" },
      { name: "Gaming Convention", attendance: "8,000" },
    ],
    brandingOpportunities: [
      "Exhibition hall naming rights",
      "Keynote stage sponsorship",
      "Lanyard & badge branding",
      "Lounge & networking zones",
      "Digital wayfinding ads",
      "Welcome bag insertion",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Gala",
    capacity: "1,500",
    layout: "Banquet + Stage + Cocktail",
    footTraffic: "20K event-day visitors",
    brandingSlots: 6,
    description: "Elevated corporate event spaces with fine dining capabilities, premium AV systems, and private access. Adjacent attractions offer unique team-building add-ons unavailable anywhere else.",
    pastEvents: [
      { name: "Fortune 500 Annual Gala", attendance: "1,200" },
      { name: "Charity Benefit Evening", attendance: "1,500" },
      { name: "Industry Awards Ceremony", attendance: "1,000" },
    ],
    brandingOpportunities: [
      "Table centerpiece branding",
      "Welcome cocktail sponsorship",
      "Stage backdrop & AV",
      "Gift bag & parting gifts",
      "Private lounge access",
      "Post-event attraction access",
    ],
  },
];
