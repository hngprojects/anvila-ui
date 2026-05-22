import { Twitter, Linkedin } from "@/components/icons";
import { FooterColumn } from "@/types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      { label: "Create Package", href: "/login" },
      { label: "Browse Registry", href: "/explore" },
      { label: "GitHub Publishing", href: "/login" },
      { label: "Pricing", href: "/pricing" },
      { label: "Early Access", href: "/waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contacts", href: "/contact" },
      { label: "Partners", href: "/contact" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Twitter / X", href: "https://x.com/anviladev" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/anvila-dev" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { icon: Twitter, href: "https://x.com/anviladev", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/anvila-dev", label: "LinkedIn" },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy_policy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookies Policy", href: "/" },
];
