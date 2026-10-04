import { experience } from "@/lib/data";
import { ArrowDownIcon } from "./Icons";
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
              className="stack-row border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 sm:py-8"
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
                  <span className="text-foreground/50"> at </span>
                  <span className="text-foreground/80">{entry.company}</span>
                </p>
                <p className="body-copy mt-3 !text-foreground/75">
                  {entry.summary}
                </p>
                {entry.dayToDay && (
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-pretty text-muted">
                    {entry.dayToDay}
                  </p>
                )}
                {entry.timeline && entry.timeline.length > 0 && (
                  <ol className="work-timeline mt-8" aria-label="Work shipped, newest first">
                    {entry.timeline.map((item) => (
                      <li
                        key={item.title}
                        className="work-timeline__item"
                        aria-current={item.current ? "step" : undefined}
                      >
                        <span
                          className={`work-timeline__dot${item.current ? " work-timeline__dot--current" : ""}`}
                          aria-hidden="true"
                        />
                        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-medium leading-snug text-pretty">
                          {item.title}
                          {item.current && (
                            <span className="border border-accent/40 px-1.5 py-px font-mono text-xs font-normal leading-relaxed text-accent">
                              In progress
                            </span>
                          )}
                        </p>
                        <p className="body-copy mt-1.5 !text-foreground/75">
                          {item.did}
                        </p>
                        {item.caseStudy && (
                          <a
                            href={`#${item.caseStudy}`}
                            className="motion-link touch-link -mb-3 -mt-1.5 inline-flex items-center gap-1 font-mono text-xs"
                          >
                            Case study
                            <ArrowDownIcon size={13} className="motion-link__arrow motion-link__arrow--down" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </RevealOnView>
          ))}
        </ol>
      </section>
    </RevealOnView>
  );
}
