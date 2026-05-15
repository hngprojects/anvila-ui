'use client'

import { GoogleLogo, GithubLogo } from '@/components/icons'

const providers = [
  { provider: 'google', Icon: GoogleLogo, href: '/api/auth/google' },
  { provider: 'github', Icon: GithubLogo, href: '/api/auth/github' },
] as const

export const AuthOAuthButtons = () => {
  return (
    <div className="flex flex-col gap-3">
    
      <div className="flex items-center gap-2.5">
        <div className="flex-1 bg-[#E5E7EB]" />
        <span className="text-[14px] font-bold text-[#111]">OR</span>
        <div className="flex-1 bg-[#E5E7EB]" />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ provider, Icon, href }) => (
          <button
            key={provider}
            type="button"
            onClick={() => { window.location.href = href }}
            className="flex cursor-pointer items-center justify-center rounded-[8px] border border-[#E7E7E7] bg-[#F6F7F7] p-[11px] transition-colors duration-150 hover"
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  )
}