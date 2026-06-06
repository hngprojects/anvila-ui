import { PricingTier } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    pricePrefix: "$",
    price: "0",
    description: "Always. No credit card required.",
    ctaText: "Start for free",
    features: [
      "Unlimited agent generation",
      "Github auto-publishing",
      "Listed in public registry",
    ],
    featureListTitle: "What's included:",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    pricePrefix: "$",
    price: "5",
    priceNote: "per month",
    description: "Best for fast agent and operations",
    ctaText: "Go Private",
    ctaHref: "/coming-soon",
    features: [
      "Everything in public",
      "Private GitHub repository",
      "Hidden from registry",
      "Only you can access it",
    ],
    featureListTitle: "Everything in Premium:",
    highlighted: true,
    badge: {
      text: "MOST POPULAR",
    },
  },
];

export const FAQS = [
  {
    q: "What does the monthly Professional plan include?",
    a: "Professional is $5 per month for private agent features, private GitHub publishing, and registry controls as they roll out.",
  },
  {
    q: "Can I make a public agent private later?",
    a: "Yes, upgrade any public agent to professional at any time.",
  },
  {
    q: "Is there a limit on how many agents I can generate?",
    a: "No, both plans allow unlimited agent generation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards, PayPal, and crypto.",
  },
  {
    q: "Do you offer refunds?",
    a: "Generally no, but contact support for issues.",
  },
];

export const FEATURES = [
  {
    feature: "Agent generation",
    public: { type: "text", value: "Unlimited" } as const,
    private: { type: "text", value: "Unlimited" } as const,
  },
  {
    feature: "GitHub publishing",
    public: { type: "check" } as const,
    private: { type: "check" } as const,
  },
  {
    feature: "Public registry listing",
    public: { type: "check" } as const,
    private: { type: "check" } as const,
  },
  {
    feature: "Hidden from registry",
    public: { type: "dash" } as const,
    private: { type: "check" } as const,
  },
  {
    feature: "ZIP download",
    public: { type: "dash" } as const,
    private: { type: "check" } as const,
  },
  {
    feature: "Community templates",
    public: { type: "check" } as const,
    private: { type: "check" } as const,
  },
  {
    feature: "Priority queue",
    public: { type: "dash" } as const,
    private: { type: "check" } as const,
  },
];
