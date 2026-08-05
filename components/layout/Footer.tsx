import * as React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  BrowsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/data/site-config";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogoIcon weight="fill" size={20} />,
  linkedin: <LinkedinLogoIcon weight="fill" size={20} />,
  email: <EnvelopeSimpleIcon weight="fill" size={20} />,
  behance: <BrowsersIcon weight="fill" size={20} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-[4px] border-nb-ink bg-nb-ink">
      {/* Main footer grid */}
      <div className="mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Tagline */}
          <div className="flex flex-col justify-between gap-8">
            <Link
              href="/"
              className="font-mono lg:w-[220px] text-3xl font-extrabold leading-tight text-nb-canvas focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
              aria-label="N4C — back to top"
            >
              <span className="text-nb-canvas">Where </span>
              <span className="text-nb-yellow">Engineering</span>
              <span className="text-nb-canvas"> &amp; </span>
              <br />
              <span className="text-nb-pink">Design</span>
              <span className="text-nb-canvas"> meet.</span>
            </Link>
          </div>

          {/* Col 2 — Explore */}
          <div className="flex flex-col gap-4">
            <p className="font-space text-md font-bold uppercase tracking-[0.2em] text-nb-yellow mb-4">
              Explore
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 font-space text-sm font-medium text-nb-canvas/70 transition-colors duration-150 hover:text-nb-canvas focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Follow Me */}
          <div className="flex flex-col gap-4">
            <p className="font-space text-md font-bold uppercase tracking-[0.2em] text-nb-green mb-4">
              Follow Me
            </p>
            <ul className="flex flex-col gap-3">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={
                      link.url.startsWith("[TEMPLATE")
                        ? "#"
                        : link.url.startsWith("mailto")
                          ? link.url
                          : link.platform === "Email"
                            ? `mailto:${link.url}`
                            : link.url
                    }
                    target={link.platform === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 font-space text-sm font-medium text-nb-canvas/70 transition-colors duration-150 hover:text-nb-canvas focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
                    aria-label={link.platform}
                  >
                    <span className="flex h-8 w-8 rounded-full shrink-0 items-center justify-center border-[2px] border-nb-canvas/20 text-nb-canvas/60 transition-colors duration-150 group-hover:border-nb-canvas/60 group-hover:text-nb-canvas">
                      {SOCIAL_ICONS[link.icon ?? ""] ?? (
                        <EnvelopeSimpleIcon weight="fill" size={16} />
                      )}
                    </span>
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Quick CTAs */}
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="group flex items-center justify-between border-b-[2px] border-nb-canvas/10 pb-4 transition-colors duration-150 hover:border-nb-yellow focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
            >
              <div>
                <p className="font-syne text-base font-bold text-nb-canvas group-hover:text-nb-yellow transition-colors">
                  Contact Me
                </p>
                <p className="font-space text-xs text-nb-canvas/40">
                  Say hello!
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border-[2px] border-nb-canvas/20 text-nb-canvas/50 transition-all duration-150 group-hover:border-nb-yellow group-hover:text-nb-yellow group-hover:translate-x-1">
                <ArrowRightIcon
                  className="text-nb-yellow"
                  weight="bold"
                  size={22}
                />
              </span>
            </Link>

            <Link
              href="/resume"
              className="group flex items-center justify-between border-b-[2px] border-nb-canvas/10 py-4 transition-colors duration-150 hover:border-nb-green focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-nb-blue"
            >
              <div>
                <p className="font-syne text-base font-bold text-nb-canvas group-hover:text-nb-green transition-colors">
                  Resume
                </p>
                <p className="font-space text-xs text-nb-canvas/40">
                  View &amp; download
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border-[2px] border-nb-canvas/20 text-nb-canvas/50 transition-all duration-150 group-hover:border-nb-green group-hover:text-nb-green group-hover:translate-x-1">
                <ArrowRightIcon
                  className="text-nb-green"
                  weight="bold"
                  size={22}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Massive cropped name text */}
      <div className="w-full flex justify-center select-none pointer-events-none overflow-hidden h-[15vw] sm:h-[16vw]">
        <span className="font-space text-[18vw] font-black tracking-tighter text-nb-canvas leading-none translate-y-[10%] sm:translate-y-[15%] md:translate-y-[20%]">
          HUNGCUONG
        </span>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-nb-canvas/10 px-4 py-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-nb-ink">
        <p className="font-space text-xs md:text-sm font-medium tracking-wide text-nb-canvas/80">
          {siteConfig.name} © {currentYear}
        </p>
        <p className="font-space text-xs md:text-sm font-medium tracking-wide text-nb-canvas/80">
          Ho Chi Minh City, Vietnam
        </p>
      </div>
    </footer>
  );
}
