"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
  initialDelay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  initialDelay = 0,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    let isMounted = true;
    document.fonts.ready.then(() => {
      if (isMounted) {
        setFontsLoaded(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {}
        el._rbsplitInstance = undefined;
      }

      const matchMedia = gsap.matchMedia();
      let splitInstance: GSAPSplitText | undefined;

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
        const sign =
          marginValue === 0
            ? ''
            : marginValue < 0
              ? `-=${Math.abs(marginValue)}${marginUnit}`
              : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;
        
        let targets: Element[] = [];
        
        const assignTargets = (self: GSAPSplitText) => {
          if (splitType.includes('chars') && (self as GSAPSplitText).chars?.length)
            targets = (self as GSAPSplitText).chars;
          if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
          if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
          if (!targets.length) targets = self.chars || self.words || self.lines;
        };
        
        try {
          splitInstance = new GSAPSplitText(el, {
            type: splitType,
            smartWrap: true,
            autoSplit: splitType === 'lines',
            linesClass: 'split-line',
            wordsClass: 'split-word',
            charsClass: 'split-char',
            reduceWhiteSpace: false
          });

          assignTargets(splitInstance);
          el._rbsplitInstance = splitInstance;

          const yOffset = typeof from.y === 'number' ? from.y : 35;
          let isFirstRun = true;

          // Initial hide of targets
          gsap.set(targets, { opacity: 0, y: Math.abs(yOffset) });

          const animateIn = (isEnteringFromTop: boolean) => {
            gsap.killTweensOf(targets);
            const startY = isEnteringFromTop ? -Math.abs(yOffset) : Math.abs(yOffset);
            const appliedDelay = isFirstRun ? initialDelay / 1000 : 0.05;

            gsap.fromTo(
              targets,
              { ...from, y: startY, opacity: 0 },
              {
                ...to,
                y: 0,
                opacity: 1,
                delay: appliedDelay,
                duration,
                ease,
                stagger: delay / 1000,
                willChange: 'transform, opacity',
                force3D: true,
                overwrite: 'auto',
                onComplete: () => {
                  isFirstRun = false;
                  onCompleteRef.current?.();
                }
              }
            );
          };

          const animateOut = (isExitingToTop: boolean) => {
            gsap.killTweensOf(targets);
            const exitY = isExitingToTop ? -Math.abs(yOffset) : Math.abs(yOffset);
            gsap.to(targets, {
              y: exitY,
              opacity: 0,
              duration: 0.25,
              ease: 'power2.in',
              overwrite: 'auto'
            });
          };

          ScrollTrigger.create({
            trigger: el,
            start,
            end: 'bottom top',
            fastScrollEnd: true,
            anticipatePin: 0.4,
            onEnter: () => animateIn(false),
            onLeave: () => animateOut(true),
            onEnterBack: () => animateIn(true),
            onLeaveBack: () => animateOut(false)
          });
        } catch {
          gsap.set(el, { opacity: 1, y: 0 });
        }
      });

      matchMedia.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { opacity: 1, y: 0 });
        onCompleteRef.current?.();
      });

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          if (splitInstance) splitInstance.revert();
        } catch {}
        el._rbsplitInstance = undefined;
        matchMedia.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
    const Tag = (tag || 'p') as React.ElementType;

    return (
      <Tag ref={ref} style={style} className={classes}>
        {text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;
