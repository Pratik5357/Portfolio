import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { NavDock } from "@/components/NavDock";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--focus-ring)]"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-8 sm:py-14 sm:pb-32 lg:py-16">
        <main id="main-content" className="min-w-0">
          <Hero />
          <div className="mt-12 space-y-0 sm:mt-16 lg:mt-20">
            <Experience />
            <Projects />
            <TechStack />
            <Contact />
          </div>
          <footer className="mt-12 border-t border-border pt-6 sm:mt-16 sm:pt-8 lg:mt-20">
            <p className="font-mono text-xs leading-relaxed text-muted">
              {new Date().getFullYear()} · Pratik Keraba Kumbhar
            </p>
          </footer>
        </main>
      </div>
      <NavDock />
    </>
  );
}
