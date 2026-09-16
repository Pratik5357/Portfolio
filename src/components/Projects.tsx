import { projectGroups, projects, type Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { RevealOnView } from "./RevealOnView";

function ProjectArticle({ project }: { project: Project }) {
  return (
    <RevealOnView variant="item">
      <article
        className="case-study-grid border-t border-border py-10 first:border-t-0 first:pt-0 sm:py-14"
      >
        <div className="case-study-grid__lead min-w-0">
          <p className="label-caps">{project.context}</p>
          <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.02em] text-pretty sm:mt-5 sm:text-xl">
            {project.title}
          </h3>
          <div className="mt-6">
            <h4 className="label-caps">Problem</h4>
            <p className="body-copy mt-3">{project.problem}</p>
          </div>
        </div>

        <div className="case-study-grid__diagram flex min-w-0 w-full items-start justify-start lg:justify-start">
          <ArchitectureDiagram steps={project.architecture} id={project.id} />
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

          <dl className="case-metrics mt-6 sm:mt-8">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 border-l border-border pl-4">
                <dt className="label-caps">{metric.label}</dt>
                <dd className="metric-value mt-2 font-mono text-lg leading-snug tabular-nums tracking-tight">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <ul
              className="flex min-w-0 flex-1 flex-wrap gap-x-3 gap-y-2"
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
            <div className="flex shrink-0 flex-col items-start gap-2 sm:max-w-[14rem] sm:items-end sm:text-right">
              {project.proprietary && (
                <p className="font-mono text-xs leading-relaxed text-muted text-pretty">
                  Client work — code not public
                </p>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-link touch-link min-h-11 whitespace-nowrap px-1 font-mono text-xs"
                >
                  View source →
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </RevealOnView>
  );
}

export function Projects() {
  const grouped = projectGroups.map((group) => ({
    ...group,
    items: projects.filter((project) => project.category === group.id),
  }));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-block">
      <RevealOnView variant="heading">
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>
      </RevealOnView>
      <p className="section-lead">
        Client work and side projects — architecture, decisions, and outcomes for
        each.
      </p>

      <div className="section-body flex flex-col gap-10 sm:gap-14">
        {grouped.map((group) => (
          <div key={group.id}>
            <RevealOnView variant="heading">
              <h3 className="label-caps">{group.label}</h3>
            </RevealOnView>
            <div className="mt-6 flex flex-col sm:mt-8">
              {group.items.map((project) => (
                <ProjectArticle key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
