/** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com). */
export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url ?? "http://localhost:3000";
}
