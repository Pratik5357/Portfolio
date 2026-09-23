import { techStack } from "@/lib/data";
import { RevealOnView } from "./RevealOnView";

export function TechStack() {
  return (
    <RevealOnView variant="section">
      <section
        id="stack"
        aria-labelledby="stack-heading"
        className="section-block section-block--ruled"
      >
        <RevealOnView variant="heading">
          <h2 id="stack-heading" className="section-title">
            Tech stack
          </h2>
        </RevealOnView>
        <p className="section-lead">
          Core is what I use at work. Secondary is stuff I&apos;ve touched but
          wouldn&apos;t claim as a specialty yet — MVC, MERN from side projects.
        </p>

        <div className="section-body grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h3 className="label-caps">Core</h3>
            <ul className="mt-5 space-y-5">
              {techStack.core.map((item) => (
                <RevealOnView
                  key={item.name}
                  as="li"
                  variant="row"
                  className="stack-row"
                >
                  <span className="min-w-0 font-medium leading-snug text-pretty">
                    {item.name}
                  </span>
                  <span className="body-copy !max-w-none !text-foreground/75">
                    {item.depth}
                  </span>
                </RevealOnView>
              ))}
            </ul>
          </div>

          <div className="min-w-0 border-t border-border pt-10 sm:pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 xl:pl-16">
            <h3 className="label-caps">Also worked with</h3>
            <ul className="mt-5 space-y-5">
              {techStack.secondary.map((item) => (
                <RevealOnView
                  key={item.name}
                  as="li"
                  variant="row"
                  className="stack-row"
                >
                  <span className="min-w-0 font-medium leading-snug text-pretty">
                    {item.name}
                  </span>
                  <span className="body-copy !max-w-none !text-foreground/75">
                    {item.depth}
                  </span>
                </RevealOnView>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </RevealOnView>
  );
}
