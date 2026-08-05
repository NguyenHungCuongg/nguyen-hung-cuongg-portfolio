// NOTE: This file exists to satisfy Next.js App Router requirements.
// The actual home page is rendered via app/(main)/page.tsx + app/(main)/layout.tsx
// which provide the Navbar and Footer. Next.js should resolve (main)/page.tsx
// for the "/" route. If this file causes a conflict, it should be deleted.
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <div className="flex flex-col">
          <Hero />
          <About />
          <Projects />
          <Journey />
          <Skills />
        </div>
      </main>
      <Footer />
    </div>
  );
}
