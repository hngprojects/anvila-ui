import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inter } from "@/components/lib/fonts";
import { AuthProvider } from "@/context/auth";
import { getServerTokens } from "@/lib/auth/cookies";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Anvila";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: `${appName} — a Next.js 16 starter.`,
  icons: {
    icon: [
      { url: "/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon-64.svg", sizes: "64x64", type: "image/svg+xml" },
    ],
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

