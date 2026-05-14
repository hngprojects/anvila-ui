import Link from 'next/link'

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
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="44" rx="22" fill="#005F5A"/>
              <path d="M25.5 17.5C25.5 19.433 23.933 21 22 21C20.067 21 18.5 19.433 18.5 17.5C18.5 15.567 20.067 14 22 14C23.933 14 25.5 15.567 25.5 17.5Z" fill="#F6F7F7"/>
              <path d="M28 26.5C28 28.433 25.3137 30 22 30C18.6863 30 16 28.433 16 26.5C16 24.567 18.6863 23 22 23C25.3137 23 28 24.567 28 26.5Z" fill="#F6F7F7"/>
              <path d="M17.122 15C17.2995 15 17.4728 15.0174 17.6401 15.0506C17.2325 15.7745 17 16.6101 17 17.5C17 18.3683 17.2213 19.1848 17.6106 19.8964C17.4524 19.9258 17.2891 19.9413 17.122 19.941
              <path d="M15.4473 28.986C14.8794 28.3071 14.5 27.474 14.5 26.5C14.5 25.5558 14.8566 24.744 15.3958 24.0767C13.4911 24.2245 12 25.2662 12 26.5294C12 27.8044 13.5173 28.8538 15.4473 28.986
              <path d="M26.9999 17.5C26.9999 18.3683 26.7786 19.1848 26.3893 19.8964C26.5475 19.9258 26.7108 19.9413 26.8779 19.9413C28.2923 19.9413 29.4389 18.8351 29.4389 17.4706C29.4389 16.1061 28.
              <path d="M28.5526 28.986C30.4826 28.8538 31.9999 27.8044 31.9999 26.5294C31.9999 25.2662 30.5088 24.2245 28.6041 24.0767C29.1433 24.744 29.4999 25.5558 29.4999 26.5C29.4999 27.474 29.120
            </svg>
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
