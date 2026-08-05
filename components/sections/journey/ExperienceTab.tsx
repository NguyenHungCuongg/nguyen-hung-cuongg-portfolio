import { experiences } from "@/data/experience";

export function ExperienceTab() {
  return (
    <div className="flex flex-col gap-10 md:h-[420px] md:overflow-y-auto scrollbar-nb pr-2">
      {experiences.map((exp, index) => (
        <article key={index} className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-3 border-b-[3px] border-nb-ink pb-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-syne text-xl font-bold text-nb-ink md:text-2xl">
                {exp.role}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-wider text-nb-ink/70">
                <span>{exp.company}</span>
                <span className="text-nb-ink/30">·</span>
                <span>{exp.location}</span>
              </div>
            </div>
            <span className="shrink-0 border-2 border-nb-ink bg-nb-yellow px-3 py-1 font-mono text-xs font-bold text-nb-ink">
              {exp.period}
            </span>
          </div>

          {/* Body */}
          <p className="font-space text-sm font-medium leading-relaxed text-nb-ink/80 md:text-base">
            {exp.summary}
          </p>
          <ul className="flex flex-col gap-2 pl-4 font-space text-sm text-nb-ink/80 list-disc marker:text-nb-ink">
            {exp.responsibilities.map((resp, i) => (
              <li key={i} className="pl-1 leading-relaxed">
                {resp}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap items-center gap-2 border-t-2 border-dashed border-nb-ink/20 pt-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nb-ink/50 mr-1">
              Stack:
            </span>
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="border-[2px] border-nb-ink bg-nb-surface px-2 py-0.5 font-mono text-xs font-bold text-nb-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
