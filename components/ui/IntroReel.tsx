"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "@phosphor-icons/react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Keep in sync with the inline script in app/layout.tsx
const STORAGE_KEY = "n4c-intro-seen";

const FEATURED_STACK = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Redis",
  "RabbitMQ",
  "Docker",
  "Next.js",
  "TypeScript",
];

const REPLAY_EVENT = "n4c:replay-intro";

const pad = (value: number) => String(value).padStart(2, "0");

export const replayIntro = () => window.dispatchEvent(new Event(REPLAY_EVENT));

export function IntroReel() {
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    const handleReplay = () => {
      delete document.documentElement.dataset.intro;
      setReplayCount((count) => count + 1);
    };
    window.addEventListener(REPLAY_EVENT, handleReplay);
    return () => window.removeEventListener(REPLAY_EVENT, handleReplay);
  }, []);

  // A new key remounts the player so the timeline starts from scratch
  return <IntroPlayer key={replayCount} isReplay={replayCount > 0} />;
}

function IntroPlayer({ isReplay }: { isReplay: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      let hasSeen = false;
      try {
        hasSeen = sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch {}
      // A replay is user-initiated, so it plays even with reduced motion
      const shouldSkip =
        hasSeen || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!isReplay && shouldSkip) {
        setIsDone(true);
        return;
      }

      const html = document.documentElement;
      html.style.overflow = "hidden";

      const finish = () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        html.style.overflow = "";
        setIsDone(true);
      };

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
      timelineRef.current = tl;

      // 1 — N4C stamp on a yellow wipe
      tl.to(".ir-s1", { scaleX: 1, duration: 0.6, ease: "expo.inOut" })
        .from(".ir-s1-stamp", { scale: 2, autoAlpha: 0, duration: 0.45, ease: "back.out(2)" }, "-=0.1")
        .from(".ir-s1-shadow", { x: -12, y: -12, duration: 0.2, ease: "power2.out" })
        .from(".ir-s1-label", { y: 16, autoAlpha: 0, duration: 0.35 }, "<")

        // 2 — name + role
        .set(".ir-s2", { autoAlpha: 1 }, "+=0.25")
        .to(".ir-s1", { yPercent: -100, duration: 0.6, ease: "expo.inOut" }, "<")
        .from(".ir-s2-line", { yPercent: 110, duration: 0.7, stagger: 0.08 }, "-=0.25")
        .from(".ir-s2-tag", { scaleX: 0, transformOrigin: "left center", duration: 0.45, ease: "expo.inOut" }, "-=0.4")
        .to(".ir-s2-line", { yPercent: -110, duration: 0.45, stagger: 0.04, ease: "expo.in" }, "+=0.5")
        .to(".ir-s2-tag", { autoAlpha: 0, duration: 0.2 }, "<")

        // 3 — stack
        .set(".ir-s3", { autoAlpha: 1 })
        .from(".ir-s3-label", { y: 16, autoAlpha: 0, duration: 0.3 })
        .from(".ir-s3-tag", { scale: 1.6, autoAlpha: 0, duration: 0.35, stagger: 0.07, ease: "back.out(2)" }, "<")
        .to(".ir-s3-tag, .ir-s3-label", { y: -40, autoAlpha: 0, duration: 0.25, stagger: 0.02, ease: "power2.in" }, "+=0.35")

        // 4 — project deck
        .set(".ir-s4", { autoAlpha: 1 })
        .from(".ir-s4-label", { y: 16, autoAlpha: 0, duration: 0.3 })
        .from(".ir-s4-card", { x: () => window.innerWidth, duration: 0.45, stagger: 0.3 }, "<")
        .to(".ir-s4-card, .ir-s4-label", { yPercent: -40, autoAlpha: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" }, "+=0.4")

        // 5 — headline lockup
        .set(".ir-s5", { autoAlpha: 1 })
        .from(".ir-s5-title", { yPercent: 110, duration: 0.7 })
        .from(".ir-s5-bar", { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "expo.inOut" }, "-=0.4")
        .from(".ir-s5-tagline", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.3")

        // Exit — ink sheet covers, then lifts off to reveal the site
        .addLabel("exit", "+=0.7")
        .to(".ir-skip", { autoAlpha: 0, duration: 0.2 }, "exit")
        .to(".ir-wipe", { yPercent: 0, duration: 0.5, ease: "expo.in" }, "exit")
        .to(rootRef.current, { yPercent: -100, duration: 0.6, ease: "expo.inOut" });

      tl.fromTo(".ir-progress", { scaleX: 0 }, { scaleX: 1, duration: tl.labels.exit, ease: "none" }, 0);

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: rootRef },
  );

  const skip = () => {
    const tl = timelineRef.current;
    if (tl && tl.time() < tl.labels.exit) tl.seek("exit");
  };

  if (isDone) return null;

  return (
    <div
      ref={rootRef}
      data-replay={isReplay || undefined}
      role="region"
      aria-label="Portfolio intro"
      className="intro-reel fixed inset-0 z-[100] overflow-hidden bg-nb-canvas bg-grid-pattern text-nb-ink"
    >
      {/* 2 — name + role */}
      <div className="ir-s2 invisible absolute inset-0 flex flex-col justify-center px-6 md:px-16">
        <span className="mb-4 block overflow-hidden">
          <span className="ir-s2-line block font-mono text-sm font-semibold uppercase tracking-[0.2em] md:text-base">
            {"// Hello, I'm"}
          </span>
        </span>
        {["Nguyen", "Hung Cuong"].map((line) => (
          <span key={line} className="block overflow-hidden">
            <span className="ir-s2-line block font-syne text-[clamp(3.25rem,13vw,12rem)] font-extrabold uppercase leading-[0.95]">
              {line}
            </span>
          </span>
        ))}
        <span className="ir-s2-tag mt-6 self-start border-[3px] border-nb-ink bg-nb-yellow px-4 py-2 font-mono text-sm font-semibold uppercase shadow-nb md:text-lg">
          Software Engineer · Ho Chi Minh City
        </span>
      </div>

      {/* 3 — stack */}
      <div className="ir-s3 invisible absolute inset-0 flex flex-col items-center justify-center gap-8 px-6">
        <p className="ir-s3-label font-mono text-sm font-semibold uppercase tracking-[0.2em] md:text-base">
          01 — Stack
        </p>
        <ul className="flex max-w-4xl flex-wrap justify-center gap-3 md:gap-5">
          {FEATURED_STACK.map((name, index) => (
            <li
              key={name}
              className={cn(
                "ir-s3-tag border-[3px] border-nb-ink px-4 py-2 font-mono text-base font-semibold shadow-nb md:px-6 md:py-3 md:text-2xl",
                index % 3 === 0 ? "bg-nb-yellow" : "bg-nb-surface",
              )}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* 4 — project deck */}
      <div className="ir-s4 invisible absolute inset-0 flex flex-col items-center justify-center gap-8 px-6">
        <p className="ir-s4-label font-mono text-sm font-semibold uppercase tracking-[0.2em] md:text-base">
          02 — Selected work
        </p>
        <div className="relative h-56 w-full max-w-2xl md:h-64">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="ir-s4-card absolute flex h-full w-[calc(100%-2.25rem)] flex-col justify-between border-4 border-nb-ink bg-nb-surface p-6 shadow-nb-lg md:p-8"
              style={{ top: index * 12, left: index * 12 }}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-xs font-semibold uppercase md:text-sm">
                <span className="border-2 border-nb-ink bg-nb-yellow px-2 py-1">
                  {pad(index + 1)} / {pad(projects.length)}
                </span>
                <span>{project.period}</span>
              </div>
              <p className="font-syne text-[clamp(1.5rem,4.5vw,2.75rem)] font-extrabold leading-tight">
                {project.name}
              </p>
              <p className="font-mono text-xs md:text-sm">{project.techStack.join(" / ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5 — headline lockup */}
      <div className="ir-s5 invisible absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="block overflow-hidden">
          <span className="ir-s5-title block font-syne text-[clamp(2.75rem,10vw,9rem)] font-extrabold uppercase leading-[0.95]">
            Software
            <br />
            Engineer
          </span>
        </span>
        <span className="ir-s5-bar mt-5 block h-4 w-40 border-[3px] border-nb-ink bg-nb-yellow md:w-64" />
        <p className="ir-s5-tagline mt-6 max-w-xl text-lg font-medium md:text-2xl">
          Building scalable backend systems and modern applications.
        </p>
      </div>

      {/* 1 — N4C stamp (on top, wipes away to reveal scene 2) */}
      <div
        className="ir-s1 absolute inset-0 flex origin-left flex-col items-center justify-center gap-8 bg-nb-yellow"
        style={{ transform: "scaleX(0)" }}
      >
        <div className="ir-s1-stamp relative">
          <div className="ir-s1-shadow absolute left-3 top-3 h-full w-full bg-nb-ink" />
          <div className="relative border-4 border-nb-ink bg-nb-surface px-8 py-4 font-syne text-[clamp(4rem,14vw,10rem)] font-extrabold leading-none md:px-12 md:py-6">
            N4C
          </div>
        </div>
        <p className="ir-s1-label font-mono text-sm font-semibold uppercase tracking-[0.3em] md:text-base">
          Nguyen Hung Cuong · Portfolio
        </p>
      </div>

      <div className="ir-wipe absolute inset-0 bg-nb-ink" style={{ transform: "translateY(100%)" }} />

      <div
        className="ir-progress absolute bottom-0 left-0 h-2 w-full origin-left bg-nb-ink"
        style={{ transform: "scaleX(0)" }}
      />

      <button
        type="button"
        onClick={skip}
        className="ir-skip absolute bottom-6 right-6 z-10 flex h-12 items-center gap-2 border-[3px] border-nb-ink bg-nb-surface px-5 font-bold uppercase shadow-nb transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb-lg focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        Skip intro
        <ArrowRight weight="bold" aria-hidden />
      </button>
    </div>
  );
}
