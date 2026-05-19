import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { WhyAnvila } from "@/components/landing/why-anvila";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col">
      <Hero />
      <Features />
      <WhyAnvila />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
    </main>
  );
}