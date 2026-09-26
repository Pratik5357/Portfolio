import { site } from "@/lib/data";
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
        className="section-block section-block--ruled pb-4"
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
                className="group touch-link flex min-h-11 min-w-0 w-full flex-col justify-center gap-1.5 py-5 sm:min-h-[4.5rem] sm:py-1"
              >
                <span className="label-caps transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
                <span
                  className={`motion-link text-base leading-snug ${link.valueClassName ?? "copy-stable"}`}
                >
                  {link.value}
                </span>
              </a>
            </RevealOnView>
          ))}
        </ul>
      </section>
    </RevealOnView>
  );
}
