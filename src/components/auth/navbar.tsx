import Link from 'next/link'
import { Logo } from '@/components/icons'

export const AuthNavBar = () => {
  return (
    <header
      className="max-[700px]:invisible flex h-[80px] w-full items-center bg-background px-6 sm:px-10 lg:px-17"
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-accent"
        >
          <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-full">
            <Logo />
          </div>
          <span className="text-[20px] font-bold tracking-[0.03em] text-logo">
            ANVILA
          </span>
        </Link>
      </div>
    </header>
  )
}
