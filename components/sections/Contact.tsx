import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  FacebookLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import SplitText from "@/components/ui/SplitText";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex flex-col md:flex-row w-full min-h-[calc(100dvh-5rem)] border-t-[4px] border-nb-ink bg-nb-canvas overflow-hidden"
    >
      {/* Left: Cinematic Editorial Image Frame */}
      <AnimatedContent direction="horizontal" distance={80} duration={0.7} className="relative w-full md:w-2/5 min-h-[40vh] md:min-h-full border-b-[4px] md:border-b-0 md:border-r-[4px] border-nb-ink overflow-hidden bg-nb-ink">
        {/* Real Contact Image */}
        <Image
          src="/images/contact/contact.jpg"
          alt="Contact Nguyen Hung Cuong"
          fill
          className="contact-bg object-cover opacity-90"
          priority
        />
        {/* Subtle gradient overlay to ensure the borders and edge contrast look good */}
        <div className="absolute inset-0 bg-gradient-to-t from-nb-ink/60 via-transparent to-transparent pointer-events-none" />
      </AnimatedContent>

      {/* Right: Minimalist Content */}
      <div className="w-full md:w-3/5 flex flex-col justify-center py-16 px-2 md:py-16 md:px-4 lg:py-24 lg:px-8 bg-nb-yellow">
        {/* Large Heading */}
        <SplitText
          tag="h1"
          text="LET'S WORK TOGETHER"
          splitType="words"
          delay={80}
          initialDelay={150}
          duration={0.6}
          from={{ opacity: 0, y: 30 }}
          className="font-syne text-[clamp(3rem,6vw,7rem)] font-extrabold scale-y-155 text-nb-ink uppercase leading-[0.85] tracking-tighter"
        />

        {/* Email Block */}
        <FadeContent delay={0.35} duration={0.6} className="mt-14 md:mt-24">
          <p className="font-space text-xs md:text-sm font-bold text-nb-ink/50 uppercase tracking-[0.2em] mb-2">
            Contact details
          </p>
          <a className="group inline-flex w-full items-center gap-3 md:gap-2">
            <EnvelopeSimpleIcon className="h-6 w-6 md:h-8 md:w-8 shrink-0 text-nb-ink transition-transform group-hover:scale-105" />
            <span className="font-space text-[clamp(1rem,2.5vw,1.5rem)] text-nb-ink break-all hover: group-hover:translate-x-1 transition-transform">
              cuonghungnguyentop@gmail.com
            </span>
          </a>
        </FadeContent>

        {/* Social Icons Only */}
        <AnimatedContent delay={0.5} direction="vertical" distance={30} className="mt-10 md:mt-12 items-center gap-4 md:gap-6">
          <p className="font-space text-xs md:text-sm font-bold text-nb-ink/50 uppercase tracking-[0.2em] mb-2">
            Socials
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={
                  link.platform === "Email" && !link.url.startsWith("mailto:")
                    ? `mailto:${link.url}`
                    : link.url
                }
                target={link.platform === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border-[4px] border-nb-ink bg-nb-canvas text-nb-ink shadow-[4px_4px_0_var(--nb-ink)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_var(--nb-ink)] hover:bg-nb-surface focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-nb-blue"
                aria-label={link.platform}
                title={link.platform}
              >
                {link.platform === "Facebook" && (
                  <FacebookLogoIcon
                    weight="fill"
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                )}
                {link.platform === "GitHub" && (
                  <GithubLogoIcon
                    weight="fill"
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                )}
                {link.platform === "LinkedIn" && (
                  <LinkedinLogoIcon
                    weight="fill"
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                )}
                {link.platform === "Behance" && (
                  <span className="font-syne font-bold text-xl md:text-3xl">
                    Bē
                  </span>
                )}
              </a>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
