import { Button } from '@/components/ui/button'

type Card = {
  title: string
  description: string
  highlighted?: boolean
}

const CARDS: Card[] = [
  {
    title: 'GitHub-ready packages',
    description:
      'Create a clean repository structure without manually setting up every folder, file and README',
    highlighted: true,
  },
  {
    title: 'Less Setup Time',
    description:
      'Reuse proven setup packages or clone and adapt other setup files.',
  },
  {
    title: 'Easy to Ship',
    description:
      'Publish clean and organized package files. No manual work required.',
  },
  {
    title: 'Cleaner Agent behaviour',
    description:
      "Keep the agent's role, tone, rules, limits, workflow and Skils in one structured package.",
  },
]

const FONT_BODY = 'Geist, Inter, sans-serif'
const FONT_INTER = 'Inter, sans-serif'

function Pill() {
  return (
    <div
      className="inline-flex items-center"
      style={{
        alignSelf: 'flex-start',
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
          fontFamily: FONT_INTER,
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '20px',
          color: '#52525B',
        }}
      >
        WHY ANVILA
      </span>
    </div>
  )
}

function CtaButton({ widthStyle }: { widthStyle: string }) {
  return (
    <Button
      className="hover:opacity-90"
      style={{
        display: 'flex',
        width: widthStyle,
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '8px',
        background: '#0C5D56',
        color: '#FFFFFF',
        fontFamily: FONT_INTER,
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '24px',
        height: 'auto',
        border: 'none',
      }}
    >
      Try for Free
    </Button>
  )
}

export function WhyAnvila() {
  return (
    <section className="w-full" style={{ background: '#FFFFFF' }}>
      <div
        className="why-anvila-desktop mx-auto"
        style={{
          maxWidth: '1440px',
          padding: '80px',
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          rowGap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <Pill />
          <h2
            style={{
              fontFamily: FONT_INTER,
              fontSize: '48px',
              fontWeight: 500,
              lineHeight: '48px',
              letterSpacing: '-1.2px',
              color: '#0C0E0D',
              width: '479px',
              margin: 0,
            }}
          >
            Setting up AI agents is still messy.
          </h2>
          <p
            style={{
              fontFamily: FONT_INTER,
              fontSize: '17.9px',
              fontWeight: 400,
              lineHeight: '28px',
              color: '#52525B',
              width: '521px',
              margin: 0,
            }}
          >
            Developers and builders still rewrite the same agent setup, struggle
            with scattered prompts, and lack a clear structure for files that
            others can reuse.
          </p>
          <CtaButton widthStyle="287px" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '620px',
          }}
        >
          {CARDS.map((card, idx) => {
            const isTopRow = idx < 2
            return (
              <div
                key={card.title}
                style={{
                  display: 'flex',
                  height: '304px',
                  padding: '0 30px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '4px',
                  background: card.highlighted
                    ? 'rgba(16, 191, 171, 0.10)'
                    : '#FFFFFF',
                  borderBottom: isTopRow ? '1px solid #F0F0F0' : 'none',
                }}
              >
                <h3
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '38px',
                    color: '#1C1F25',
                    margin: 0,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: '#52525B',
                    textAlign: 'center',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                  }}
                >
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div
        className="why-anvila-mobile mx-auto flex w-full flex-col items-center"
        style={{
          padding: '48px 24px',
          gap: '24px',
        }}
      >
        <Pill />
        <h2
          style={{
            fontFamily: FONT_BODY,
            fontSize: '30px',
            fontWeight: 500,
            lineHeight: '38px',
            color: '#0C0E0D',
            textAlign: 'center',
            width: '319px',
            maxWidth: '100%',
            margin: 0,
          }}
        >
          Setting up AI agents is still messy.
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#52525B',
            textAlign: 'center',
            alignSelf: 'stretch',
            margin: 0,
          }}
        >
          Developers and builders still rewrite the same agent setup, struggle
          with scattered prompts, and lack a clear structure for files that
          others can reuse.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignSelf: 'stretch',
          }}
        >
          {CARDS.map((card, idx) => {
            const isTopRow = idx < 2
            return (
              <div
                key={card.title}
                style={{
                  display: 'flex',
                  padding: '24px 10px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '4px',
                  alignSelf: 'stretch',
                  background: card.highlighted
                    ? 'rgba(16, 191, 171, 0.10)'
                    : '#FFFFFF',
                  borderBottom: isTopRow ? '1px solid #F0F0F0' : 'none',
                }}
              >
                <h3
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1C1F25',
                    textAlign: 'center',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '10px',
                    fontWeight: 400,
                    color: '#52525B',
                    textAlign: 'center',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                  }}
                >
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>

        <CtaButton widthStyle="223px" />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .why-anvila-desktop { display: flex !important; }
          .why-anvila-mobile { display: none !important; }
        }
      `}</style>
    </section>
  )
}
