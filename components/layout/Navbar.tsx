"use client";

import * as React from "react";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAtTop } = useScrollDirection(50);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-16 items-center bg-nb-canvas transition-all duration-200 md:h-20",
        !isAtTop ? "border-b-[3px] border-nb-ink shadow-nb-sm" : "border-b-0",
      )}
    >
      <div className="mx-auto relative flex w-full max-w-[1400px] items-center justify-between px-4 md:px-8 lg:px-12">
        {/* Logo / Monogram */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-space text-3xl font-bold tracking-tight text-nb-ink focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
          aria-label="Home"
        >
          {siteConfig.name}
          <span className="text-nb-orange">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
          <ul className="flex items-center gap-6 lg:gap-8">
            {siteConfig.navItems.map((item) => (
              <li
                key={item.href}
                className="hover:scale-102 transition-transform"
              >
                <Link
                  href={item.href}
                  className="font-space text-base font-medium text-nb-ink hover:underline hover:font-bold cursor-pointer  focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center">
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" size="default">
              Contact Me
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center border-[3px] border-nb-ink bg-nb-surface text-nb-ink shadow-nb-sm transition-all hover:bg-nb-muted focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <XIcon size={24} weight="bold" />
            ) : (
              <ListIcon size={24} weight="bold" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[64px] z-40 flex flex-col border-t-[3px] border-nb-ink bg-nb-canvas p-6 md:hidden">
          <nav className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block border-[3px] border-transparent p-2 font-syne text-2xl font-bold text-nb-ink hover:border-nb-ink focus-visible:border-nb-ink focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t-[3px] border-nb-ink pt-6">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={closeMenu}
              >
                Contact Me
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
