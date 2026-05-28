import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

interface CTASectionProps {
  heading: string;
  body: string;
  buttonText: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="explore-heading"
      className="flex flex-col items-center bg-white px-6 pt-16 pb-12 md:pt-24 md:pb-16"
    >
      <h1
        id="explore-heading"
        className="text-center text-xl text-logo font-medium md:text-[52px] md:leading-normal max-w-[900px]"
      >
        {title}
      </h1>
      <p
        className="text-center text-sm font-normal max-w-[520px] mt-5 leading-5 text-[#595959]"
      >
        {subtitle}
      </p>
    </section>
  );
}


export function CTASection({
  heading,
  body,
  buttonText,
}: CTASectionProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="flex flex-col items-center bg-white px-6 py-16 md:py-20"
    >
      <h2
        id="cta-heading"
        className="text-center text-logo font-medium text-[clamp(28px,4vw,40px)] leading-[44px]"
      >
        {heading}
      </h2>
      <p
        className="text-center text-sm font-normal max-w-[420px] mt-3 leading-[22px] text-[#595959]"
      >
        {body}
      </p>
      <Button
        asChild
        className="mt-8 cursor-pointer rounded-lg bg-teal-brand px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 border-none"
      >
        <Link href="/register">{buttonText}</Link>
      </Button>
    </section>
  );
}
