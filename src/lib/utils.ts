import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//auth
export const maskEmail = (email: string): string => {
  if (!email) return "your email";
  const [name, domain] = email.split("@");
  return `${name.substring(0, 2)}****@${domain}`;
};