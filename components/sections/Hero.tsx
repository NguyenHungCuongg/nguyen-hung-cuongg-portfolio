import { Button } from "@/components/ui/Button";
import { CursorGrid } from "@/components/ui/CursorGrid";
import { CursorBadge } from "@/components/ui/CursorBadge";
import { AvatarGreeting } from "@/components/ui/AvatarGreeting";
import { PolaroidCard } from "@/components/ui/PolaroidCard";
import { InstaFrame } from "@/components/ui/InstaFrame";
import { Stamp } from "@/components/ui/Stamp";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import SplitText from "@/components/ui/SplitText";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

export function Hero() {
  return (
    <section className="relative flex min-h-[max(calc(104dvh-5rem),600px)] lg:min-h-[max(calc(130dvh-5rem),750px)] w-full items-center justify-center overflow-hidden bg-nb-canvas py-20 bg-grid-pattern">
      <CursorGrid />
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-12 relative z-10 flex flex-col items-center justify-center">
        {/* Main Typographic Composition */}
        <div className="relative flex flex-col items-center text-center select-none w-full max-w-5xl">
          {/* ── Avatar Greeting ── top-center before h1 */}
          <AvatarGreeting
            src="/images/hero/avatar.png"
            alt="Hello, I'm Cường"
            greeting="Hello, I'm Cường"
          />

          {/* ── Floating Element 1: Top Left ── */}
          {/* Square badge (original) + CursorBadge (cursor + new pill) as a unit */}
          <AnimatedContent
            delay={0.8}
            direction="horizontal"
            reverse={true}
            distance={40}
            className="hidden xl:flex absolute left-0 xl:-left-32 flex-col items-start gap-1 z-20 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-start gap-1">
              {/* Replaced with InstaFrame */}
              <InstaFrame
                className="-mt-16 ml-4"
                caption="UIT-HCM"
                dateStamp="15·09·23"
                imageUrl="/images/hero/uit.jpg"
                imageAlt="University of Information Technology, Ho Chi Minh City"
              />
              {/* Cursor + new pill badge move together */}
              <CursorBadge
                label="Dev"
                cursorColor="text-nb-pink"
                badgeColor="bg-nb-pink"
                badgeTextColor="text-nb-canvas"
                animationDelay="2s"
              />
            </div>
          </AnimatedContent>

          {/* ── Floating Element 2: Right Middle ── */}
          <AnimatedContent
            delay={0.9}
            direction="horizontal"
            distance={40}
            className="hidden xl:flex absolute -rotate-2 xl:top-1/3 xl:-right-60 flex-col items-start gap-1 z-20 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-1">
              {/* Replaced with PolaroidCard */}
              <div className="-mt-8">
                <PolaroidCard
                  caption="Ho Chi Minh City"
                  imageUrl="/images/hero/sai-gon.jpg"
                  imageAlt="Ho Chi Minh City"
                />
              </div>
              {/* Cursor + new pill badge move together */}
              <CursorBadge
                label="Based in ..."
                cursorColor="text-nb-yellow"
                badgeColor="bg-nb-yellow"
                badgeTextColor="text-nb-ink"
                animationDelay="1s"
                className="-ml-2 mt-4"
              />
            </div>
          </AnimatedContent>

          {/* ── Floating Element 3: Bottom Left ── */}
          <AnimatedContent
            delay={1.0}
            direction="vertical"
            distance={40}
            className="hidden md:flex absolute bottom-16 left-8 flex-col items-end gap-1 z-20 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-end gap-1">
              {/* Original square badge — unchanged */}
              <Stamp className="mb-8">Available</Stamp>
              {/* Cursor + new pill badge move together */}
              <CursorBadge
                label="@NguyenHungCuongg"
                cursorColor="text-nb-blue"
                badgeColor="bg-nb-blue"
                badgeTextColor="text-nb-canvas"
                animationDelay="0s"
                className="-ml-4"
              />
            </div>
          </AnimatedContent>

          {/* Typographic Core */}
          <h1 className="font-syne flex flex-col items-center justify-center leading-[0.95] tracking-tighter uppercase w-full">
            <SplitText
              tag="span"
              text="Creative"
              splitType="words"
              initialDelay={0}
              duration={0.6}
              from={{ opacity: 0, y: 30 }}
              className="text-[clamp(3.5rem,6vw,5rem)] font-bold text-nb-pink [text-shadow:4px_4px_0_var(--nb-ink)] mb-2 md:mb-0"
            />

            <SplitText
              tag="span"
              text="Software"
              splitType="words"
              initialDelay={100}
              duration={0.6}
              from={{ opacity: 0, y: 30 }}
              className="relative z-10 text-[clamp(4rem,7.5vw,6rem)] font-bold text-nb-ink bg-nb-yellow border-[4px] border-nb-ink px-6 py-0 shadow-[8px_8px_0_var(--nb-ink)] -rotate-2 my-2 md:my-0"
            />

            <SplitText
              tag="span"
              text="Engineer"
              splitType="words"
              initialDelay={200}
              duration={0.6}
              from={{ opacity: 0, y: 30 }}
              className="text-[clamp(4.5rem,9.5vw,8rem)] font-bold text-nb-canvas [-webkit-text-stroke:3px_var(--nb-ink)] [text-shadow:5px_5px_0_var(--nb-ink)] mt-2 md:mt-0"
            />

            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <SplitText
                tag="span"
                text="& Designer"
                splitType="words"
                delay={50}
                initialDelay={300}
                duration={0.6}
                from={{ opacity: 0, y: 30 }}
                className="text-[clamp(3.5rem,7vw,6rem)] font-bold text-nb-blue [text-shadow:4px_4px_0_var(--nb-ink)]"
              />
            </div>
          </h1>

          <FadeContent delay={600} duration={600}>
            <p className="mt-6 max-w-2xl font-space text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-nb-ink text-center">
              I build{" "}
              <span className="bg-nb-yellow px-1 text-nb-ink">
                high-performance
              </span>{" "}
              backends and interactive frontend applications.{" "}
              <span className="text-nb-orange">Clean</span> code,{" "}
              <span className="text-nb-blue px-1">bold</span> designs.
            </p>
          </FadeContent>

          <AnimatedContent
            delay={0.8}
            direction="vertical"
            distance={40}
            duration={0.5}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 w-full"
          >
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-nb-yellow shadow-[6px_6px_0_var(--nb-ink)] hover:shadow-[8px_8px_0_var(--nb-ink)] hover:-translate-y-1 text-lg"
            >
              View Projects
            </Button>
            <Button
              href="/gallery"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-nb-surface shadow-[6px_6px_0_var(--nb-ink)] hover:bg-nb-blue hover:text-nb-canvas hover:-translate-y-1 text-lg"
            >
              My Gallery
            </Button>
          </AnimatedContent>
        </div>
      </div>

      {/* Marquee Ribbon at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MarqueeRibbon />
      </div>
    </section>
  );
}
