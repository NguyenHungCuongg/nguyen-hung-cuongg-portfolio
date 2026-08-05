import { certifications } from "@/data/certifications";

export function CertificatesTab() {
  return (
    <div className="flex flex-col gap-6 md:h-[420px] md:overflow-y-auto scrollbar-nb pr-2">
      {certifications.map((cert, index) => (
        <article
          key={index}
          className="flex flex-col gap-3 border-[2px] border-nb-ink bg-nb-surface p-5 transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--nb-ink)] mt-2"
        >
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-2 border-b-2 border-nb-ink pb-3 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-1">
              <h3 className="font-syne text-base font-bold text-nb-ink md:text-lg">
                {cert.title}
              </h3>
              <p className="font-space text-sm font-medium text-nb-ink/70">
                {cert.provider}
              </p>
            </div>
            <span className="shrink-0 border-2 border-nb-ink bg-nb-yellow px-2 py-0.5 font-mono text-xs font-bold uppercase text-nb-ink">
              {cert.issued}
            </span>
          </div>

          {/* Skills + Credential */}
          <div className="flex flex-col gap-3 font-space text-sm">
            {cert.skillsCovered.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nb-ink/50">
                  Skills:
                </span>
                {cert.skillsCovered.map((skill) => (
                  <span
                    key={skill}
                    className="border-[2px] border-nb-ink/30 px-2 py-0.5 font-mono text-xs text-nb-ink/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-nb-ink/20 pt-3">
              {cert.credentialId && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-nb-ink/50">
                    ID:
                  </span>
                  <span className="font-mono text-xs text-nb-ink/60">
                    {cert.credentialId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
