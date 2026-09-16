import { site } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export function JsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    email: site.contact.email,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolhapur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [site.contact.linkedin, site.contact.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
