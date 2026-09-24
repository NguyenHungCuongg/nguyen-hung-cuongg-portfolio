import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "N4C",
  title: "N4C | Portfolio",
  description:
    "Personal portfolio of Nguyen Hung Cuong, a Software Engineer based in Ho Chi Minh City, Vietnam. Building scalable backend systems and modern applications.",
  url: "https://[TEMPLATE: domain]",
  navItems: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Journey", href: "/#journey" },
    { label: "Skills", href: "/#skills" },
    { label: "Gallery", href: "/gallery" },
  ],
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/cuong.nguyen.813584/",
      icon: "facebook",
    },
    {
      platform: "GitHub",
      url: "https://github.com/NguyenHungCuongg",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/cường-nguyễn-76153a333",
      icon: "linkedin",
    },
    {
      platform: "Behance",
      url: "https://www.behance.net/whisper0911",
      icon: "behance",
    },
  ],
};
