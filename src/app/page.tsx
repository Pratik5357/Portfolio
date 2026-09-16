import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import { TechStack } from "@/components/TechStack";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--focus-ring)]"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden min-w-0 lg:col-span-2 lg:block lg:pt-2">
            <ThemeToggle className="mb-8 w-full justify-center" />
            <ScrollSpyNav variant="desktop" />
          </aside>

          <main id="main-content" className="min-w-0 lg:col-span-10">
            <ScrollSpyNav variant="mobile" />
            <Hero />
            <div className="mt-12 space-y-0 sm:mt-16 lg:mt-20">
              <Projects />
              <TechStack />
              <Experience />
              <Contact />
            </div>
            <footer className="mt-12 border-t border-border pt-6 sm:mt-16 sm:pt-8 lg:mt-20">
              <p className="font-mono text-xs leading-relaxed text-muted">
                {new Date().getFullYear()} · Pratik Keraba Kumbhar
              </p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
