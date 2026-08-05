import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  size?: "default" | "sm" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, target, rel, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-space font-bold transition-all duration-150 focus-visible:outline-[3px] focus-visible:outline-nb-blue focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none";
    
    const neubrutalistStyles = "border-[3px] border-nb-ink shadow-nb hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nb-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";
    
    const variants = {
      primary: `bg-nb-yellow text-nb-ink ${neubrutalistStyles}`,
      secondary: `bg-nb-surface text-nb-ink ${neubrutalistStyles}`,
      text: "bg-transparent text-nb-ink border-transparent hover:bg-nb-muted active:bg-nb-muted/80",
    };

    const sizes = {
      default: "min-h-[48px] px-6 py-2 text-base",
      sm: "min-h-[44px] px-4 py-1 text-sm",
      lg: "min-h-[56px] px-8 py-3 text-lg",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      
      if (isInternal && !href.startsWith("[TEMPLATE")) {
        return (
          <Link href={href} className={classes} target={target} rel={rel}>
            {children}
          </Link>
        );
      }
      
      return (
        <a href={href} className={classes} target={target} rel={rel}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
