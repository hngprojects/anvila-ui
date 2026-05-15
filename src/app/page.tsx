import Navbar from '@/components/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { WhyAnvila } from '@/components/landing/why-anvila'
import { Pricing } from '@/components/landing/pricing'
import { FinalCTA } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <WhyAnvila />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
