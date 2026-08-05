import { SectionHeading } from "@/components/ui/SectionHeading";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { skills } from "@/data/skills";

const logos = skills.map((skill) => ({
  src: skill.iconUrl,
  alt: skill.name,
  title: skill.name,
}));

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t-[4px] border-nb-ink bg-nb-ink py-16 md:py-24"
    >
      <div className="mx-auto w-full px-4 md:px-8 lg:px-12">
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <SectionHeading
            title="Things I Work With."
            className="text-nb-pink"
          />
          <FadeContent delay={0.25} duration={0.6}>
            <p className="max-w-2xl font-space text-xl text-nb-canvas md:text-3xl">
              The tech stack and tools behind my{" "}
              <span className="text-nb-green">daily</span> commits and{" "}
              <span className="text-nb-yellow">late-night</span> debugging
              sessions.
            </p>
          </FadeContent>
        </div>

        <div className="flex flex-col gap-12">
          <AnimatedContent delay={0.4} direction="vertical" distance={40}>
            <LogoLoop
              logos={logos}
              speed={80}
              logoHeight={64}
              gap={36}
              pauseOnHover={false}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--nb-ink)"
              ariaLabel="Tech stack icons row 1"
            />
          </AnimatedContent>
          <AnimatedContent delay={0.5} direction="vertical" distance={40}>
            <LogoLoop
              logos={[...logos].reverse()}
              speed={80}
              direction="right"
              logoHeight={64}
              gap={36}
              pauseOnHover={false}
              scaleOnHover
              fadeOut
              fadeOutColor="var(--nb-ink)"
              ariaLabel="Tech stack icons row 2"
            />
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
