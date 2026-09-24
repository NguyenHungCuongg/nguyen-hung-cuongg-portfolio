export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  role: string;
  techStack: string[];
  thumbnail: string;
  status: "completed" | "in-development" | "maintained" | "archived";
  period: string;
  team: string;
  liveUrl?: string;
  sourceUrl?: string;
  overview: string;
  features: string[];
}

export interface SkillGroup {
  domain: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  institutionFull?: string;
  degree: string;
  period: string;
  location: string;
  activities?: string[];
}

export interface Certification {
  title: string;
  provider: string;
  issued: string;
  credentialId?: string;
  credentialUrl?: string;
  skillsCovered: string[];
  certificateImage?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

export type ArtworkCategory = "book-cover" | "other";

export interface ArtworkItem {
  id: string;
  category: ArtworkCategory;
  image: string;
  year?: string;
  alt: string;
  behanceUrl?: string;
}

export interface GalleryCategory {
  id: ArtworkCategory;
  label: string;
}

