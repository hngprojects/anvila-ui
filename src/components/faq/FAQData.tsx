export interface FaqItem {
  question: string;
  answer: string;
}
export interface FaqSection {
  id: string;
  title: string;
  shortTitle: string;
  faqs: FaqItem[];
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "getting-started",
    title: "Get Started",
    shortTitle: "Getting Started",
    faqs: [
      {
        question: "What is Anvila?",
        answer:
          "Anvila helps users scaffold reusable AI agent setup packages from a plain-language description. It generates structured Markdown files that define an agent's identity, tone, behavior, worki
      },
      {
        question: "How do I create my first package?",
        answer:
          'Click "Create your own package" and describe what your agent should do. Anvila will generate the setup files, skills, and GitHub-ready structure for you.',
      },
    ],
  },
  {
    id: "generating-packages",
    title: "Generating Packages",
    shortTitle: "Generating Packages",
    faqs: [
      {
        question: "What formats are supported?",
        answer:
          "Packages are generated as structured Markdown files with YAML frontmatter. They include identity, behavior, and skill definitions.",
      },
    ],
  },
  {
    id: "skills-structure",
    title: "Skills and Package Structure",
    shortTitle: "Skills and Package Structure",
    faqs: [
      {
        question: "What is a Skill in Anvila?",
        answer:
          "A Skill is a reusable capability block that defines what an agent can do. Skills include triggers, actions, and context rules.",
      },
    ],
  },
  {
    id: "publishing",
    title: "Publishing and Registry",
    shortTitle: "Publishing and Registry",
    faqs: [
      {
        question: "How do I publish to the registry?",
        answer:
          'After generating your package, click "Publish" to make it public. Public packages are free and listed in the explore page.',
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
          "Yes. Pay a one-time $5 fee per agent to make it private. Private packages are hidden from the registry and published to a private GitHub repository.",
      },
    ],
  },
  {
    id: "general",
    title: "General Questions",
    shortTitle: "General Questions",
    faqs: [
      {
        question: "Is there a limit on how many agents I can generate?",
        answer:
          "No, both free and professional plans allow unlimited agent generation.",
      },
    ],
  },
];
