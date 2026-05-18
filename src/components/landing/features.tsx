import { Button } from "@/components/ui/button";

function RobotIcon({ color = "#0C5D56" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="aspect-square shrink-0"
    >
      <path
        d="M11.9999 3.6001C11.0123 3.6001 10.1999 4.4125 10.1999 5.4001C10.1999 6.0601 10.5635 6.6433 11.0999 6.9565V8.4001H8.6999C7.66332 8.40241 6.65914 8.76157 5.85622 9.41719C5.05331 10.0728 4.50062 10.9849 4.2911 12.0001H4.1999C3.2159 12.0001 2.3999 12.8161 2.3999 13.8001V15.0001C2.3999 15.9841 3.2159 16.8001 4.1999 16.8001H4.2911C4.7111 18.8497 6.5303 20.4001 8.6999 20.4001H15.2999C16.3365 20.3978 17.3407 20.0386 18.1436 19.383C18.9465 18.7274 19.4992 17.8153 19.7087 16.8001H19.7999C20.7839 16.8001 21.5999 15.9841 21.5999 15.0001V13.8001C21.5999 12.8161 20.7839 12.0001 19.7999 12.0001H19.7087C19.4992 10.9849 18.9465 10.0728 18.1436 9.41719C17.3407 8.76157 16.3365 8.40241 15.2999 8.4001H12.8999V6.9565C13.4363 6.6433 13.7999 6.0613 13.7999 5.4001C13.7999 4.4125 12.9875 3.6001 11.9999 3.6001ZM9.5999 11.1001C10.4231 11.1001 11.0999 11.7769 11.0999 12.6001C11.0999 13.4233 10.4231 14.1001 9.5999 14.1001C8.7767 14.1001 8.0999 13.4233 8.0999 12.6001C8.0999 11.7769 8.7767 11.1001 9.5999 11.1001ZM14.3999 11.1001C15.2231 11.1001 15.8999 11.7769 15.8999 12.6001C15.8999 13.4233 15.2231 14.1001 14.3999 14.1001C13.5767 14.1001 12.8999 13.4233 12.8999 12.6001C12.8999 11.7769 13.5767 11.1001 14.3999 11.1001ZM8.9999 15.9001H14.9999C15.2386 15.9001 15.4675 15.9949 15.6363 16.1637C15.8051 16.3325 15.8999 16.5614 15.8999 16.8001C15.8999 17.0388 15.8051 17.2677 15.6363 17.4365C15.4675 17.6053 15.2386 17.7001 14.9999 17.7001H8.9999C8.76121 17.7001 8.53229 17.6053 8.36351 17.4365C8.19472 17.2677 8.0999 17.0388 8.0999 16.8001C8.0999 16.5614 8.19472 16.3325 8.36351 16.1637C8.53229 15.9949 8.76121 15.9001 8.9999 15.9001Z"
        fill={color}
      />
    </svg>
  );
}

type Card = {
  title: string;
  description: string;
  chip: string;
  variant: "light" | "dark";
};

const CARDS: Card[] = [
  {
    title: "Smart Skill Matching",
    description:
      "Skills are auto-detected and attached based on agent type. Marketing gets SEO and analytics. Dev gets code review and debugging.",
    chip: "auto-assigned",
    variant: "light",
  },
  {
    title: "Agent Setup Scaffolder",
    description:
      "Describe any agent in natural language. Get a complete, structured agent package instantly no repeated prompt engineering, no inconsistency.",
    chip: "identity.md · soul.md · dna.md · heartbeat.md",
    variant: "dark",
  },
  {
    title: "GitHub Auto-Publishing",
    description:
      "Every agent becomes a real, cloneable GitHub repository in seconds. Fork it, share it, plug it into any system.",
    chip: "github.com/Anvila/...",
    variant: "light",
  },
];

export function Features() {
  return (
    <section className="w-full bg-zinc-100">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 p-6 md:gap-10 md:px-20 md:py-10">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-zinc-400 px-3 py-1.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-warning"
          />
          <span className="text-xs font-medium leading-5 text-copy-muted">
            FEATURES
          </span>
        </div>

     <h2 className="m-0 w-full max-w-[760px] text-center text-3xl font-medium leading-[38px] text-logo md:text-5xl md:leading-[60px]">
  One setup. Clean files. <br className="hidden md:inline" />
  Reusable agents.
</h2>

        {/* Subhead */}
        <p className="m-0 max-w-[565px] text-center text-base font-normal leading-6 text-copy-muted">
          Keep your agent&apos;s personality, rules, and skills in one reusable
          ready-to-publish package. Find the perfect agent setup on the public
          package registry.
        </p>

        {/* Cards */}
        <div className="grid w-full grid-cols-1 gap-6 self-stretch md:grid-cols-3">
          {CARDS.map((card) => {
            const isDark = card.variant === "dark";
            return (
              <div
                key={card.title}
                className={`flex flex-col items-start gap-5 self-stretch rounded-3xl p-6 ${
                  isDark
                    ? "border-[0.5px] border-white bg-teal-brand"
                    : "border border-border-subtle bg-white"
                }`}
              >
                <RobotIcon color={isDark ? "#FFFFFF" : "#0C5D56"} />
                <h3
                  className={`m-0 text-xl font-semibold leading-[30px] ${
                    isDark ? "text-white" : "text-logo"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`m-0 self-stretch text-base font-normal leading-6 ${
                    isDark ? "text-white" : "text-copy-muted"
                  }`}
                >
                  {card.description}
                </p>
                <div
                  className={`mt-auto inline-flex items-center justify-center gap-2.5 rounded-full px-[15px] py-2 ${
                    isDark ? "bg-white" : "bg-[#E7EFF1]"
                  }`}
                >
                  <span className="text-sm font-normal leading-5 text-copy-muted">
                    {card.chip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

  <Button className="flex h-auto items-center justify-center gap-2.5 rounded-lg border-none bg-teal-brand p-4 text-base font-medium leading-6 text-white transition-opacity hover:opacity-90">
          Create your first package
        </Button>
      </div>
    </section>
  );
}