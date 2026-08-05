import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarGreetingProps {
  /** Path to avatar image in /public */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /** Greeting text shown in the speech bubble */
  greeting?: string;
  className?: string;
}

/**
 * A circular avatar with a speech-bubble pill beside it.
 * Used at the very top of the Hero section.
 */
export function AvatarGreeting({
  src = "/images/hero/avatar.png",
  alt = "Nguyen Hung Cuong",
  greeting = "Hello, I'm Cường",
  className,
}: AvatarGreetingProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-200",
        className,
      )}
    >
      {/* Circular Avatar */}
      <div className="relative w-14 h-14 shrink-0 rounded-full border-[3px] border-nb-ink shadow-[4px_4px_0_var(--nb-ink)] overflow-hidden bg-nb-muted">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          /* Fallback monogram when no image is provided */
          <span className="flex h-full w-full items-center justify-center font-syne font-bold text-xl text-nb-ink">
            NC
          </span>
        )}
      </div>

      {/* Speech Bubble */}
      <div className="relative rounded-full border-[2px] border-nb-ink bg-nb-canvas px-4 py-2 shadow-[3px_3px_0_var(--nb-ink)]">
        {/* Left "tail" triangle pointing to the avatar */}
        <span
          className="pointer-events-none absolute -left-[9px] top-1/2 -translate-y-1/2 block w-0 h-0"
          style={{
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderRight: "8px solid var(--nb-ink)",
          }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -left-[6px] top-1/2 -translate-y-1/2 block w-0 h-0"
          style={{
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderRight: "7px solid var(--nb-canvas)",
          }}
          aria-hidden="true"
        />
        <p className="font-space text-sm font-semibold text-nb-ink whitespace-nowrap">
          {greeting}
        </p>
      </div>
    </div>
  );
}
