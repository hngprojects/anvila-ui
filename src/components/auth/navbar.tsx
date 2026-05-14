import Link from 'next/link'
import Image from "next/image";

export const AuthNavBar = () => {
  return (
    <header className=" max-[700px]:invisible flex h-[80px] w-full items-center bg-white px-17">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center gap-12">
        
        <Link
          href="/"
          className="flex items-center gap-2 no-underline outline-none"
        >
          {/* Logo */}
          <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full">
        <Image
              src="/images/Logo.svg"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>

          {/* Text */}
          <span className="text-[20px] font-bold tracking-[0.03em] text-[#0C0E0D]">
            ANVILA
          </span>
        </Link>

      </div>
    </header>
  )
}
