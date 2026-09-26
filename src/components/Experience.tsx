import { experience } from "@/lib/data";
import { RevealOnView } from "./RevealOnView";

export function Experience() {
  return (
    <RevealOnView variant="section">
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="section-block"
      >
        <RevealOnView variant="heading">
          <h2 id="experience-heading" className="section-title">
            Experience
          </h2>
        </RevealOnView>
        <p className="section-lead">
          What I ship day to day at Tudip, from APIs to SQL Server to the
          integrations I built.
        </p>

        <ol className="section-body space-y-0">
          {experience.map((entry) => (
            <RevealOnView
              key={entry.period}
              as="li"
              variant="row"
              className="stack-row border-t border-border py-6 first:border-t-0 first:pt-0 sm:py-8"
            >
              <time
                dateTime={
                  entry.period.includes("present")
                    ? "2025-03"
                    : entry.period.replace("Before ", "")
                }
                className="copy-stable whitespace-nowrap font-mono text-xs leading-relaxed text-muted"
              >
                {entry.period}
              </time>
              <div className="min-w-0">
                <p className="font-medium leading-snug text-pretty">
                  <span className="whitespace-nowrap">{entry.role}</span>
                  <span className="text-foreground/50"> · </span>
                  <span className="text-foreground/80">{entry.company}</span>
                </p>
                <p className="body-copy mt-3 !text-foreground/75">
                  {entry.summary}
                </p>
                {entry.shipped && entry.shipped.length > 0 && (
                  <ul className="mt-8 space-y-6">
                    {entry.shipped.map((item) => (
                      <li key={item.title} className="min-w-0">
                        <p className="font-medium leading-snug text-pretty">
                          {item.title}
                        </p>
                        <p className="body-copy mt-2 !text-foreground/75">
                          {item.did}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-sm leading-relaxed text-foreground/75"
                      >
                        <span
                          className="shrink-0 font-mono text-accent/70"
                          aria-hidden="true"
                        >
                          /
                        </span>
                        <span className="min-w-0 text-pretty">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealOnView>
          ))}
        </ol>
      </section>
    </RevealOnView>
  );
}
