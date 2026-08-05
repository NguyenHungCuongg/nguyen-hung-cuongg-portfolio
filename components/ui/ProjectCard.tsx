import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden border-[3px] border-nb-ink bg-nb-surface shadow-nb transition-all duration-150 hover:-translate-y-[2px] hover:shadow-nb-lg focus-visible:outline-[3px] focus-visible:outline-nb-blue focus-visible:outline-offset-4",
        className
      )}
    >
      {/* Image container - 4:3 aspect ratio */}
      <div className="relative aspect-[4/3] w-full border-b-[3px] border-nb-ink bg-nb-muted">
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-syne text-2xl font-bold text-nb-ink">
          {project.name}
        </h3>
        <p className="mt-2 font-space text-base text-nb-ink/90">
          {project.shortDescription}
        </p>
        
        <div className="mt-auto pt-6">
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-nb-ink">
            {project.role}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="border-2 border-nb-ink bg-nb-canvas px-2 py-1 font-mono text-xs font-semibold text-nb-ink"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="border-2 border-nb-ink bg-nb-canvas px-2 py-1 font-mono text-xs font-semibold text-nb-ink">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
