"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import AnimatedContent from "@/components/ui/AnimatedContent";

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t-[4px] border-nb-ink bg-nb-blue bg-dot-pattern-light py-20 md:py-32"
    >
      <div className="mx-auto w-full px-4 md:px-8 lg:px-16">
        <SectionHeading
          title="STUFF I BUILT!"
          className="mb-12 md:mb-16 text-nb-yellow"
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Preview Section - Sticky */}
          <AnimatedContent delay={0.3} direction="horizontal" distance={80} className="hidden lg:flex w-full lg:w-[42%] flex-col gap-6 lg:sticky lg:top-32 lg:self-start pb-8">
            <div
              key={`preview-${projects[hoveredIndex].slug}`}
              className="flex flex-col gap-6 transition-opacity duration-300 w-full"
            >
              {/* Browser Mockup */}
              <BrowserFrame>
                <div className="relative aspect-[5/3] w-full bg-nb-muted">
                  <Image
                    src={projects[hoveredIndex].thumbnail}
                    alt={projects[hoveredIndex].name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </BrowserFrame>

              {/* Details Card */}
              <div className="border-[3px] border-nb-ink bg-nb-canvas p-4 shadow-[6px_6px_0_var(--nb-ink)] flex flex-col gap-2">
                <h3 className="font-syne font-bold text-xl text-nb-ink uppercase leading-tight">
                  {projects[hoveredIndex].name}
                </h3>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="surface" className="text-[10px] px-2 py-1">
                    {projects[hoveredIndex].period}
                  </Badge>
                  <Badge variant="surface" className="text-[10px] px-2 py-1">
                    {projects[hoveredIndex].role}
                  </Badge>
                </div>

                <p className="font-space text-sm text-nb-ink leading-relaxed">
                  {projects[hoveredIndex].overview}
                </p>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-2 mt-2">
                  {projects[hoveredIndex].features
                    .slice(0, 3)
                    .map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-space text-xs text-nb-ink"
                      >
                        <span className="mt-1 w-1.5 h-1.5 bg-nb-ink flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* View Project Button */}
              <a
                href={
                  projects[hoveredIndex].liveUrl ||
                  projects[hoveredIndex].sourceUrl ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border-[3px] border-nb-ink bg-nb-surface py-2 text-center font-space font-bold text-nb-ink text-xl shadow-[6px_6px_0_var(--nb-ink)] hover:bg-nb-yellow hover:translate-y-[-2px] transition-all"
              >
                VIEW PROJECT
              </a>
            </div>
          </AnimatedContent>

          {/* Right List Section */}
          <div className="w-full lg:w-[58%] flex flex-col mt-12 lg:mt-0">
            {projects.map((project, index) => (
              <AnimatedContent
                key={project.slug}
                delay={index * 0.08}
                direction="vertical"
                distance={50}
                className={cn(
                  "border-t-[3px] border-nb-canvas/20 py-12 lg:py-16 first:border-0 first:pt-0 group relative cursor-pointer flex flex-col gap-6",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Mobile Preview (hidden on desktop) */}
                <div className="lg:hidden">
                  <BrowserFrame buttonSize="sm" className="shadow-[4px_4px_0_var(--nb-ink)]">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </BrowserFrame>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:items-start justify-between">
                  <div className="flex-1 flex flex-col gap-6">
                    <h3
                      className={cn(
                        "font-syne font-bold scale-y-125 text-4xl md:text-5xl lg:text-5xl leading-[0.95] uppercase transition-all ease-in-out duration-300",
                        hoveredIndex === index
                          ? "text-nb-yellow translate-x-3"
                          : "text-nb-canvas translate-x-0",
                      )}
                    >
                      {project.name}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs px-3 py-1"
                      >
                        {project.period || "2026"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs px-3 py-1"
                      >
                        {project.role}
                      </Badge>
                      {project.techStack.slice(0, 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-[10px] sm:text-xs px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <p className="font-space text-nb-canvas/80 text-lg lg:text-lg font-medium max-w-xl leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <a
                      href={project.liveUrl || project.sourceUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lg:hidden mt-2 inline-block w-full border-[3px] border-nb-ink bg-nb-yellow py-2 text-center font-space font-bold text-nb-ink text-lg shadow-[4px_4px_0_var(--nb-ink)]"
                    >
                      VIEW PROJECT
                    </a>
                  </div>

                  {/* Arrow Icon for Desktop */}
                  <a
                    href={project.sourceUrl || project.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "hidden lg:flex items-center justify-center w-16 h-16 border-[3px] border-nb-canvas text-nb-canvas transition-all duration-300 flex-shrink-0 mt-2",
                      hoveredIndex === index
                        ? "bg-nb-yellow text-nb-ink border-nb-ink rotate-45 shadow-[4px_4px_0_var(--nb-ink)]"
                        : "",
                    )}
                  >
                    <ArrowUpRightIcon weight="bold" className="w-8 h-8" />
                  </a>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
