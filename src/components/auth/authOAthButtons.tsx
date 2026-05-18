'use client'

import { Google, Github } from '@/components/icons'

const providers = [
  { provider: 'google', Icon: Google, href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google` },
  { provider: 'github', Icon: Github, href: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/github` },
] as const

export const AuthOAuthButtons = () => {
  return (
    <div className="flex flex-col gap-3">
    
<div className="flex items-center justify-center">
  <span className="text-[14px] font-bold text-[#111]">OR</span>
</div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ provider, Icon, href }) => (
          <button
            key={provider}
            type="button"
            onClick={() => { window.location.href = href }}
            aria-label={`Continue with ${provider === 'google' ? 'Google' : 'GitHub'}`}
            className="flex cursor-pointer items-center justify-center rounded-[8px] border border-[#E7E7E7] bg-[#F6F7F7] p-[11px] transition-colors duration-150"
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  )
}
