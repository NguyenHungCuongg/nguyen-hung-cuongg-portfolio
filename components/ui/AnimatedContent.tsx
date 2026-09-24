"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
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
    
    // Auto-detect if there's a custom scroll container, but for this portfolio
    // we use standard window scrolling.
    if (container) {
      if (typeof container === 'string') {
        scrollerTarget = document.querySelector(container) || window;
      } else {
        scrollerTarget = container;
      }
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    // Downwards scroll: element enters from bottom/forward
    const downEnterOffset = reverse ? -distance : distance;
    // Upwards scroll: element enters from top/reverse
    const upEnterOffset = reverse ? distance : -distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: downEnterOffset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible',
      willChange: 'transform, opacity'
    });

    const animateIn = (isEnteringFromTop: boolean) => {
      gsap.killTweensOf(el);
      const startOffset = isEnteringFromTop ? upEnterOffset : downEnterOffset;
      // Stagger delay applies fully on first mount, snappier on subsequent scroll-enters
      const appliedDelay = isInitialLoadRef.current ? delay : Math.min(delay, 0.15);

      gsap.fromTo(
        el,
        {
          [axis]: startOffset,
          scale,
          opacity: animateOpacity ? initialOpacity : 1
        },
        {
          [axis]: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease,
          delay: appliedDelay,
          overwrite: 'auto',
          onComplete: () => {
            isInitialLoadRef.current = false;
            if (onComplete) onComplete();
            if (disappearAfter > 0) {
              gsap.to(el, {
                [axis]: isEnteringFromTop ? downEnterOffset : upEnterOffset,
                scale: 0.8,
                opacity: animateOpacity ? initialOpacity : 0,
                delay: disappearAfter,
                duration: disappearDuration,
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
      const targetOffset = isExitingToTop ? upEnterOffset : downEnterOffset;

      gsap.to(el, {
        [axis]: targetOffset,
        scale,
        opacity: animateOpacity ? initialOpacity : 0,
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
      gsap.set(el, { [axis]: 0, scale: 1, opacity: 1 });
    });

    return () => {
      matchMedia.revert();
      gsap.killTweensOf(el);
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={`invisible ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
