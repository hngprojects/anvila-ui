import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen w-full bg-white flex flex-col antialiased`}>
      {/* Header: Centered on mobile, Top-Left on desktop */}
      <header className="w-full flex justify-center md:justify-start p-8 md:px-16 md:py-10">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 md:w-8 md:h-8">
            <Image 
              src="/authImages/Anvila-logo.svg" 
              alt="Anvila Logo" 
              fill
              priority
              className="object-contain"
            />
          </div>
          {/* Logo text */}
          <span className="font-bold text-xl text-[#002B2B] hidden md:block">ANVILA</span>
        </div>
      </header>

      {/* actual form content */}
      <main className="flex-1 flex flex-col items-center justify-start md:justify-center px-2 md:px-6">
        <div className="w-full max-w-[95vw] md:max-w-[500px]">
          {children}
        </div>
      </main>
    </div>
  );
}