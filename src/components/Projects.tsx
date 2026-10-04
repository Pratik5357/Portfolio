import { projects, type Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ArrowUpRightIcon, BriefcaseIcon, CodeIcon } from "./Icons";
import { RevealOnView } from "./RevealOnView";

function ProjectArticle({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      className="case-study-grid scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="case-study-grid__lead min-w-0">
        <ul className="label-caps project-meta" aria-label="Project context">
          <li className="project-meta__item">
            {project.category === "work" ? (
              <BriefcaseIcon size={13} className="shrink-0 text-accent" />
            ) : (
              <CodeIcon size={13} className="shrink-0 text-accent" />
            )}
            {project.category === "work" ? "Work" : "Personal"}
          </li>
          {project.context.map((item) => (
            <li key={item} className="project-meta__item">
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.02em] text-pretty sm:mt-5 sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-3 font-medium leading-snug text-pretty text-foreground/90">
          {project.verdict}
        </p>
        <div className="mt-6">
          <h4 className="label-caps">Problem</h4>
          <p className="body-copy mt-3">{project.problem}</p>
        </div>
      </div>

      <div className="case-study-grid__diagram flex min-w-0 w-full items-start justify-start lg:justify-start">
        <ArchitectureDiagram
          steps={project.architecture}
          id={project.id}
          coordinatedReveal
        />
      </div>

      <div className="case-study-grid__detail min-w-0">
        <div className="space-y-6">
          <div>
            <h4 className="label-caps">Decision</h4>
            <p className="body-copy mt-3">{project.decision}</p>
          </div>
          <div>
            <h4 className="label-caps">Outcome</h4>
            <p className="body-copy mt-3">{project.outcome}</p>
          </div>
        </div>

        {project.metrics.length > 0 && (
          <dl className="case-metrics mt-6 sm:mt-8">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex min-w-0 flex-col border-l border-border pl-4">
                <dt className="label-caps">{metric.label}</dt>
                <dd className="metric-value mt-auto pt-2 font-mono text-lg leading-snug tabular-nums tracking-tight">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 flex flex-wrap items-start gap-x-6 gap-y-5">
          <ul
            className="flex min-w-0 flex-1 basis-64 flex-wrap gap-x-3 gap-y-2"
            aria-label="Technologies used"
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="copy-stable w-fit max-w-full font-mono text-xs leading-relaxed text-muted"
              >
                <span className="text-accent/60">/</span>
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 flex-wrap items-center gap-x-5">
            {project.proprietary && (
              <p className="font-mono text-xs leading-relaxed text-muted text-pretty">
                Client work, code not public
              </p>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-link touch-link -my-3 min-h-11 whitespace-nowrap font-mono text-xs"
              >
                View live
                <ArrowUpRightIcon size={13} className="motion-link__arrow ml-1 inline-block align-[-2px]" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-link touch-link -my-3 min-h-11 whitespace-nowrap font-mono text-xs"
              >
                View source
                <ArrowUpRightIcon size={13} className="motion-link__arrow ml-1 inline-block align-[-2px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-block section-block--ruled"
    >
      <RevealOnView variant="heading">
        <div>
          <h2 id="projects-heading" className="section-title">
            Projects
          </h2>
          <p className="section-lead">
            Selected work, with the architecture, the decisions, and the outcomes behind it. Repo linked where I can share one.
          </p>
        </div>
      </RevealOnView>

      <div className="section-body flex flex-col">
        {projects.map((project) => (
          <RevealOnView
            key={project.id}
            variant="item"
            className="border-t border-border py-10 first:border-t-0 first:pt-0 last:pb-0 sm:py-14"
          >
            <ProjectArticle project={project} />
          </RevealOnView>
        ))}
      </div>
    </section>
  );
}
