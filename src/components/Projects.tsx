import { projects, type Project } from "@/lib/data";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CaseStudyAnchors } from "./CaseStudyAnchors";
import { ArrowUpRightIcon, ChevronDownIcon } from "./Icons";
import { RevealOnView } from "./RevealOnView";

const featured = projects.filter((project) => project.category === "personal");
const clientWork = projects.filter((project) => project.category === "work");
const companies = [
  ...new Set(clientWork.map((project) => project.company).filter(Boolean)),
].join(", ");

function ProjectContext({ context }: { context: string[] }) {
  return (
    <ul className="label-caps project-meta" aria-label="Project context">
      {context.map((item) => (
        <li key={item} className="project-meta__item">
          {item}
        </li>
      ))}
    </ul>
  );
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
      {stack.map((tech) => (
        <li key={tech} className="stack-tag copy-stable">
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Metrics({ metrics }: { metrics: Project["metrics"] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="case-metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex min-w-0 flex-col border-l border-border pl-4">
          <dt className="label-caps">{metric.label}</dt>
          <dd className="metric-value mt-auto pt-2 font-mono text-lg leading-snug tabular-nums tracking-tight">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CaseNote({ label, children }: { label: string; children: string }) {
  return (
    <div className="min-w-0">
      <h5 className="label-caps">{label}</h5>
      <p className="body-copy mt-3">{children}</p>
    </div>
  );
}

function CaseStudyToggle() {
  return (
    <summary className="case-toggle motion-link touch-link inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs">
      <span className="group-open:hidden">Read the case study</span>
      <span className="hidden group-open:inline">Hide case study</span>
      <ChevronDownIcon
        size={13}
        className="case-toggle__chevron group-open:rotate-180"
      />
    </summary>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="project-panel scroll-mt-24 p-5 sm:p-8 lg:scroll-mt-28 lg:p-10"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h4
              id={`${project.id}-title`}
              className="text-[1.375rem] font-medium leading-tight tracking-[-0.025em] text-balance sm:text-[1.625rem]"
            >
              {project.title}
            </h4>
            {project.demoUrl && (
              <span className="status-tag">Live</span>
            )}
          </div>
          <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-pretty text-copy sm:text-lg">
            {project.verdict}
          </p>
          {project.context.length > 0 && (
            <div className="mt-4">
              <ProjectContext context={project.context} />
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live (opens in a new tab)`}
                className="cta cta--primary touch-link"
              >
                View live
                <ArrowUpRightIcon size={13} className="motion-link__arrow" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}
                className="cta cta--secondary touch-link"
              >
                View source
                <ArrowUpRightIcon size={13} className="motion-link__arrow" />
              </a>
            )}
          </div>

          <div className="mt-8">
            <StackTags stack={project.stack} />
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <Metrics metrics={project.metrics} />
            </div>
          )}
        </div>

        <div className="min-w-0 lg:col-span-5">
          <h5 className="label-caps mb-4">Architecture</h5>
          <ArchitectureDiagram architecture={project.architecture} id={project.id} />
        </div>
      </div>

      <details className="group mt-8 border-t border-border pt-2 sm:mt-10">
        <CaseStudyToggle />
        <div className="grid gap-8 pt-4 pb-1 lg:grid-cols-3 lg:gap-10">
          <CaseNote label="Problem">{project.problem}</CaseNote>
          <CaseNote label="Decision">{project.decision}</CaseNote>
          <CaseNote label="Outcome">{project.outcome}</CaseNote>
        </div>
      </details>
    </article>
  );
}

function ClientProject({ project }: { project: Project }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="project-panel flex h-full scroll-mt-24 flex-col p-5 sm:p-7 lg:scroll-mt-28"
    >
      <h4
        id={`${project.id}-title`}
        className="text-lg font-medium sm:text-xl leading-snug tracking-[-0.02em] text-balance"
      >
        {project.title}
      </h4>
      <p className="mt-2.5 text-sm leading-relaxed text-pretty text-copy">
        {project.verdict}
      </p>
      <div className="mt-5">
        <StackTags stack={project.stack} />
      </div>

      <details className="group mt-auto pt-4">
        <CaseStudyToggle />
        <div className="grid gap-8 border-t border-border pt-6 pb-1 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <CaseNote label="Problem">{project.problem}</CaseNote>
            <CaseNote label="Decision">{project.decision}</CaseNote>
            <CaseNote label="Outcome">{project.outcome}</CaseNote>
          </div>
          <div className="min-w-0 space-y-8 lg:col-span-5">
            <div>
              <h5 className="label-caps mb-4">Architecture</h5>
              <ArchitectureDiagram architecture={project.architecture} id={project.id} />
            </div>
            <Metrics metrics={project.metrics} />
          </div>
        </div>
      </details>
    </article>
  );
}

function GroupHeading({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:mb-6">
      <h3 id={id} className="label-caps label-caps--strong">
        {title}
      </h3>
      <p className="font-mono text-xs leading-relaxed text-muted">{note}</p>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-block section-block--ruled"
    >
      <CaseStudyAnchors />
      <RevealOnView variant="heading">
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>
      </RevealOnView>
      <p className="section-lead">
        Selected work, with the architecture, the decisions, and the outcomes behind it. Repo linked where I can share one.
      </p>

      <div className="section-body">
        <section aria-labelledby="projects-featured-heading">
          <GroupHeading
            id="projects-featured-heading"
            title="Personal builds"
            note="Live demos, source on GitHub"
          />
          <div className="flex flex-col gap-6 sm:gap-8">
            {featured.map((project) => (
              <RevealOnView key={project.id} variant="item">
                <FeaturedProject project={project} />
              </RevealOnView>
            ))}
          </div>
        </section>

        <section aria-labelledby="projects-client-heading" className="mt-14 sm:mt-20">
          <GroupHeading
            id="projects-client-heading"
            title="Client work"
            note={`${companies}, code not public`}
          />
          <div className="project-index">
            {clientWork.map((project) => (
              <RevealOnView key={project.id} variant="item">
                <ClientProject project={project} />
              </RevealOnView>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
