import { TermsItem } from "@/app/types/termsItem";
import { termsData } from "@/lib/data";
import Link from "next/link";

const TermsOfServicePage = () => {
  type TermsCardProps = {
    item: TermsItem;
    index: number;
  };

  const TermsCard = ({ item, index }: TermsCardProps) => {
    return (
      <div className="text-base sm:text-lg md:text-xl md:leading-8">
        <h2 className="font-bold">{`${++index}. ${item.header}`}</h2>

        <p className="leading-relaxed font-normal">{item.body}</p>

        {item.subheadings && (
          <ul className="list-disc space-y-2 pl-7 text-base font-normal sm:text-lg md:text-xl">
            {item.subheadings.map((subheading, index) => (
              <li key={index}>{subheading}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 py-8 md:px-10 lg:px-20">
        <header>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Terms Of
            <span className="text-teal-brand"> Service</span>
          </h1>
          <section className="mt-4 flex w-full flex-col gap-1 text-base sm:flex-row sm:justify-between sm:text-xl">
            <p className="font-semibold">Effective: May 6, 2026</p>
            <p className="font-medium">Version: v1.0.0</p>
          </section>
          <hr className="mt-4" />
        </header>
        <p className="my-10 text-xl">
          These Terms govern your access to and use of Anvila the open registry
          for standardized, reusable AI agents. By using the service, you agree
          to the terms below.
        </p>

        <div className="space-y-8 text-black md:space-y-10">
          {termsData.map((item, index) => (
            <TermsCard key={index} item={item} index={index} />
          ))}

          <div className="text-base sm:text-lg md:text-xl md:leading-8">
            <h2 className="font-bold">12. Contact</h2>
            <p className="leading-relaxed font-normal">
              Questions about these Terms? Reach us at
              <Link href="" className="text-teal-brand">
                {" "}
                legal@Anvila.dev.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
