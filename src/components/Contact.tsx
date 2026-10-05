import { site } from "@/lib/data";
import { ArrowUpRightIcon } from "./Icons";
import { RevealOnView } from "./RevealOnView";

type ContactLink = {
  label: string;
  href: string;
  value: string;
  external: boolean;
  valueClassName?: string;
};

const links: ContactLink[] = [
  {
    label: "Email",
    href: `mailto:${site.contact.email}`,
    value: site.contact.email,
    external: false,
    valueClassName: "copy-email",
  },
  {
    label: "LinkedIn",
    href: site.contact.linkedin,
    value: "pratik-kumbhar",
    external: true,
    valueClassName: "copy-stable",
  },
  {
    label: "GitHub",
    href: site.contact.github,
    value: "Pratik5357",
    external: true,
    valueClassName: "copy-stable",
  },
];

export function Contact() {
  return (
    <RevealOnView variant="section">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="section-block section-block--ruled"
      >
        <RevealOnView variant="heading">
          <h2 id="contact-heading" className="section-title">
            Contact
          </h2>
        </RevealOnView>
        <p className="section-lead">
          Email or LinkedIn works best. No form on purpose. I reply faster to a
          direct message.
        </p>

        <ul className="section-body contact-grid">
          {links.map((link) => (
            <RevealOnView
              key={link.label}
              as="li"
              variant="row"
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group touch-link flex min-h-11 min-w-0 w-full flex-col !items-start justify-center gap-1.5 py-5 sm:min-h-[4.5rem] sm:py-1"
              >
                <span className="label-caps transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
                <span
                  className={`motion-link inline-flex items-center gap-1.5 text-base leading-snug ${link.valueClassName ?? "copy-stable"}`}
                >
                  {link.value}
                  {link.external && (
                    <>
                      <ArrowUpRightIcon size={13} className="motion-link__arrow shrink-0" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </>
                  )}
                </span>
              </a>
            </RevealOnView>
          ))}
        </ul>
      </section>
    </RevealOnView>
  );
}
