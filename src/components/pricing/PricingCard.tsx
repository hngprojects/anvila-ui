import { FireIcon, CheckIcon } from "@/components/icons";
import { PricingTier } from "@/types";
import Link from "next/link";

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard = ({ tier }: PricingCardProps) => {
  const isHighlighted = tier.highlighted ?? false;
  const ctaHref = tier.ctaHref ?? "/register";

  return (
    <div
      className={`flex flex-col gap-0 p-0.5 rounded-[20px] flex-1 ${
        isHighlighted ? "border border-teal-brand bg-teal-brand" : "bg-muted-bg"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <span
          className={`text-lg font-medium leading-7 ${
            isHighlighted ? "text-white text-xl leading-[30px]" : "text-copy-muted"
          }`}
        >
          {tier.name}
        </span>
        {tier.badge && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white">
            <FireIcon />
            <span className="text-copy-muted text-[10px] leading-none tracking-wide">
              {tier.badge.text}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-8 p-8 bg-white rounded-[18px] flex-1 ${
          isHighlighted ? "border border-muted-bg" : ""
        }`}
      >
        <div className="flex items-baseline gap-2">
          {tier.pricePrefix && (
            <span className="text-copy-muted text-4xl font-semibold leading-[44px]">
              {tier.pricePrefix}
            </span>
          )}
          <span className="text-copy-muted text-4xl font-semibold leading-[44px]">
            {tier.price}
          </span>
          {tier.priceNote && (
            <span className="text-copy-muted text-xs leading-6 self-center">
              {tier.priceNote}
            </span>
          )}
        </div>

        <p className="text-copy-muted text-base leading-6">
          {tier.description}
        </p>
          <Link href={ctaHref}>
        <button
          className={`w-full flex items-center justify-center gap-2.5 rounded-[10px] cursor-pointer transition-opacity hover:opacity-80 ${
            isHighlighted
              ? "h-[55px] bg-teal-brand border-none hover:opacity-90"
              : "h-[57px] border-2 border-muted-bg bg-muted-bg/60"
          }`}
        >
          <span
            className={`text-lg font-semibold leading-7 ${
              isHighlighted ? "text-white font-bold leading-[22px]" : "text-copy-muted"
            }`}
          >
            {tier.ctaText}
          </span>
        </button>
        </Link>

        <hr className="border-background" />

        <div className="flex flex-col gap-4">
          <p className="text-copy-muted text-base font-semibold leading-6">
            {tier.featureListTitle ?? "What's included:"}
          </p>
          <ul className="flex flex-col gap-3">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-copy-muted text-sm leading-5"
              >
                <CheckIcon className="shrink-0" />
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
