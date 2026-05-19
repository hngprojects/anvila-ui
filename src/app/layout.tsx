import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inter } from "@/components/lib/fonts";
import { AuthProvider } from "@/context/auth";
import { getServerTokens } from "@/lib/auth/cookies";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = "Anvila";
const appDescription = "Build reusable AI agent packages from one clear setup. Describe your agent setup in seconds and get a structured package you can publish, share, and reuse.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: appDescription,
  keywords: [
    "AI agents",
    "agent packages",
    "prompt engineering",
    "no-code AI",
    "AI Skills",
    "GitHub agent setup",
  ],
  authors: [{ name: appName }],

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  openGraph: {
    title: appName,
    description: appDescription,
    url: appUrl,
    siteName: appName,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: appName,
    description: appDescription,
  },
};

async function getInitialUser() {
  const { accessToken } = await getServerTokens()
  if (!accessToken) return null
 
  const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
 
  try {
    const res = await fetch(`${BASE}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    })
 
    if (!res.ok) return null
 
    const data = await res.json()
    return data.data ?? data.user ?? null
  } catch {
    return null
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getInitialUser()
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
      </body>
    </html>
  );
}

