import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "microservices-elearning-platform",
    name: "Microservices-based E-learning Platform",
    shortDescription:
      "A microservices-based learning platform that combines quizzes, flashcards, and gamification to make learning more engaging.",
    role: "Full-stack Developer, Team Leader",
    techStack: ["Spring Boot", "PostgreSQL", "MongoDB", "RabbitMQ", "Redis"],
    thumbnail: "/images/projects/seika.png",
    status: "completed",
    period: "3/2026 – 8/2026",
    team: "duo project",
    liveUrl: undefined, // Placeholder for live URL if available
    sourceUrl: "https://github.com/NguyenHungCuongg/Seika-microservices",
    overview:
      "Seika is designed for three groups: students who want engaging study tools, teachers who create and monetize educational content, and administrators who operate the platform safely.",
    features: [
      "Quiz and Flashcard Creation",
      "Gamification and Leaderboards",
      "Secure User Authentication",
    ],
  },
  {
    slug: "productivity-chrome-extension",
    name: "Productivity Chrome Extension",
    shortDescription:
      "A Chrome extension that turns a timer, task list, website blocker, and ambient sound mixer into one focused workflow.",
    role: "Frontend Developer",
    techStack: ["JavaScript", "ReactJS", "Tailwind CSS"],
    thumbnail: "/images/projects/beeyond-limits.png",
    status: "completed",
    period: "7/2025 – 7/2026",
    team: "solo project",
    liveUrl: undefined,
    sourceUrl: "https://github.com/NguyenHungCuongg/Beeyond-Limits",
    overview:
      "Beeyond Limits is a productivity extension that helps you break through distractions and push your focus to the next level. Inspired by the hardworking bee, it's time to fly beeyond procrastination and reach your true potential.",
    features: [
      "Pomodoro Timer and Task List",
      "Website Blocker",
      "Ambient Sound Mixer",
    ],
  },
  {
    slug: "travel-booking-mobile-app",
    name: "Travel Booking Mobile App",
    shortDescription:
      "A cross-platform mobile app for discovering and booking tours and accommodations.",
    role: "Mobile Developer, UI/UX Designer, Team Leader",
    techStack: ["React Native", "NestJS", "Figma"],
    thumbnail: "/images/projects/trekker.png",
    status: "completed",
    period: "9/2025 – 1/2026",
    team: "3-member team",
    liveUrl: undefined,
    sourceUrl: "https://github.com/NguyenHungCuongg/Trekker",
    overview:
      "This mobile app is designed for travelers seeking a seamless experience in discovering and booking tours and accommodations. It provides a user-friendly interface, personalized recommendations, and secure payment options.",
    features: [
      "Tour and Accommodation Discovery",
      "Booking and Payment Integration",
    ],
  },
  {
    slug: "cybercafe-management-system",
    name: "Cybercafe Management System",
    shortDescription:
      "A comprehensive management system for cybercafes, handling user sessions, billing, and staff management.",
    role: "Java Developer, Team Leader",
    techStack: ["Java Swing", "SQL Server"],
    thumbnail: "/images/projects/cyber-core.png",
    status: "completed",
    period: "3/2025 – 5/2025",
    team: "4-member team",
    liveUrl: undefined,
    sourceUrl:
      "https://github.com/NguyenHungCuongg/Cybergame-Management-System",
    overview:
      "This system is designed for three groups: cybercafe owners who need efficient management tools, staff members who handle daily operations.",
    features: [
      "Customer Session Management",
      "Billing and Payment Processing",
      "Staff Management and Reporting",
    ],
  },
];
