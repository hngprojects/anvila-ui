import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inter } from "@/components/lib/fonts"



const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Next Starter";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: `${appName} — a Next.js 16 starter.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}