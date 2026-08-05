"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";
import FadeContent from "@/components/ui/FadeContent";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div id={id} className={cn("mb-12", className)}>
      <SplitText
        tag="h2"
        text={title}
        splitType="words"
        delay={60}
        duration={0.5}
        from={{ opacity: 0, y: 30 }}
        className="font-syne text-[40px] font-extrabold scale-y-152 leading-tight md:text-[76px] uppercase"
      />
      {subtitle && (
        <FadeContent delay={0.2} duration={0.6}>
          <p className="mt-4 font-space text-lg text-nb-ink/80 md:text-xl max-w-2xl">
            {subtitle}
          </p>
        </FadeContent>
      )}
    </div>
  );
}
