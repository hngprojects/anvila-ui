import { FaqSection } from "@/types";

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    shortTitle: "Getting Started",
    faqs: [
      {
        question: "What is Anvila?",
        answer:
          "Anvila helps users scaffold reusable AI agent setup packages from a plain-language description. It generates structured Markdown files that define an agent's identity, tone, behavior, worki
      },
      {
        question: "What can I create with Anvila?",
        answer:
          "You can create reusable AI agent setup packages for use across products, workflows, learning projects, and internal systems. Packages can include identity.md, soul.md, dna.md, overview.md, 
      },
      {
        question:
          "Do I need to know a file schema or formatting system before using Anvila?",
        answer:
          "No. Anvila is designed so users can describe the agent setup they need in natural language without learning a schema or file format.",
      },
      {
        question: "Who is Anvila built for?",
        answer:
          "Anvila is built for AI developers, prompt engineers, startups building AI-powered workflows, no-code builders, automation builders, and learning communities exploring AI agent projects.",
      },
      {
        question: "Does Anvila run the AI agent itself?",
        answer:
          "No. Anvila focuses on the setup layer behind AI agents. It scaffolds, packages, publishes, and distributes the files that define how agents should behave.",
      },
    ],
  },
  {
    id: "generating-packages",
    title: "Generating Packages",
    shortTitle: "Generating Packages",
    faqs: [
      {
        question: "How does package generation work?",
        answer:
          "You describe the agent setup you need in a single input field, and Anvila scaffolds a structured package of Markdown files based on that description.",
      },
      {
        question: "What files are included in a generated package?",
        answer:
          "Generated packages can include identity.md, soul.md, dna.md, overview.md, heartbeat.md, README.md, and matched Skills inside a skills/ folder.",
      },
      {
        question: "How fast is package generation?",
        answer:
          "The response time target is under 10 seconds, with a maximum package preview time of 30 seconds.",
      },
      {
        question: "Can I preview my files before publishing?",
        answer:
          "Yes. Users can preview generated files and matched Skills before publishing the package.",
      },
      {
        question: "What happens if my description is vague or incomplete?",
        answer:
          "The system is designed to handle vague or partial descriptions without crashing.",
      },
    ],
  },
  {
    id: "skills-structure",
    title: "Skills and Package Structure",
    shortTitle: "Skills and Package Structure",
    faqs: [
      {
        question: "How are Skills added to packages?",
        answer:
          "Anvila automatically matches Skills to the agent setup description using an approved local Skill catalog.",
      },
      {
        question: "How many Skills can a package include?",
        answer: "The system selects between 2 and 6 Skills per package.",
      },
      {
        question: "Can I change the Skills that were matched?",
        answer:
          "Yes. Before publishing, users can remove, replace, or confirm matched Skills.",
      },
      {
        question: "What is included in the generated README?",
        answer:
          "The README explains what the package is for, what files are included, which Skills are included, the package capabilities, and how another builder can use it.",
      },
      {
        question: "Why does Anvila use a consistent package structure?",
        answer:
          "A consistent structure makes packages portable, reusable, easier to share, and easier for other builders to adapt.",
      },
    ],
  },
  {
    id: "publishing",
    title: "Publishing and Registry",
    shortTitle: "Publishing and Registry",
    faqs: [
      {
        question: "Can I publish packages to GitHub?",
        answer:
          "Yes. Anvila automatically pushes approved packages to GitHub and provides a shareable GitHub URL.",
      },
      {
        question: "What happens after I publish a public package?",
        answer:
          "Public packages are automatically listed in the public registry where other users can browse, clone, download, and reuse them.",
      },
      {
        question: "Can I download or clone packages?",
        answer:
          "Yes. Users can download a ZIP version of a package or clone the package repository directly from GitHub.",
      },
      {
        question: "What information appears on public package listings?",
        answer:
          "Listings show the package name, category, short description, included Skills, and GitHub link.",
      },
      {
        question: "Can I explore packages created by other users?",
        answer:
          "Yes. The Explore page allows users to browse public agent packages organized by category.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy and Access",
    shortTitle: "Privacy and Access",
    faqs: [
      {
        question: "Can I keep my package private?",
        answer:
          "Yes. Users can choose a private paid publishing option to keep their package hidden from the public registry.",
      },
      {
        question: "How does private publishing work?",
        answer:
          "Private packages are pushed to a private GitHub repository or private storage route after payment is processed.",
      },
      {
        question: "Will private packages appear in the public registry?",
        answer: "No. Private packages are not listed in the public registry.",
      },
      {
        question: "Can I still access my private packages?",
        answer: "Yes. Users can still access and download their private packages.",
      },
      {
        question: "Does Anvila offer both free and paid publishing options?",
        answer:
          "Yes. Before publishing, users are presented with a Public Free option or a Private Paid option.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    shortTitle: "Pricing",
    faqs: [
      {
        question: "What do I get for free?",
        answer:
          "You can create 3 public packages for free. Public packages are listed in the Anvila registry.",
      },
      {
        question: "When do I pay?",
        answer:
          "You pay when you create more than 3 public packages or when you want to keep a package private.",
      },
      {
        question: "Is this a subscription?",
        answer:
          "No. Builder pricing is a one-time payment per extra or private package.",
      },
      {
        question: "What happens after I use my 3 free public package credits?",
        answer:
          "You can continue creating packages through the Builder option with a one-time payment per extra package.",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    shortTitle: "General",
    faqs: [
      {
        question: "What counts as a package?",
        answer:
          "A package is a reusable AI agent setup that includes the agent's role, behavior rules, Skills, README docs, and GitHub-ready structure.",
      },
      {
        question: "Do public packages automatically appear in the registry?",
        answer:
          "Yes. All non-private packages appear in the public registry automatically after publishing.",
      },
      {
        question: "Can people clone my public packages?",
        answer:
          "Yes. Public packages are designed to be discovered, cloned, adapted, and reused.",
      },
    ],
  },
];
