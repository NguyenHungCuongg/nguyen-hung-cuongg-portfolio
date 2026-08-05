import { CursorIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface CursorBadgeProps {
  label: string;
  /** Tailwind color class for the cursor icon, e.g. "text-nb-pink" */
  cursorColor?: string;
  /** Tailwind background class for the badge pill, e.g. "bg-nb-pink" */
  badgeColor?: string;
  /** Tailwind text color class for the badge label, e.g. "text-nb-canvas" */
  badgeTextColor?: string;
  className?: string;
  animationDelay?: string;
}

/**
 * A floating Cursor icon with a rounded pill badge attached.
 * The badge color matches the cursor color.
 */
export function CursorBadge({
  label,
  cursorColor = "text-nb-pink",
  badgeColor = "bg-nb-pink",
  badgeTextColor = "text-nb-canvas",
  className,
  animationDelay = "0s",
}: CursorBadgeProps) {
  return (
    <div
      className={cn("animate-orbit flex items-end gap-0.5", className)}
      style={{ animationDelay }}
    >
      {/* Cursor Icon */}
      <CursorIcon
        weight="fill"
        className={cn(
          "w-8 h-8 -rotate-[10deg] drop-shadow-[2px_2px_0_var(--nb-ink)]",
          cursorColor,
        )}
      />
      {/* Pill Badge */}
      <span
        className={cn(
          "rounded-full px-3 py-1 font-mono text-xs font-bold leading-none shadow-[2px_2px_0_var(--nb-ink)] -ml-1 -mb-3",
          badgeColor,
          badgeTextColor,
        )}
      >
        {label}
      </span>
    </div>
  );
}
