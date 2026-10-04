"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Keep in sync with the inline script in app/layout.tsx
const STORAGE_KEY = "n4c-intro-seen";
const REPLAY_EVENT = "n4c:replay-intro";

const BALL_SIZE = 80;
const NAME = "CUONG";
const TILE_COLORS = ["bg-nb-orange", "bg-nb-blue text-nb-cream", "bg-nb-pink", "bg-nb-green", "bg-nb-cream"];
const STRIPE_COLORS = ["bg-nb-orange", "bg-nb-blue", "bg-nb-pink", "bg-nb-green", "bg-nb-cream"];
const SHAPE_COLORS = ["bg-nb-yellow", "bg-nb-orange", "bg-nb-blue", "bg-nb-pink", "bg-nb-green"];
const RING_COLORS = ["border-nb-orange", "border-nb-blue", "border-nb-pink"];
const BLIND_TOKENS = ["--nb-yellow", "--nb-blue", "--nb-pink", "--nb-green", "--nb-cream", "--nb-orange"];

const SHAPE_ROWS = 4;
const SHAPE_COLUMNS = 6;
const SHAPE_CLIPS = [
  undefined, // circle (rounded-full)
  undefined, // square
  "polygon(50% 0, 100% 100%, 0 100%)",
  "polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%)",
  "circle(50% at 50% 100%)",
];

const WORDS = [
  { text: "THINK.", panel: "bg-nb-blue text-nb-cream" },
  { text: "CODE.", panel: "bg-nb-orange text-nb-ink" },
  { text: "DESIGN.", panel: "bg-nb-pink text-nb-ink" },
  { text: "SHIP.", panel: "bg-nb-green text-nb-ink" },
];
const WORD_WIPES: gsap.TweenVars[] = [{ xPercent: -100 }, { yPercent: -100 }, { xPercent: 100 }, { yPercent: 100 }];
const WORD_CHAR_FX: gsap.TweenVars[] = [
  { scale: 0, duration: 0.35, stagger: 0.04, ease: "back.out(3)" },
  { x: -120, skewX: 40, autoAlpha: 0, duration: 0.35, stagger: 0.04, ease: "expo.out" },
  { y: -220, rotation: gsap.utils.random(-90, 90, 1, true), autoAlpha: 0, duration: 0.45, stagger: { each: 0.03, from: "random" }, ease: "bounce.out" },
  { scale: 4, autoAlpha: 0, duration: 0.4, stagger: 0.03, ease: "expo.out" },
];
const WORD_STEP = 0.45;

const RIBBONS = [
  { text: "SOFTWARE ENGINEER ✦ ", className: "top-[14%] bg-nb-yellow text-nb-ink", rotate: -8 },
  { text: "CODE ✦ DESIGN ✦ ", className: "top-[44%] bg-nb-ink text-nb-cream", rotate: 6 },
  { text: "NGUYEN HUNG CUONG ✦ ", className: "top-[72%] bg-nb-pink text-nb-ink", rotate: -4 },
];

// Scale an element (from its centre) until it covers the whole viewport.
// ponytail: 1.3 safety factor absorbs the desktop `body { zoom }` mismatch between rects and viewport.
const coverScale = (element: Element) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const reach = Math.max(
    Math.hypot(centerX, centerY),
    Math.hypot(window.innerWidth - centerX, centerY),
    Math.hypot(centerX, window.innerHeight - centerY),
    Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY),
  );
  return ((reach * 2) / rect.width) * 1.3;
};

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

      const tokens = getComputedStyle(html);
      const blindColors = BLIND_TOKENS.map((token) => tokens.getPropertyValue(token).trim());
      const shapeGrid = { grid: [SHAPE_ROWS, SHAPE_COLUMNS] as [number, number] };

      const tl = gsap.timeline({ onComplete: finish });
      timelineRef.current = tl;

      // A — ball drops, squashes, bounces, then bursts to fill the screen
      tl.set(".a-scene", { autoAlpha: 1 })
        .fromTo(".a-ball", { y: () => -window.innerHeight * 0.65 }, { y: 0, duration: 0.45, ease: "power2.in" })
        .addLabel("impact")
        .to(".a-ball", { scaleX: 1.5, scaleY: 0.55, duration: 0.08, ease: "power1.out" }, "impact")
        .fromTo(".a-ring", { scale: 0, autoAlpha: 1 }, { scale: 1, duration: 0.8, stagger: 0.07, ease: "expo.out" }, "impact")
        .to(".a-ring", { autoAlpha: 0, duration: 0.4, stagger: 0.07 }, "impact+=0.35")
        .to(".a-ball", { y: -130, scaleX: 0.85, scaleY: 1.2, duration: 0.28, ease: "power2.out" }, "impact+=0.08")
        .to(".a-ball", { y: 0, scaleX: 1, scaleY: 1, duration: 0.24, ease: "power2.in" })
        .to(".a-ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.06 })
        .set(".a-ball", { transformOrigin: "50% 50%" })
        .to(".a-ball", { scale: (_index: number, ball: Element) => coverScale(ball), duration: 0.5, ease: "expo.in" })

        // B — name tiles flip up, wave, then fall with gravity
        .addLabel("b", "-=0.1")
        .set(".b-scene", { autoAlpha: 1 }, "b")
        .from(".b-tile", { rotationX: -100, yPercent: 60, autoAlpha: 0, transformPerspective: 600, transformOrigin: "50% 100%", duration: 0.55, stagger: 0.07, ease: "back.out(2)" }, "b")
        .from(".b-label", { y: 20, autoAlpha: 0, duration: 0.3, ease: "expo.out" }, "b+=0.2")
        .to(".b-tile", { y: -36, duration: 0.18, stagger: 0.05, ease: "power2.out", yoyo: true, repeat: 1 }, ">-0.05")
        .to(".b-tile", { y: () => window.innerHeight, rotation: gsap.utils.random(-120, 120, 1, true), duration: 0.55, stagger: { each: 0.04, from: "random" }, ease: "power3.in" }, ">+0.1")
        .to(".b-label", { autoAlpha: 0, duration: 0.2 }, "<")

        // C — colour stripes wipe, then a shape grid ripples and collapses
        .addLabel("c", "<0.25")
        .to(".c-stripe", { scaleY: 1, duration: 0.35, stagger: 0.05, ease: "expo.inOut" }, "c")
        .set(".a-scene, .b-scene", { autoAlpha: 0 })
        .set(".c-grid", { autoAlpha: 1 })
        .set(".c-stripe", { transformOrigin: "50% 0%" })
        .to(".c-stripe", { scaleY: 0, duration: 0.35, stagger: 0.05, ease: "expo.inOut" })
        .from(".c-shape", { scale: 0, rotation: -180, duration: 0.45, stagger: { ...shapeGrid, from: "center", amount: 0.35 }, ease: "back.out(2)" }, "<0.1")
        .to(".c-shape", { rotation: 180, duration: 0.4, stagger: { ...shapeGrid, from: "start", amount: 0.3 }, ease: "back.inOut(2)" }, "-=0.15")
        .to(".c-shape", {
          x: (_index: number, shape: Element) => {
            const rect = shape.getBoundingClientRect();
            return window.innerWidth / 2 - (rect.left + rect.width / 2);
          },
          y: (_index: number, shape: Element) => {
            const rect = shape.getBoundingClientRect();
            return window.innerHeight / 2 - (rect.top + rect.height / 2);
          },
          scale: 0,
          duration: 0.4,
          stagger: { ...shapeGrid, from: "edges", amount: 0.2 },
          ease: "expo.in",
        }, "-=0.05")
        .addLabel("d", "-=0.15");

      // D — kinetic words, each panel wipes in from a new side with its own letter treatment
      WORDS.forEach((_word, index) => {
        const at = `d+=${index * WORD_STEP}`;
        tl.set(`.d-panel-${index}`, { autoAlpha: 1 }, at)
          .from(`.d-panel-${index}`, { ...WORD_WIPES[index], duration: 0.4, ease: "expo.out" }, at)
          .from(`.d-panel-${index} .d-char`, WORD_CHAR_FX[index], `d+=${index * WORD_STEP + 0.1}`);
      });

      // E — diagonal ribbons slide across, N4C stamp springs in on top
      tl.addLabel("e", `d+=${WORDS.length * WORD_STEP}`)
        .set(".e-scene", { autoAlpha: 1 }, "e")
        .from(".e-ribbon", { scaleY: 0, duration: 0.35, stagger: 0.08, ease: "expo.out" }, "e")
        .fromTo(".e-track", { xPercent: (index: number) => (index % 2 ? -50 : 0) }, { xPercent: (index: number) => (index % 2 ? 0 : -50), duration: 2.4, ease: "none" }, "e")
        .from(".e-stamp", { scale: 0, rotation: -25, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "e+=0.25")
        .from(".e-stamp-shadow", { x: -12, y: -12, duration: 0.2, ease: "power2.out" }, "e+=0.6")

        // Exit — the orange dot swallows the screen, then colour blinds slide away to reveal the site
        .addLabel("exit", "e+=1")
        .to(".ir-skip, .ir-progress", { autoAlpha: 0, duration: 0.2 }, "exit")
        .to(".f-dot", { scale: (_index: number, dot: Element) => coverScale(dot), duration: 0.5, ease: "expo.in" }, "exit")
        .set(".f-blind", { autoAlpha: 1 })
        .set(".a-scene, .b-scene, .c-grid, .d-panel, .e-scene", { autoAlpha: 0 })
        .set(rootRef.current, { backgroundColor: "transparent" })
        .to(".f-blind", { backgroundColor: (index: number) => blindColors[index], duration: 0.12, stagger: 0.03 })
        .to(".f-blind", { xPercent: (index: number) => (index % 2 ? 100 : -100), duration: 0.55, stagger: 0.05, ease: "expo.in" }, ">0.05");

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
      className="intro-reel fixed inset-0 z-[100] overflow-hidden bg-nb-ink text-nb-ink"
    >
      {/* A — bounce & burst */}
      <div className="a-scene invisible absolute inset-0">
        {RING_COLORS.map((color) => (
          <div
            key={color}
            className={cn("a-ring absolute left-1/2 top-1/2 -ml-[35vmin] -mt-[35vmin] size-[70vmin] rounded-full border-[6px]", color)}
          />
        ))}
        <div
          className="a-ball absolute left-1/2 top-1/2 rounded-full bg-nb-yellow"
          style={{ width: BALL_SIZE, height: BALL_SIZE, marginLeft: -BALL_SIZE / 2, marginTop: -BALL_SIZE / 2, transformOrigin: "50% 100%" }}
        />
      </div>

      {/* B — name tiles */}
      <div className="b-scene invisible absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="b-label font-mono text-sm font-semibold uppercase tracking-[0.3em] md:text-lg">{"hello, i'm"}</p>
        <div className="flex gap-2 md:gap-4">
          {NAME.split("").map((letter, index) => (
            <span
              key={index}
              className={cn(
                "b-tile flex size-[clamp(3.5rem,15vmin,9rem)] items-center justify-center border-4 border-nb-ink font-syne text-[clamp(2.25rem,10vmin,6rem)] font-extrabold shadow-nb",
                TILE_COLORS[index % TILE_COLORS.length],
              )}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* C — shape grid */}
      <div className="c-grid invisible absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-6 gap-[3vmin]">
          {Array.from({ length: SHAPE_ROWS * SHAPE_COLUMNS }, (_, index) => {
            const shapeType = index % SHAPE_CLIPS.length;
            return (
              <div
                key={index}
                className={cn(
                  "c-shape size-[11vmin]",
                  SHAPE_COLORS[(index + Math.floor(index / SHAPE_COLUMNS)) % SHAPE_COLORS.length],
                  shapeType === 0 && "rounded-full",
                )}
                style={{ clipPath: SHAPE_CLIPS[shapeType] }}
              />
            );
          })}
        </div>
      </div>

      {/* C — colour stripes */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-5">
        {STRIPE_COLORS.map((color) => (
          <div key={color} className={cn("c-stripe h-full", color)} style={{ transform: "scaleY(0)", transformOrigin: "50% 100%" }} />
        ))}
      </div>

      {/* D — kinetic words */}
      {WORDS.map((word, index) => (
        <div
          key={word.text}
          className={cn(`d-panel d-panel-${index} invisible absolute inset-0 flex items-center justify-center overflow-hidden`, word.panel)}
        >
          <p className="font-syne text-[clamp(3rem,15vw,15rem)] font-extrabold leading-none">
            {word.text.split("").map((char, charIndex) => (
              <span key={charIndex} className="d-char inline-block">
                {char}
              </span>
            ))}
          </p>
        </div>
      ))}

      {/* E — ribbons + stamp */}
      <div className="e-scene invisible absolute inset-0">
        {RIBBONS.map((ribbon) => (
          <div
            key={ribbon.text}
            className={cn("e-ribbon absolute -left-1/4 w-[150%] overflow-hidden border-y-4 border-nb-ink py-2 md:py-3", ribbon.className)}
            style={{ transform: `rotate(${ribbon.rotate}deg)` }}
          >
            <div className="e-track flex w-max whitespace-nowrap font-syne text-2xl font-extrabold md:text-4xl">
              <span>{ribbon.text.repeat(8)}</span>
              <span>{ribbon.text.repeat(8)}</span>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="e-stamp relative">
            <div className="e-stamp-shadow absolute left-3 top-3 h-full w-full bg-nb-ink" />
            <div className="relative border-4 border-nb-ink bg-nb-cream px-8 py-4 font-syne text-[clamp(4rem,14vw,10rem)] font-extrabold leading-none md:px-12 md:py-6">
              N4C
              <span className="f-dot ml-[0.06em] inline-block size-[0.2em] rounded-full bg-nb-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Exit — blinds */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        {BLIND_TOKENS.map((token) => (
          <div key={token} className="f-blind invisible flex-1 bg-nb-orange" />
        ))}
      </div>

      <div
        className="ir-progress absolute bottom-0 left-0 h-2 w-full origin-left border-t-2 border-nb-ink bg-nb-surface"
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
