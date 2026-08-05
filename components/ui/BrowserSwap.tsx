"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BrowserSwapProps {
  images: { id: string | number; src: string; alt: string }[];
  className?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  delay?: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (
  el: HTMLElement,
  slot: ReturnType<typeof makeSlot>,
  skew: number,
) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

export function BrowserSwap({
  images,
  className,
  containerClassName,
  containerStyle,
  delay = 5000,
}: BrowserSwapProps) {
  const cardDistance = 60;
  const verticalDistance = 70;
  const skewAmount = 6;

  const refs = useMemo(
    () => images.map(() => React.createRef<HTMLDivElement>()),
    [images],
  );
  const order = useRef(Array.from({ length: images.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const swapRef = useRef<() => void>(() => {});

  const config = {
    ease: "elastic.out(0.6,0.9)",
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
  };

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swapRef.current = swap;

    const intervalId = window.setInterval(swap, delay);
    intervalRef.current = intervalId;

    const node = container.current;
    if (node) {
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center",
        className,
      )}
    >
      <div
        ref={container}
        className={cn(
          "relative w-full max-w-[500px] aspect-[5/3] overflow-visible origin-bottom-right",
          containerClassName,
        )}
        style={{
          perspective: "900px",
          transform: "translate(5%, 20%)",
          ...containerStyle,
        }}
      >
        {images.map((card, i) => (
          <div
            key={card.id}
            ref={refs[i]}
            className="absolute top-[50%] left-[50%] w-full h-full will-change-transform cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            onClick={() => {
              if (order.current[0] === i) {
                swapRef.current();
                clearInterval(intervalRef.current);
                intervalRef.current = window.setInterval(
                  swapRef.current,
                  delay,
                );
              }
            }}
          >
            <BrowserFrame className="w-full h-[500px] shadow-[8px_8px_0_var(--nb-ink)]">
              <div className="relative aspect-[5/3] w-full bg-nb-muted pointer-events-none select-none">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </BrowserFrame>
          </div>
        ))}
      </div>
    </div>
  );
}
