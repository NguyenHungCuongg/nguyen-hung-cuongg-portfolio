import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "outline" | "surface" | "default";
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono font-bold uppercase",
        {
          "border-[1px] border-nb-canvas text-nb-canvas": variant === "outline",
          "border-[1px] border-nb-ink bg-nb-surface text-nb-ink shadow-[2px_2px_0_var(--nb-ink)]":
            variant === "surface",
          "border-2 border-nb-ink bg-nb-surface text-nb-ink":
            variant === "default",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
