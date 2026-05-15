'use client'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { AuthDialog } from '@/components/auth-dialog'

const CheckIcon = () => (
  <div
    style={{
      display: 'flex',
      width: '20px',
      height: '20px',
      borderRadius: '9999px',
      backgroundColor: '#0C5D56',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path d="M11.7502 0.251116C12.085 0.585938 12.085 1.12969 11.7502 1.46451L4.89308 8.32165C4.55826 8.65647 4.01451 8.65647 3.67969 8.32165L0.251116 4.89308C-0.0837054 4.55826 -0.0837054 4.01451 0.251116 3.67969C0.585938 3.34487 1.12969 3.34487 1.46451 3.67969L4.28772 6.50022L10.5395 0.251116C10.8743 -0.0837054 11.4181 -0.0837054 11.7529 0.251116H11.7502Z" fill="white" />
    </svg>
  </div>
)

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.7734 7.46667C11.62 7.26667 11.4334 7.09333 11.26 6.92C10.8134 6.52 10.3067 6.23333 9.88003 5.81333C8.8867 4.84 8.6667 3.23333 9.30003 2C8.6667 2.15333 8.11337 2.5 7.64003 2.88C5.91337 4.26667 5.23337 6.71333 6.0467 8.81333C6.07337 8.88 6.10003 8.94667 6.10003 9.03333C6.10003 9.18 6.00003 9.31333 5.8667 9.36667C5.71337 9.43333 5.55337 9.39333 5.4267 9.28667C5.38886 9.25497 5.35722 9.21655 5.33337 9.17333C4.58003 8.22 4.46003 6.85333 4.9667 5.76C3.85337 6.66667 3.2467 8.2 3.33337 9.64667C3.37337 9.98 3.41337 10.3133 3.5267 10.6467C3.62003 11.0467 3.80003 11.4467 4.00003 11.8C4.72003 12.9533 5.9667 13.78 7.3067 13.9467C8.73337 14.1267 10.26 13.8667 11.3534 12.88C12.5734 11.7733 13 10 12.3734 8.48L12.2867 8.30667C12.1467 8 11.7734 7.46667 11.7734 7.46667ZM9.6667 11.6667C9.48003 11.8267 9.17337 12 8.93337 12.0667C8.1867 12.3333 7.44003 11.96 7.00003 11.52C7.79337 11.3333 8.2667 10.7467 8.4067 10.1533C8.52003 9.62 8.3067 9.18 8.22003 8.66667C8.14003 8.17333 8.15337 7.75333 8.33337 7.29333C8.46003 7.54667 8.59337 7.8 8.75337 8C9.2667 8.66667 10.0734 8.96 10.2467 9.86667C10.2734 9.96 10.2867 10.0533 10.2867 10.1533C10.3067 10.7 10.0667 11.3 9.6667 11.6667Z" fill="#ED5F15" />
  </svg>
)

const STARTER_FEATURES = [
  '3 public setup packages',
  'Browse and clone public packages',
  'GitHub-ready package structure',
  'Reusable personality, behavior, and Skill files',
]

const BUILDER_FEATURES = [
  'Extra public packages after the free limit',
  'Private package creation',
  'Hidden from the public registry',
  'GitHub-ready package export',
  'Ideal for client work and internal agent setups',
]

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What does "one-time per agent" mean?',
      a: 'You pay once to turn a specific agent setup private. No recurring subscriptions.',
    },
    {
      q: 'Can I make a public agent private later?',
      a: 'Yes, upgrade any public agent to professional at any time.',
    },
    {
      q: 'Is there a limit on how many agents I can generate?',
      a: 'No, both plans allow unlimited agent generation.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'All major credit cards, PayPal, and crypto.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Generally no, but contact support for issues.',
    },
  ]

  return (
    <section
      className="w-full bg-white"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '48px',
        alignSelf: 'stretch',
        padding: '80px 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '6px 12px',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            border: '0.5px solid #A1A1AA',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              background: '#EA580C',
            }}
          />
          <span
            style={{
              color: '#52525B',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '20px',
            }}
          >
            PRICING
          </span>
        </div>

        <h2
          style={{
            color: '#0C0E0D',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '48px',
            margin: 0,
            width: '100%',
          }}
        >
          Simple pricing for reusable <br /> agent setups.
        </h2>

        <p
          style={{
            color: '#52525B',
            fontFamily: 'Geist, Inter, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            width: '665px',
            margin: 0,
          }}
        >
          Create your first 3 public setup packages for free. Pay once when you
          need more packages or want to keep a package private.
        </p>
      </div>

      <div
        className="mx-auto flex w-full flex-col md:flex-row"
        style={{
          maxWidth: '800px',
          alignItems: 'stretch',
          gap: '24px',
        }}
      >
        {/* Starter Card */}
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            flexDirection: 'column',
            borderRadius: '20px',
            border: '1.5px solid #E4E4E7',
            backgroundColor: '#E4E4E7',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              alignItems: 'center',
              gap: '5px',
              alignSelf: 'stretch',
              backgroundColor: '#E4E4E7',
            }}
          >
            <span
              style={{
                color: '#18181B',
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Starter
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '24px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              flex: '1 0 0',
              alignSelf: 'stretch',
              borderRadius: '20px',
              border: '1px solid #FFF',
              backgroundColor: '#FFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '36px', fontWeight: 600, color: '#52525B' }}>$0</span>
            </div>

            <p
              style={{
                color: '#52525B',
                fontFamily: 'Geist',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                margin: 0,
                height: '48px',
              }}
            >
              Best for trying Anvila and publishing your <br /> first public setup packages.
            </p>

            <AuthDialog
              trigger={
                <button
                  style={{
                    display: 'flex',
                    height: '55.65px',
                    padding: '16px 103px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    alignSelf: 'stretch',
                    borderRadius: '10px',
                    backgroundColor: '#E4E4E7',
                    border: 'none',
                    color: '#18181B',
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    marginTop: 'auto',
                  }}
                >
                  Create free package
                </button>
              }
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#18181B' }}>What&apos;s included:</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {STARTER_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#52525B' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Builder Card */}
        <div
          style={{
            display: 'flex',
            flex: '1 0 0',
            flexDirection: 'column',
            borderRadius: '20px',
            border: '1.5px solid #0C5D56',
            backgroundColor: '#0C5D56',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: '68px',
              padding: '12px 24px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5px',
              flexShrink: 0,
              alignSelf: 'stretch',
              backgroundColor: '#0C5D56',
            }}
          >
            <span
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Builder
            </span>
            <div
              style={{
                display: 'flex',
                padding: '4px 10px',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <FireIcon />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#7A7A7A' }}>MOST POPULAR</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '24px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              flex: '1 0 0',
              alignSelf: 'stretch',
              borderRadius: '20px',
              border: '1px solid #FFF',
              backgroundColor: '#FFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '36px', fontWeight: 600, color: '#52525B' }}>$5</span>
              <span style={{ fontSize: '14px', color: '#71717A' }}>one time payment</span>
            </div>

            <p
              style={{
                color: '#52525B',
                fontFamily: 'Geist',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                margin: 0,
                height: '48px',
              }}
            >
              Best for creating more packages, private setups, client projects, and internal <br /> workflows.
            </p>

            <AuthDialog
              trigger={
                <button
                  style={{
                    display: 'flex',
                    height: '55.65px',
                    padding: '16px 103px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    alignSelf: 'stretch',
                    borderRadius: '10px',
                    backgroundColor: '#0C5D56',
                    border: 'none',
                    color: '#FFF',
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    marginTop: 'auto',
                  }}
                >
                  Create paid package
                </button>
              }
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#18181B' }}>Everything in Premium:</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {BUILDER_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#52525B' }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#0C0E0D]">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E4E4E7] bg-white"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-[#0C0E0D]">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openFaq === i && (
                <div className="border-t border-[#E4E4E7] p-6 text-[#52525B]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}