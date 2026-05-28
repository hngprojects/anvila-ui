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
      <div className="flex flex-col gap-3">
        <h2 className="text-base sm:text-lg font-semibold text-black">
          {`${++index}. ${item.header}`}
        </h2>
        <p className="leading-relaxed font-normal text-black">{item.body}</p>
        {item.subheadings && (
          <ul className="list-none space-y-2 pl-0 text-sm sm:text-base text-black">
            {item.subheadings.map((subheading, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#A5A5A5] flex-shrink-0 block"></span>
                {subheading}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-20">

        <h1 className="text-[2rem] sm:text-[2.75rem] font-bold text-[#0C5D56] mb-6 leading-tight">
          Terms Of Service
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-[#E7E7E7] pb-5 mb-8">
          <p className="text-sm text-[#A5A5A5]">
            <span className="text-black font-medium">Effective:</span> May 6, 2026
          </p>
          <p className="text-sm text-[#A5A5A5]">
            <span className="text-black font-medium">Version:</span> v1.0.0
          </p>
        </div>

        <p className="text-sm sm:text-base text-black leading-relaxed mb-10">
          These Terms govern your access to and use of Anvila the open registry for standardized, reusable AI agents. By using the service, you agree to the terms below.
        </p>

        <div className="flex flex-col gap-8 md:gap-10 text-black">
          {termsData.map((item, index) => (
            <TermsCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <h2 className="text-base sm:text-lg font-semibold text-[#0C5D56]">
            12. Contact
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#0C5D56]">
            Questions about these Terms? Reach us at{" "}
            <Link href="mailto:legal@Anvila.dev" className="text-[#0C5D56] underline">
              legal@Anvila.dev
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsOfServicePage;
