import { ContactIcon } from "@/components/icons";
import { ContactCard } from "@/types";

export const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Technical Support",
  "Partnerships & Enterprise",
  "Media & Press",
  "Billing & Payments",
];

export const CONTACT_CARDS: ContactCard[] = [
  {
    icon: <ContactIcon bg="#FCE7F3" stroke="#A41752" />,
    title: "Technical Support",
    description:
      "Struggling with a GitHub sync or the dna.md structure? Our developers are here to help you troubleshoot your Forge.",
    responseTime: "Under 24 hours",
    email: "anvila.dev@gmail.com",
  },
  {
    icon: <ContactIcon bg="#CCFBF1" stroke="#641BA3" />,
    title: "Partnerships & Enterprise",
    description:
      "Looking for private registries or custom Agent DNA for your organization? Let's build a tailored solution.",
    email: "anvila.dev@gmail.com",
    highlighted: true,
  },
  {
    icon: <ContactIcon bg="#F3E8FF" stroke="#0C5D56" />,
    title: "Media & Press",
    description:
      "Interested in featuring Anvila's mission to standardize portable intelligence?",
    email: "anvila.dev@gmail.com",
  },
];
