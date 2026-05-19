import { Facebook, Twitter, Linkedin, Instagram } from "@/components/icons";
import { FooterColumn } from "@/types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      { label: "Create Package", href: "#" },
      { label: "Browse Registry", href: "/explore" },
      { label: "GitHub Publishing", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Early Access", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contacts", href: "/contact" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Product Hunt", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cookies Policy", href: "#" },
];
