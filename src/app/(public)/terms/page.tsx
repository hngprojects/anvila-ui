import Link from "next/link";

const TermsOfServicePage = () => {
  type TermsItem = {
    header: string;
    body: string;
    subheadings?: string[];
  };

  const termsData: TermsItem[] = [
    {
      header: "Acceptance of Terms",
      body: `By accessing or using Anvila (the "Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the Service. If you use the Serv
    },
    {
      header: "Accounts & Access",
      body: `Some features require linking a GitHub account. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.`,
      subheadings: [
        "You must be at least 13 years old to create an account.",
        "You must provide accurate information when registering.",
        "Notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      header: "Agents & Content",
      body: `"Agents" are packaged AI configurations including identity, soul, and dna files generated, uploaded, or published through the Service. You retain ownership of the Agents you create. By pu
    },
    {
      header: "Explore",
      body: `The registry is a public index of community-published Agents. We do not guarantee the accuracy, safety, or fitness for purpose of any third-party Agent. Use Agents from the registry at yo
    },
    {
      header: "Acceptable Use",
      body: `You agree not to use the Service to:`,
      subheadings: [
        "Generate or distribute Agents that produce illegal, harmful, or malicious output.",
        "Infringe intellectual property, privacy, or publicity rights of others.",
        "Attempt to reverse engineer, disrupt, or overload the Service.",
        "Train models on the Service in violation of rate limits or fair use.",
      ],
    },
    {
      header: "Intellectual Property",
      body: `The Service, including its branding, UI, documentation, and underlying code (other than open source components), is owned by Anvila and protected by applicable IP laws. Nothing in these T
    },
    {
      header: "Third Party Services",
      body: `Anvila integrates with third-party services such as GitHub and AI model providers. Your use of those services is governed by their respective terms. We are not responsible for third-party
    },
    {
      header: "Disclaimers",
      body: `The Service is provided "as is" and "as available", without warranties of any kind. AI generated output may be inaccurate, biased, or unsafe — always review output before relying on it.`,
    },
    {
      header: "Limitation of Liability",
      body: `To the maximum extent permitted by law, Anvila shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill ari
    },
    {
      header: "Termination",
      body: `We may suspend or terminate your access to the Service at any time for violation of these Terms. You may stop using the Service at any time. Sections that by their nature should survive t
    },
    {
      header: "Changes to Terms",
      body: `We may update these Terms from time to time. Material changes will be announced on the Service. Continued use after changes take effect constitutes acceptance of the updated Terms.`,
    },
  ];

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
      <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10 lg:px-20">
        <header>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Terms Of
            <span className="text-[#0C5C72]"> Service</span>
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
            <TermsCard item={item} index={index} />
          ))}

          <div className="text-base sm:text-lg md:text-xl md:leading-8">
            <h2 className="font-bold">12. Contact</h2>
            <p className="leading-relaxed font-normal">
              Questions about these Terms? Reach us at
              <Link href="" className="text-[#0C5C72]">
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
