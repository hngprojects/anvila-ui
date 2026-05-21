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

// ---------------- SIDEBAR TYPES ----------------

export interface User {
  display_name?: string;
  email?: string;
}

export interface SidebarProps {
  user?: User;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export interface CollapsedSidebarProps {
  user?: User;
  onExpand: () => void;
}

export interface ExpandedSidebarProps {
  user?: User;
  onCollapse: () => void;
}

export interface MobileDrawerProps {
  user?: User;
  onClose: () => void;
}

//  empty states types

export interface Step {
  number: number;
  title: string;
  description: string | ((countdown: number) => string);
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface GenerationStep {
  id: string;
  name: string;
  durationSeconds: number;
}

export type ErrorVariant = "generic" | "timeout" | "inline";

export interface GenerationTimeoutEmptyStateProps {
  onRetry?: () => void;
  onHelp?: () => void;
}

export interface GenerationFailedEmptyStateProps {
  errorCode?: string;
  errorDetail?: string;
  onRetry?: () => void;
  onReport?: () => void;
}

export interface GenerationErrorEmptyStateProps {
  variant?: ErrorVariant;
  errorCode?: string;
  errorDetail?: string;
  preservedInput?: string;
  autoRetrySeconds?: number;
  onRetry?: () => void;
  onReport?: () => void;
  onEditPrompt?: () => void;
}

export interface GenerationLoadingStateProps {
  preservedInput?: string;
  steps?: GenerationStep[];
  onCancel?: () => void;
}

export interface NoRecentAgentsEmptyStateProps {
  onCreate: () => void;
  onLearn?: () => void;
}

export interface NoSearchResultsEmptyStateProps {
  query?: string;
  onClear: () => void;
  onHelp?: () => void;
  suggestions?: string[];
}
