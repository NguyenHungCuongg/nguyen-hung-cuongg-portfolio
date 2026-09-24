"use client";

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget: Element | string | Window | null = window;

    if (container) {
      if (typeof container === 'string') {
        scrollerTarget = document.querySelector(container) || window;
      } else {
        scrollerTarget = container;
      }
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);
    const yShift = 24;

    gsap.set(el, {
      autoAlpha: initialOpacity,
      y: yShift,
      willChange: 'opacity, transform'
    });

    const animateIn = (isEnteringFromTop: boolean) => {
      gsap.killTweensOf(el);
      const startY = isEnteringFromTop ? -yShift : yShift;
      const appliedDelay = isInitialLoadRef.current ? getSeconds(delay) : Math.min(getSeconds(delay), 0.15);

      gsap.fromTo(
        el,
        {
          autoAlpha: initialOpacity,
          y: startY
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: getSeconds(duration),
          ease: ease,
          delay: appliedDelay,
          overwrite: 'auto',
          onComplete: () => {
            isInitialLoadRef.current = false;
            if (onComplete) onComplete();
            if (disappearAfter > 0) {
              gsap.to(el, {
                autoAlpha: initialOpacity,
                y: isEnteringFromTop ? yShift : -yShift,
                delay: getSeconds(disappearAfter),
                duration: getSeconds(disappearDuration),
                ease: disappearEase,
                onComplete: () => onDisappearanceComplete?.()
              });
            }
          }
        }
      );
    };

    const animateOut = (isExitingToTop: boolean) => {
      gsap.killTweensOf(el);
      const targetY = isExitingToTop ? -yShift : yShift;

      gsap.to(el, {
        autoAlpha: initialOpacity,
        y: targetY,
        duration: 0.35,
        ease: 'power2.in',
        overwrite: 'auto'
      });
    };

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget,
        start: `top ${startPct}%`,
        end: 'bottom top',
        fastScrollEnd: true,
        anticipatePin: 0.4,
        onEnter: () => animateIn(false),
        onLeave: () => animateOut(true),
        onEnterBack: () => animateIn(true),
        onLeaveBack: () => animateOut(false)
      });

      return () => {
        st.kill();
      };
    });
    
    matchMedia.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { autoAlpha: 1, y: 0 });
    });

    return () => {
      matchMedia.revert();
      gsap.killTweensOf(el);
    };
  }, [
    container,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
