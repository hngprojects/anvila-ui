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
        <h2 className="text-base font-semibold text-copy-heading sm:text-lg">
          {`${++index}. ${item.header}`}
        </h2>
        <p className="font-normal leading-relaxed text-copy-body">{item.body}</p>
        {item.subheadings && (
          <ul className="list-none space-y-2 pl-0 text-sm text-copy-muted sm:text-base">
            {item.subheadings.map((subheading, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copy-faint" />
                {subheading}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[960px] px-6 py-10 md:px-10 md:py-16">

        <h1 className="mb-6 text-[32px] font-semibold leading-tight tracking-tight text-teal-brand sm:text-[48px]">
          Terms Of Service
        </h1>

        <div className="mb-8 flex flex-col gap-1 border-b border-border-subtle pb-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-copy-muted">
            <span className="font-medium text-copy-body">Effective:</span> May 6, 2026
          </p>
          <p className="text-sm text-copy-muted">
            <span className="font-medium text-copy-body">Version:</span> v1.0.0
          </p>
        </div>

        <p className="mb-10 text-sm leading-relaxed text-copy-muted sm:text-base">
          These Terms govern your access to and use of Anvila the open registry for standardized, reusable AI agents. By using the service, you agree to the terms below.
        </p>

        <div className="flex flex-col gap-8 text-copy-body md:gap-10">
          {termsData.map((item, index) => (
            <TermsCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-base font-semibold text-teal-brand sm:text-lg">
            12. Contact
          </h2>
          <p className="text-sm leading-relaxed text-teal-brand sm:text-base">
            Questions about these Terms? Reach us at{" "}
            <Link href="mailto:legal@Anvila.dev" className="underline transition-opacity hover:opacity-75">
              legal@Anvila.dev
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsOfServicePage;
