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

export interface FaqAccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  pricePrefix?: string;
  priceNote?: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  features: string[];
  featureListTitle?: string;
  highlighted?: boolean;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  responseTime?: string;
  email: string;
  highlighted?: boolean;
}

export interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  isMobile?: boolean;
}
