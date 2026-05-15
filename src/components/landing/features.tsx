import { Button } from '@/components/ui/button'

function RobotIcon({ color = '#0C5D56' }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, aspectRatio: '1 / 1' }}
    >
      <path
        d="M11.9999 3.6001C11.0123 3.6001 10.1999 4.4125 10.1999 5.4001C10.1999 6.0601 10.5635 6.6433 11.0999 6.9565V8.4001H8.6999C7.66332 8.40241 6.65914 8.76157 5.85622 9.41719C5.05331 10.0728 4.50062 10.9849 4.2911 12.0001H4.1999C3.2159 12.0001 2.3999 12.8161 2.3999 13.8001V15.0001C2.3999 15.9841 3.2159 16.8001 4.1999 16.8001H4.2911C4.7111 18.8497 6.5303 20.4001 8.6999 20.4001H15.2999C16.3365 20.3978 17.3407 20.0386 18.1436 19.383C18.9465 18.7274 19.4992 17.8153 19.7087 16.8001H19.7999C20.7839 16.8001 21.5999 15.9841 21.5999 15.0001V13.8001C21.5999 12.8161 20.7839 12.0001 19.7999 12.0001H19.7087C19.4992 10.9849 18.9465 10.0728 18.1436 9.41719C17.3407 8.76157 16.3365 8.40241 15.2999 8.4001H12.8999V6.9565C13.4363 6.6433 13.7999 6.0613 13.7999 5.4001C13.7999 4.4125 12.9875 3.6001 11.9999 3.6001ZM9.5999 11.1001C10.4231 11.1001 11.0999 11.7769 11.0999 12.6001C11.0999 13.4233 10.4231 14.1001 9.5999 14.1001C8.7767 14.1001 8.0999 13.4233 8.0999 12.6001C8.0999 11.7769 8.7767 11.1001 9.5999 11.1001ZM14.3999 11.1001C15.2231 11.1001 15.8999 11.7769 15.8999 12.6001C15.8999 13.4233 15.2231 14.1001 14.3999 14.1001C13.5767 14.1001 12.8999 13.4233 12.8999 12.6001C12.8999 11.7769 13.5767 11.1001 14.3999 11.1001ZM8.9999 15.9001H14.9999C15.2386 15.9001 15.4675 15.9949 15.6363 16.1637C15.8051 16.3325 15.8999 16.5614 15.8999 16.8001C15.8999 17.0388 15.8051 17.2677 15.6363 17.4365C15.4675 17.6053 15.2386 17.7001 14.9999 17.7001H8.9999C8.76121 17.7001 8.53229 17.6053 8.36351 17.4365C8.19472 17.2677 8.0999 17.0388 8.0999 16.8001C8.0999 16.5614 8.19472 16.3325 8.36351 16.1637C8.53229 15.9949 8.76121 15.9001 8.9999 15.9001Z"
        fill={color}
      />
    </svg>
  )
}

type Card = {
  title: string
  description: string
  chip: string
  variant: 'light' | 'dark'
}

const CARDS: Card[] = [
  {
    title: 'Smart Skill Matching',
    description:
      'Skills are auto-detected and attached based on agent type. Marketing gets SEO and analytics. Dev gets code review and debugging.',
    chip: 'auto-assigned',
    variant: 'light',
  },
  {
    title: 'Agent Setup Scaffolder',
    description:
      'Describe any agent in natural language. Get a complete, structured agent package instantly no repeated prompt engineering, no inconsistency.',
    chip: 'identity.md · soul.md · dna.md · heartbeat.md',
    variant: 'dark',
  },
  {
    title: 'GitHub Auto-Publishing',
    description:
      'Every agent becomes a real, cloneable GitHub repository in seconds. Fork it, share it, plug it into any system.',
    chip: 'github.com/Anvila/...',
    variant: 'light',
  },
]

const FONT = 'Geist, Inter, sans-serif'

export function Features() {
  return (
    <section className="w-full" style={{ background: '#F4F4F5' }}>
      <div
        className="features-inner mx-auto flex w-full flex-col items-center"
        style={{ maxWidth: '1440px' }}
      >
        <div
          className="inline-flex items-center"
          style={{
            padding: '6px 12px',
            gap: '8px',
            borderRadius: '9999px',
            border: '0.5px solid #A1A1AA',
          }}
        >
          <span
            aria-hidden
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              background: '#EA580C',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '20px',
              color: '#52525B',
            }}
          >
            FEATURES
          </span>
        </div>

        <h2
          style={{
            color: '#0C0E0D',
            textAlign: 'center',
            fontFamily: 'Geist, sans-serif',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '60px',
            margin: 0,
            width: '100%'
          }}
        >
          One setup. Clean files. Reusable agents.
        </h2>

        <p
          style={{
            fontFamily: FONT,
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#52525B',
            textAlign: 'center',
            margin: 0,
            width: '565px',
          }}
        >
          Keep your agent&apos;s personality, rules, and skills in one reusable
          ready-to-publish package. Find the perfect agent setup on the public
          package registry.
        </p>

        <div className="features-cards">
          {CARDS.map((card) => {
            const isDark = card.variant === 'dark'
            return (
              <div
                key={card.title}
                className="flex flex-col"
                style={{
                  padding: '24px',
                  gap: '20px',
                  borderRadius: '24px',
                  background: isDark ? '#0C5D56' : '#FFFFFF',
                  border: isDark ? '0.5px solid #FFF' : '1px solid #E4E4E7',
                  alignItems: 'flex-start',
                  alignSelf: 'stretch',
                }}
              >
                <RobotIcon color={isDark ? '#FFFFFF' : '#0C5D56'} />
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '30px',
                    color: isDark ? '#FFFFFF' : '#0C0E0D',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: isDark ? '#FFFFFF' : '#52525B',
                    margin: 0,
                    alignSelf: 'stretch',
                  }}
                >
                  {card.description}
                </p>
                <div
                  className="inline-flex items-center justify-center"
                  style={{
                    padding: '8px 15px',
                    gap: '10px',
                    borderRadius: '30px',
                    background: isDark ? '#FFFFFF' : '#E7EFF1',
                    marginTop: 'auto',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: '#52525B',
                    }}
                  >
                    {card.chip}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <Button
          className="hover:opacity-90"
          style={{
            display: 'flex',
            padding: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '8px',
            background: '#0C5D56',
            color: '#FFFFFF',
            fontFamily: FONT,
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            height: 'auto',
            border: 'none',
          }}
        >
          Create your first package
        </Button>
      </div>

      <style>{`
        .features-inner { padding: 24px; gap: 24px; }
        .features-heading {
          font-family: ${FONT};
          font-size: 30px;
          font-weight: 500;
          line-height: 38px;
          color: #0C0E0D;
          text-align: center;
          align-self: stretch;
        }
        .features-cards {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          align-self: stretch;
          width: 100%;
        }
        @media (min-width: 768px) {
          .features-inner { padding: 40px 80px; gap: 40px; }
          .features-heading { font-size: 48px; line-height: 60px; }
          .features-cards {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
          }
        }
      `}</style>
    </section>
  )
}