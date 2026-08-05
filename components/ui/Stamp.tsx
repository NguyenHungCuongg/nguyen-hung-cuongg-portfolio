import React from "react";
import { cn } from "@/lib/utils";

export interface StampProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: "blue" | "pink" | "yellow" | "green" | "ink" | "muted";
}

const colorVariants = {
  blue: "text-nb-blue border-nb-blue",
  pink: "text-nb-pink border-nb-pink",
  yellow: "text-nb-yellow border-nb-yellow",
  green: "text-nb-green border-nb-green",
  ink: "text-nb-ink border-nb-ink",
  muted: "text-nb-muted border-nb-muted",
};

export function Stamp({ children, color = "blue", className, ...props }: StampProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 px-5 py-2 font-mono font-bold uppercase tracking-[0.18em] text-sm bg-transparent border-[4px] border-double select-none -rotate-3 hover:-rotate-1 transition-transform duration-200 ease-out hover:scale-105",
        colorVariants[color],
        className
      )}
      {...props}
    >
      <span aria-hidden="true">★</span>
      {children}
      <span aria-hidden="true">★</span>
    </div>
  );
}
