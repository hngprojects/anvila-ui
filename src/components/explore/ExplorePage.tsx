import { HeroSection, CTASection } from "./ExploreSections";
import ExploreClient from "./ExploreClient";

export default function Explore() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Explore Reusable AI Agent Setup Packages"
        subtitle="Browse public Anvila packages for marketing, development, research, finance, and operations. Clone a setup, adapt the files, or use it as a starting point for your own agent pack"
      />

      <section className="bg-background">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-16 md:px-10 xl:px-20">
          <ExploreClient />
        </div>
      </section>

      <CTASection
        heading="Can't find the setup you need?"
        body="Describe the agent setup you want, and Anvila will help you turn it into a reusable package with files, Skills, and GitHub-ready structure."
        buttonText="Create your own package"
      />
    </main>
  );
}
