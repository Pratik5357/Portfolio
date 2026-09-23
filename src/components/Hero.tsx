import { site } from "@/lib/data";

export function Hero() {
  return (
    <header className="motion-hero grid grid-cols-1 gap-8 pb-12 sm:gap-10 sm:pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-20">
      <div className="min-w-0 lg:col-span-7">
        <h1 className="motion-hero__name max-w-none text-[clamp(1.875rem,7.5vw,4.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-pretty sm:leading-[1.08]">
          {site.name}
        </h1>
        <p className="motion-hero__meta mt-4 font-mono text-sm leading-relaxed text-muted text-pretty sm:mt-5">
          {site.title}
        </p>
        <p className="motion-hero__meta mt-2 font-mono text-xs leading-relaxed tracking-wide text-muted text-pretty sm:mt-3">
          .NET · Web API · SQL Server · Integrations
        </p>
      </div>

      <div className="motion-hero__aside min-w-0 border-t border-border pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <p className="max-w-none text-base leading-[1.65] text-pretty text-foreground/90 sm:text-lg">
          {site.statement}
        </p>
        <p className="mt-5 font-mono text-xs leading-relaxed text-muted text-pretty sm:mt-6">
          {site.location}
        </p>
        <a
          href="#experience"
          className="motion-link touch-link mt-5 font-mono text-sm whitespace-nowrap sm:mt-6"
        >
          Experience
        </a>
      </div>
    </header>
  );
}
