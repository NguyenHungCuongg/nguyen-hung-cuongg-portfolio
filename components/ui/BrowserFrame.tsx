import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  buttonSize?: "sm" | "md";
}

export function BrowserFrame({
  children,
  className,
  headerClassName,
  contentClassName,
  buttonSize = "md",
  ...props
}: BrowserFrameProps) {
  const btnClass = buttonSize === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";

  return (
    <div
      className={cn(
        "border-[3px] border-nb-ink bg-nb-surface shadow-[6px_6px_0_var(--nb-ink)] relative overflow-hidden flex flex-col",
        className,
      )}
      {...props}
    >
      {/* Browser Header */}
      <div
        className={cn(
          "border-b-[3px] border-nb-ink bg-nb-canvas flex items-center px-4 py-2 gap-2 shrink-0",
          headerClassName,
        )}
      >
        <div
          className={cn(
            "border-[2px] border-nb-ink bg-nb-pink rounded-full",
            btnClass,
          )}
        />
        <div
          className={cn(
            "border-[2px] border-nb-ink bg-nb-yellow rounded-full",
            btnClass,
          )}
        />
        <div
          className={cn(
            "border-[2px] border-nb-ink bg-nb-green rounded-full",
            btnClass,
          )}
        />
      </div>
      {/* Browser Content */}
      <div className={cn("relative flex-1 w-full", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
