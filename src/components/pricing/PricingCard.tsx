import { FireIcon, CheckIcon } from "@/components/icons";

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
    priceNote: "one time payment",
    description: "Best for fast agent and operations",
    ctaText: "Go Private",
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
      icon: <FireIcon />,
    },
  },
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  pricePrefix?: string;
  priceNote?: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  features: string[];
  featureListTitle?: string;
  highlighted?: boolean;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
}

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard = ({ tier }: PricingCardProps) => {
  const isHighlighted = tier.highlighted ?? false;

  return (
    <div
      className={`flex flex-col gap-0 p-0.5 rounded-[20px] flex-1 ${
        isHighlighted ? "border border-teal-brand bg-teal-brand" : "bg-muted-bg"
      }`}
    >
      {/* Card label row */}
      <div className="flex items-center justify-between px-6 py-3">
        <span
          className={`text-lg font-medium leading-7 ${
            isHighlighted
              ? "text-white text-xl leading-[30px]"
              : "text-copy-muted"
          }`}
        >
          {tier.name}
        </span>

        {tier.badge && (
          <div className="flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-white">
            {tier.badge.icon}
            <span className="text-[#7A7A7A] text-[10px] leading-4 tracking-wide">
              {tier.badge.text}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-6 p-6 bg-white rounded-[18px] flex-1 ${
          isHighlighted ? "border border-[#F0F0F0]" : ""
        }`}
      >
        <div className="flex items-baseline gap-1.5 relative">
          {tier.pricePrefix && (
            <span className="text-copy-muted text-4xl font-semibold leading-[44px]">
              {tier.pricePrefix}
            </span>
          )}
          <span className="text-copy-muted text-4xl font-semibold leading-[44px]">
            {tier.price}
          </span>
          {tier.priceNote && (
            <span className="text-[#A1A1AA] text-xs leading-6 self-center">
              {tier.priceNote}
            </span>
          )}
        </div>

        <p className="text-[#A1A1AA] text-base leading-6 -mt-4">
          {tier.description}
        </p>

        <button
          className={`w-full flex items-center justify-center gap-2.5 rounded-[10px] cursor-pointer transition-opacity hover:opacity-80 ${
            isHighlighted
              ? "h-[55px] bg-teal-brand border-none hover:opacity-90"
              : "h-[57px] border-2 border-[#E4E4E7] bg-[#E6E6E6]"
          }`}
        >
          <span
            className={`text-lg font-semibold leading-7 ${
              isHighlighted
                ? "text-white font-bold leading-[22px]"
                : "text-copy-muted"
            }`}
          >
            {tier.ctaText}
          </span>
        </button>

        <hr className="border-[#FAFAFA]" />

        <div className="flex flex-col gap-3">
          <p className="text-copy-muted text-base font-semibold leading-6">
            {tier.featureListTitle ?? "What's included:"}
          </p>
          <ul className="flex flex-col gap-3">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-copy-muted text-sm leading-5"
              >
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1" />
      </div>
    </div>
  );
};
