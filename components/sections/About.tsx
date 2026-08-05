"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import dynamic from "next/dynamic";
import { TextNote } from "./about/TextNote";
import { StickyNoteAccordion } from "./about/StickyNoteAccordion";
import { PolaroidDeck } from "./about/PolaroidDeck";
import { PinnedNote } from "./about/PinnedNote";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

const accordionItems = [
  {
    color: "bg-nb-blue",
    q: "Development",
    a: "I usually build backends with Spring Boot and frontends with React (dabbled in NestJS before, but it’s just not my vibe). I also picked up Flutter and Firebase while working on mobile projects at my previous job. Oh, and I’m comfortable with microservices, testing, and system monitoring too!",
  },
  {
    color: "bg-nb-yellow",
    q: "Design",
    a: "I do a bit of freelance design on the side. But before you guess—no, it's not UI/UX, I design book covers!",
  },
  {
    color: "bg-nb-green",
    q: "Education",
    a: "Studied at University of Information Technology (UIT), VNU-HCM.",
  },
];

const polaroidCards = [
  {
    src: "/images/about/manga-anime.jpg",
    caption: "Manga & Anime",
    rotate: "rotate-[-8deg]",
    offset: "left-0 sm:left-4 top-2 sm:top-6",
    zIndex: "z-10 hover:z-50",
  },
  {
    src: "/images/about/table-tenis.jpg",
    caption: "Table Tennis",
    rotate: "rotate-[4deg]",
    offset: "left-16 lg:left-64 md:left-42 top-0 sm:top-2",
    zIndex: "z-20 hover:z-50",
  },
  {
    src: "/images/about/gym-training.jpg",
    caption: "Gym Training",
    rotate: "rotate-[-2deg]",
    offset: "left-32 lg:left-120 md:left-90 top-4 sm:top-8",
    zIndex: "z-30 hover:z-50",
  },
  {
    src: "/images/about/piano.jpg",
    caption: "Drawing & Piano",
    rotate: "rotate-[6deg]",
    offset: "left-48 lg:left-[740px] md:left-[510px] top-6 sm:top-12",
    zIndex: "z-40 hover:z-50",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 bg-grid-pattern-light border-t-[4px] border-nb-ink bg-nb-pink pt-12 pb-24 overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full px-8 md:px-16">
        <SectionHeading title="WHO AM I?" className="mb-8 text-nb-ink" />

        <div className="flex flex-col gap-14 md:gap-18">
          {/* Section 1: Top (TextNote + Accordion) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <AnimatedContent
              direction="horizontal"
              distance={60}
              delay={0.1}
              className="w-full"
            >
              <TextNote />
            </AnimatedContent>
            <AnimatedContent
              direction="horizontal"
              reverse={true}
              distance={60}
              delay={0.2}
              className="w-full"
            >
              <StickyNoteAccordion items={accordionItems} />
            </AnimatedContent>
          </div>

          {/* Section 2: Middle (Contribution Graph) */}
          <FadeContent
            delay={0.3}
            duration={0.8}
            className="w-full flex flex-col items-center"
          >
            <PinnedNote subtitle="GitHub · Daily">
              <h3 className="font-space text-xl md:text-3xl font-bold uppercase tracking-[0.2em]">
                Code Contributions
              </h3>
            </PinnedNote>
            <div className="w-full max-w-fit mx-auto bg-nb-canvas border-[4px] border-nb-ink p-4 sm:p-8 md:p-10 shadow-[8px_8px_0_var(--nb-ink)] overflow-x-auto">
              <GitHubCalendar
                username="NguyenHungCuongg"
                colorScheme="light"
                blockSize={22}
                theme={{
                  light: [
                    "#f0f0f0",
                    "#a9d6b4",
                    "#69b37c",
                    "#469c61",
                    "#206335",
                  ],
                }}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
              />
            </div>
          </FadeContent>

          {/* Section 3: Bottom (Hobbies + PolaroidDeck) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
            <AnimatedContent
              direction="vertical"
              delay={0.15}
              className="lg:col-span-4"
            >
              <h3 className="font-syne scale-y-125 text-4xl md:text-6xl font-bold text-nb-ink mb-4">
                Beyond the Screen
              </h3>
              <p className="font-space text-sm md:text-lg text-nb-ink/90 font-medium leading-relaxed">
                Outside of technology, I spend my time on the piano, sketching,
                table tennis, working out, and anime.
              </p>
            </AnimatedContent>
            <div className="lg:col-span-8 w-full relative">
              <PolaroidDeck cards={polaroidCards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
