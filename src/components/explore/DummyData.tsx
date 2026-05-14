export type Category =
  | "All"
  | "Marketing"
  | "Development"
  | "Research"
  | "Finance"
  | "Operation";

export interface Tag {
  label: string;
  color: string;
  bgColor: string;
}
export interface AgentCardData {
  title: string;
  description: string;
  tags: Tag[];
  downloads: string;
  category: Category[];
}

export const CATEGORIES: Category[] = [
  "All",
  "Marketing",
  "Development",
  "Research",
  "Finance",
  "Operation",
];

export const AGENTS: AgentCardData[] = [
  {
    title: "DevOps Sentinel",
    description:
      "Autonomous infrastructural monitoring and incident response agents for modern cloud-native systems",
    tags: [
      { label: "KUBERNETES", color: "#2563EB", bgColor: "#DBEAFE" },
      { label: "LOGS", color: "#EA580C", bgColor: "#FFEDD5" },
      { label: "PHYTONS", color: "#EA580C", bgColor: "#DCFCE7" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "web Scryer",
    description:
      "Deep-web research agent specialized in academic paper synthesis and data discovery",
    tags: [
      { label: "KUBERNETES", color: "#0D9488", bgColor: "#DCFCE7" },
      { label: "LOGS", color: "#0891B2", bgColor: "#CFFAFE" },
      { label: "PHYTONS", color: "#DC2626", bgColor: "#FEE2E2" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Market Plus",
    description:
      "Real-time Sentiment analysis engine. Scanning crypto exchanges and social media",
    tags: [
      { label: "TRADING", color: "#DB2777", bgColor: "#FCE7F3" },
      { label: "WEB_SOCKETS", color: "#9333EA", bgColor: "#F3E8FF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Finance"],
  },
  {
    title: "Biotech Research Assistant",
    description:
      "Literature synthesis, protocol design and data interpretation for life science",
    tags: [
      { label: "LITERATURE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "INFORMATIC", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "DATA", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Code Review Specialist",
    description:
      "In-depth code review with security, performance and readability focus",
    tags: [
      { label: "CODE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "PERFORMANCE", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "Spotify Summer Campaign Agent",
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: "AUDIENCE TARGET", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "SOCIAL-M CONTENT", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Marketing"],
  },
  {
    title: "Biotech Research Assistant",
    description:
      "Literature synthesis, protocol design and data interpretation for life science",
    tags: [
      { label: "LITERATURE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "INFORMATIC", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "DATA", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Research"],
  },
  {
    title: "Code Review Specialist",
    description:
      "In-depth code review with security, performance and readability focus",
    tags: [
      { label: "CODE REVIEW", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "PERFORMANCE", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "FINANCE", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Development"],
  },
  {
    title: "Spotify Summer Campaign Agent",
    description:
      "Drives Spotify's summer collection marketing with creative precision",
    tags: [
      { label: "AUDIENCE TARGET", color: "#005F5A", bgColor: "#E6EFEF" },
      { label: "SOCIAL-M CONTENT", color: "#005F5A", bgColor: "#E6EFEF" },
    ],
    downloads: "2,543",
    category: ["All", "Marketing"],
  },
];
