import { FireIcon, CheckIcon } from "@/components/icons";
import { PricingTier } from "@/types";

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard = ({ tier }: PricingCardProps) => {
  const isHighlighted = tier.highlighted ?? false;

  return (
    <div
      className={`relative flex flex-1 flex-col overflow-hidden rounded-[20px] ${
        isHighlighted
          ? "border border-teal-brand bg-white shadow-[0_0_0_3px_rgba(12,93,86,0.10)]"
          : "border border-zinc-200 bg-white"
      }`}
    >
      {/* Card header */}
      <div
        className={`flex items-center justify-between px-6 py-4 ${
          isHighlighted ? "bg-teal-brand" : "bg-zinc-50 border-b border-zinc-200"
        }`}
      >
        <span className={`text-base font-semibold ${isHighlighted ? "text-white" : "text-zinc-700"}`}>
          {tier.name}
        </span>
        {tier.badge && (
          <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
            <FireIcon />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              {tier.badge.text}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          {tier.pricePrefix && (
            <span className="text-4xl font-semibold tracking-tight text-zinc-900">{tier.pricePrefix}</span>
          )}
          <span className="text-4xl font-semibold tracking-tight text-zinc-900">{tier.price}</span>
          {tier.priceNote && (
            <span className="text-xs text-zinc-400 self-center">{tier.priceNote}</span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-zinc-500 -mt-2">{tier.description}</p>

        {/* CTA */}
        <button
          className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-[10px] border-none text-sm font-semibold transition-opacity hover:opacity-85 ${
            isHighlighted
              ? "bg-teal-brand text-white"
              : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
          }`}
        >
          {tier.ctaText}
        </button>

        <hr className="border-zinc-100" />

        {/* Features */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {tier.featureListTitle ?? "What's included"}
          </p>
          <ul className="flex flex-col gap-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
                <CheckIcon className="mt-0.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
