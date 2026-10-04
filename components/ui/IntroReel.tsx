"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Keep in sync with the inline script in app/layout.tsx
const STORAGE_KEY = "n4c-intro-seen";
const REPLAY_EVENT = "n4c:replay-intro";

const BALL_SIZE = 80;
const NAME = "CUONG";
const TILE_COLORS = [
  "bg-nb-orange",
  "bg-nb-blue text-nb-cream",
  "bg-nb-pink",
  "bg-nb-green",
  "bg-nb-cream",
];
const STRIPE_COLORS = [
  "bg-nb-orange",
  "bg-nb-blue",
  "bg-nb-pink",
  "bg-nb-green",
  "bg-nb-cream",
];
const SHAPE_COLORS = [
  "bg-nb-yellow",
  "bg-nb-orange",
  "bg-nb-blue",
  "bg-nb-pink",
  "bg-nb-green",
];
const RING_COLORS = ["border-nb-orange", "border-nb-blue", "border-nb-pink"];
const BLIND_TOKENS = [
  "--nb-yellow",
  "--nb-blue",
  "--nb-pink",
  "--nb-green",
  "--nb-cream",
  "--nb-orange",
];

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
const WORD_WIPES: gsap.TweenVars[] = [
  { xPercent: -100 },
  { yPercent: -100 },
  { xPercent: 100 },
  { yPercent: 100 },
];
const WORD_CHAR_FX: gsap.TweenVars[] = [
  { scale: 0, duration: 0.35, stagger: 0.04, ease: "back.out(3)" },
  {
    x: -120,
    skewX: 40,
    autoAlpha: 0,
    duration: 0.35,
    stagger: 0.04,
    ease: "expo.out",
  },
  {
    y: -220,
    rotation: gsap.utils.random(-90, 90, 1, true),
    autoAlpha: 0,
    duration: 0.45,
    stagger: { each: 0.03, from: "random" },
    ease: "bounce.out",
  },
  { scale: 4, autoAlpha: 0, duration: 0.4, stagger: 0.03, ease: "expo.out" },
];
const WORD_STEP = 0.42;

const RIBBONS = [
  {
    text: "SOFTWARE ENGINEER ✦ ",
    className: "top-[14%] bg-nb-yellow text-nb-ink",
    rotate: -8,
  },
  {
    text: "CODE ✦ DESIGN ✦ ",
    className: "top-[44%] bg-nb-ink text-nb-cream",
    rotate: 6,
  },
  {
    text: "NGUYEN HUNG CUONG ✦ ",
    className: "top-[72%] bg-nb-pink text-nb-ink",
    rotate: -4,
  },
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
  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      let hasSeen = false;
      try {
        hasSeen = sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch {}
      // A replay is user-initiated, so it plays even with reduced motion
      const shouldSkip =
        hasSeen ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const blindColors = BLIND_TOKENS.map((token) =>
        tokens.getPropertyValue(token).trim(),
      );
      const shapeGrid = {
        grid: [SHAPE_ROWS, SHAPE_COLUMNS] as [number, number],
      };

      // Short pre-roll on the blank ink frame so the drop does not compete with page hydration
      const tl = gsap.timeline({ delay: 0.3, onComplete: finish });

      // A — ball stretches as it falls, squashes on impact, rebounds and swells to fill the screen.
      // Squash/stretch tweens overlap the movement so the ball never stops dead between steps.
      tl.set(".a-scene", { autoAlpha: 1 })
        .fromTo(
          ".a-ball",
          { y: () => -window.innerHeight * 0.75, scaleX: 0.8, scaleY: 1.25 },
          { y: 0, duration: 0.38, ease: "power2.in" },
        )
        .addLabel("impact")
        .to(
          ".a-ball",
          { scaleX: 1.45, scaleY: 0.6, duration: 0.1, ease: "power2.out" },
          "impact",
        )
        .fromTo(
          ".a-ring",
          { scale: 0, autoAlpha: 1 },
          { scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" },
          "impact",
        )
        .to(
          ".a-ring",
          { autoAlpha: 0, duration: 0.35, stagger: 0.06, ease: "sine.out" },
          "impact+=0.3",
        )
        .to(
          ".a-ball",
          {
            y: -90,
            scaleX: 0.9,
            scaleY: 1.12,
            duration: 0.24,
            ease: "power2.out",
          },
          "impact+=0.08",
        )
        .set(".a-ball", { transformOrigin: "50% 50%" }, "impact+=0.26")
        .to(
          ".a-ball",
          {
            y: 0,
            scale: (_index: number, ball: Element) => coverScale(ball),
            duration: 0.45,
            ease: "power2.in",
          },
          "impact+=0.26",
        )

        // B — name tiles flip up, ripple, then dip (anticipation) before dropping out
        .addLabel("b", "-=0.1")
        .set(".b-scene", { autoAlpha: 1 }, "b")
        // Flip, ripple and drop are scheduled so each tile finishes one move before the next starts:
        // overlapping tweens on the same `y` fight each other and read as jerky.
        // Perspective and origin go in a set: inside .from() GSAP would tween them too (perspective 1400px → 0 warps the tiles)
        .set(
          ".b-tile",
          { transformPerspective: 1400, transformOrigin: "50% 100%" },
          "b",
        )
        .from(
          ".b-tile",
          {
            rotationX: -75,
            y: 60,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
          },
          "b",
        )
        .from(
          ".b-label",
          { y: 16, autoAlpha: 0, duration: 0.35, ease: "power3.out" },
          "b+=0.15",
        )
        .to(
          ".b-tile",
          {
            y: -24,
            duration: 0.13,
            stagger: 0.04,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          "b+=0.55",
        )
        .to(
          ".b-tile",
          {
            y: () => window.innerHeight,
            rotation: gsap.utils.random(-90, 90, 1, true),
            duration: 0.5,
            stagger: 0.04,
            ease: "back.in(1.6)",
          },
          "b+=0.82",
        )
        .to(
          ".b-label",
          { y: -16, autoAlpha: 0, duration: 0.25, ease: "power2.in" },
          "<",
        )

        // C — colour stripes sweep through, then a shape grid ripples and collapses
        .addLabel("c", "<0.25")
        .to(
          ".c-stripe",
          { scaleY: 1, duration: 0.32, stagger: 0.04, ease: "power4.inOut" },
          "c",
        )
        .set(".a-scene, .b-scene", { autoAlpha: 0 })
        .set(".c-grid", { autoAlpha: 1 })
        .set(".c-stripe", { transformOrigin: "50% 0%" })
        .to(".c-stripe", {
          scaleY: 0,
          duration: 0.32,
          stagger: 0.04,
          ease: "power4.inOut",
        })
        .from(
          ".c-shape",
          {
            scale: 0,
            rotation: -180,
            duration: 0.45,
            stagger: { ...shapeGrid, from: "center", amount: 0.3 },
            ease: "back.out(1.7)",
          },
          "<0.08",
        )
        .to(
          ".c-shape",
          {
            rotation: 180,
            duration: 0.4,
            stagger: { ...shapeGrid, from: "start", amount: 0.25 },
            ease: "power2.inOut",
          },
          "-=0.2",
        )
        .to(
          ".c-shape",
          {
            x: (_index: number, shape: Element) => {
              const rect = shape.getBoundingClientRect();
              return window.innerWidth / 2 - (rect.left + rect.width / 2);
            },
            y: (_index: number, shape: Element) => {
              const rect = shape.getBoundingClientRect();
              return window.innerHeight / 2 - (rect.top + rect.height / 2);
            },
            scale: 0,
            duration: 0.35,
            stagger: { ...shapeGrid, from: "edges", amount: 0.15 },
            ease: "back.in(1.4)",
          },
          "-=0.05",
        )
        .addLabel("d", "-=0.15");

      // D — kinetic words, each panel wipes in from a new side with its own letter treatment
      WORDS.forEach((_word, index) => {
        const at = `d+=${index * WORD_STEP}`;
        tl.set(`.d-panel-${index}`, { autoAlpha: 1 }, at)
          .from(
            `.d-panel-${index}`,
            { ...WORD_WIPES[index], duration: 0.4, ease: "expo.out" },
            at,
          )
          .from(
            `.d-panel-${index} .d-char`,
            WORD_CHAR_FX[index],
            `d+=${index * WORD_STEP + 0.1}`,
          );
      });

      // E — diagonal ribbons slide across, N4C stamp springs in on top
      tl.addLabel("e", `d+=${WORDS.length * WORD_STEP}`)
        .set(".e-scene", { autoAlpha: 1 }, "e")
        .from(
          ".e-ribbon",
          { scaleY: 0, duration: 0.35, stagger: 0.08, ease: "expo.out" },
          "e",
        )
        .fromTo(
          ".e-track",
          { xPercent: (index: number) => (index % 2 ? -50 : 0) },
          {
            xPercent: (index: number) => (index % 2 ? 0 : -50),
            duration: 2.4,
            ease: "none",
          },
          "e",
        )
        .from(
          ".e-stamp",
          {
            scale: 0,
            rotation: -25,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "e+=0.25",
        )
        .from(
          ".e-stamp-shadow",
          { x: -12, y: -12, duration: 0.2, ease: "power2.out" },
          "e+=0.6",
        )

        // Exit — the orange dot swallows the screen, then colour blinds slide away to reveal the site
        .addLabel("exit", "e+=1")
        .to(
          ".f-dot",
          {
            scale: (_index: number, dot: Element) => coverScale(dot),
            duration: 0.5,
            ease: "expo.in",
          },
          "exit",
        )
        // Anchor to the moment the dot finishes. Without an explicit position these would append
        // after the 2.4s ribbon drift and leave the screen frozen orange for ~0.9s.
        // Pause on the orange screen = "covered" offset (dot duration, tweak "+=0.5" to cut in earlier)
        // + the slide's start offset below + how slowly the slide ease starts.
        .addLabel("covered", "exit+=0.8")
        .set(".f-blind", { autoAlpha: 1 }, "covered")
        .set(
          ".a-scene, .b-scene, .c-grid, .d-panel, .e-scene",
          { autoAlpha: 0 },
          "covered",
        )
        .set(rootRef.current, { backgroundColor: "transparent" }, "covered")
        .to(
          ".f-blind",
          {
            backgroundColor: (index: number) => blindColors[index],
            duration: 0.08,
            stagger: 0.02,
          },
          "covered",
        )
        .to(
          ".f-blind",
          {
            xPercent: (index: number) => (index % 2 ? 100 : -100),
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.in",
          },
          "<0",
        );

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: rootRef },
  );

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
            className={cn(
              "a-ring absolute left-1/2 top-1/2 -ml-[35vmin] -mt-[35vmin] size-[70vmin] rounded-full border-[6px]",
              color,
            )}
          />
        ))}
        <div
          className="a-ball absolute left-1/2 top-1/2 rounded-full bg-nb-yellow"
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            marginLeft: -BALL_SIZE / 2,
            marginTop: -BALL_SIZE / 2,
            transformOrigin: "50% 100%",
          }}
        />
      </div>

      {/* B — name tiles */}
      <div className="b-scene invisible absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="b-label font-mono text-sm font-semibold uppercase tracking-[0.3em] md:text-lg">
          {"hello, i'm"}
        </p>
        <div className="flex gap-2 md:gap-4">
          {NAME.split("").map((letter, index) => (
            <span
              key={index}
              className={cn(
                "b-tile flex size-[clamp(3.5rem,15vmin,9rem)] items-center justify-center border-4 border-nb-ink font-intro text-[clamp(2.25rem,10vmin,6rem)] shadow-nb",
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
                  SHAPE_COLORS[
                    (index + Math.floor(index / SHAPE_COLUMNS)) %
                      SHAPE_COLORS.length
                  ],
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
          <div
            key={color}
            className={cn("c-stripe h-full", color)}
            style={{ transform: "scaleY(0)", transformOrigin: "50% 100%" }}
          />
        ))}
      </div>

      {/* D — kinetic words */}
      {WORDS.map((word, index) => (
        <div
          key={word.text}
          className={cn(
            `d-panel d-panel-${index} invisible absolute inset-0 flex items-center justify-center overflow-hidden`,
            word.panel,
          )}
        >
          <p className="font-intro text-[clamp(3rem,15vw,15rem)] leading-none">
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
            className={cn(
              "e-ribbon absolute -left-1/4 w-[150%] overflow-hidden border-y-4 border-nb-ink py-2 md:py-3",
              ribbon.className,
            )}
            style={{ transform: `rotate(${ribbon.rotate}deg)` }}
          >
            <div className="e-track flex w-max whitespace-nowrap font-intro text-2xl md:text-4xl">
              <span>{ribbon.text.repeat(8)}</span>
              <span>{ribbon.text.repeat(8)}</span>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="e-stamp relative">
            <div className="e-stamp-shadow absolute left-3 top-3 h-full w-full bg-nb-ink" />
            <div className="relative border-4 border-nb-ink bg-nb-cream px-8 py-4 font-intro text-[clamp(4rem,14vw,10rem)] leading-none md:px-12 md:py-6">
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
    </div>
  );
}
