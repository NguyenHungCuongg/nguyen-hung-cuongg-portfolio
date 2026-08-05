import { SectionHeading } from "@/components/ui/SectionHeading";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { CardTabs } from "@/components/ui/CardTabs";
import { ExperienceTab } from "./journey/ExperienceTab";
import { EducationTab } from "./journey/EducationTab";
import { CertificatesTab } from "./journey/CertificatesTab";
import type { CardTabItem } from "@/components/ui/CardTabs";
import { BrowserSwap } from "@/components/ui/BrowserSwap";

const JOURNEY_TABS: CardTabItem[] = [
  { label: "Experience", content: <ExperienceTab /> },
  { label: "Education", content: <EducationTab /> },
  { label: "Certificates", content: <CertificatesTab /> },
];

const SWAP_IMAGES = [
  {
    id: "ai-power",
    src: "/images/journey/ai-power.png",
    alt: "AI Power Journey",
  },
  {
    id: "uit",
    src: "/images/journey/uit.jpg",
    alt: "University of Information Technology",
  },
  {
    id: "github-coursera",
    src: "/images/journey/github-coursera.jpg",
    alt: "GitHub Coursera Certificate",
  },
  {
    id: "web-udemy",
    src: "/images/journey/web-udemy.jpg",
    alt: "Web Udemy Certificate",
  },
];

export function Journey() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 border-t-[4px] border-nb-ink bg-nb-yellow py-8 md:py-8 overflow-hidden"
    >
      <div className="mx-auto w-full px-4 md:px-8 lg:px-16">
        <SectionHeading
          title="Trust me, I'm a Dev"
          className="mb-8 md:mb-12"
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full items-end">
          <AnimatedContent delay={0.2} direction="vertical" distance={60} className="w-full lg:w-[45%] flex-shrink-0 pb-8">
            <CardTabs tabs={JOURNEY_TABS} className="w-full max-w-full" />
          </AnimatedContent>
          <AnimatedContent delay={0.3} direction="horizontal" reverse={true} distance={80} className="hidden lg:block w-full lg:w-[55%] mb-[-10%] translate-x-6 lg:translate-x-16">
            <BrowserSwap
              images={SWAP_IMAGES}
              containerClassName="max-w-[750px] mx-auto"
              containerStyle={{ transform: "translate(0%,-30%)" }}
              delay={3000}
            />
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
