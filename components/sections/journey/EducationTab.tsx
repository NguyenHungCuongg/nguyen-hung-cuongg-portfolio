import { educations } from "@/data/education";

export function EducationTab() {
  return (
    <div className="flex flex-col gap-8 md:h-[420px] md:overflow-y-auto scrollbar-nb pr-2">
      {educations.map((edu, index) => (
        <article key={index} className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-3 border-b-[3px] border-nb-ink pb-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-syne text-xl font-bold text-nb-ink md:text-2xl">
                {edu.institution}
              </h3>
              {edu.institutionFull && (
                <p className="mt-1 font-space text-sm font-medium text-nb-ink/70">
                  {edu.institutionFull}
                </p>
              )}
            </div>
            <span className="shrink-0 border-2 border-nb-ink bg-nb-yellow px-3 py-1 font-mono text-xs font-bold text-nb-ink">
              {edu.period}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 font-space text-sm md:text-base">
            <div className="flex justify-between border-b border-dashed border-nb-ink/20 pb-3">
              <span className="font-bold text-nb-ink">Degree</span>
              <span className="text-right text-nb-ink/80">{edu.degree}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-nb-ink/20 pb-3">
              <span className="font-bold text-nb-ink">Location</span>
              <span className="text-right text-nb-ink/80">{edu.location}</span>
            </div>
          </div>

          {/* Optional activities */}
          {edu.activities && edu.activities.length > 0 && (
            <ul className="flex flex-col gap-2 pl-4 font-space text-sm text-nb-ink/80 list-disc marker:text-nb-ink">
              {edu.activities.map((activity, i) => (
                <li key={i} className="pl-1 leading-relaxed">
                  {activity}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
