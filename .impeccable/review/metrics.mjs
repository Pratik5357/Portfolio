import { chromium } from "playwright";

const browser = await chromium.launch();
const results = {};

for (const [label, w, h] of [["desktop", 1280, 900], ["mobile", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        height: Math.round(r.height),
        width: Math.round(r.width),
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        color: cs.color,
      };
    };

    const contrast = (fg, bg) => {
      const parse = (c) => {
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return null;
        const rgb = m.slice(1, 4).map(Number).map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
      };
      const l1 = parse(fg);
      const l2 = parse(bg);
      if (l1 == null || l2 == null) return null;
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return +(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
    };

    const bg = getComputedStyle(document.body).backgroundColor;
    const mutedEl = document.querySelector(".text-muted");
    const accentEl = document.querySelector(".motion-link");
    const bodyCopyEl = document.querySelector(".body-copy");

    const links = [...document.querySelectorAll("a")].map((a) => {
      const r = a.getBoundingClientRect();
      return {
        text: a.textContent.trim().slice(0, 40),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    });

    const sectionTitles = [...document.querySelectorAll("h2.section-title")].map(
      (h) => getComputedStyle(h).fontSize,
    );

    const labelCaps = [...document.querySelectorAll(".label-caps")].slice(0, 6).map(
      (el) => ({
        text: el.textContent.trim().slice(0, 20),
        fontSize: getComputedStyle(el).fontSize,
        letterSpacing: getComputedStyle(el).letterSpacing,
      }),
    );

    const work = document.getElementById("work-heading");
    const sectionBlock = work?.closest(".section-block");
    const mobileNav = document.querySelector("main nav.lg\\:hidden");

    return {
      heroH1: pick("h1"),
      mobileNav: pick("main nav.lg\\:hidden"),
      desktopNav: pick("aside nav"),
      sectionTitle: pick(".section-title"),
      stackRows: document.querySelectorAll(".stack-row").length,
      contactCards: document.querySelectorAll("#contact a.touch-link").length,
      scrollMarginTop: sectionBlock ? getComputedStyle(sectionBlock).scrollMarginTop : null,
      mobileNavHeight: mobileNav ? Math.round(mobileNav.getBoundingClientRect().height) : null,
      contrast: {
        mutedOnBg: mutedEl ? contrast(getComputedStyle(mutedEl).color, bg) : null,
        accentOnBg: accentEl ? contrast(getComputedStyle(accentEl).color, bg) : null,
        bodyOnBg: bodyCopyEl
          ? contrast(getComputedStyle(bodyCopyEl).color, bg)
          : null,
      },
      smallTargets: links.filter((l) => l.h < 44 && l.h > 0).slice(0, 10),
      sectionTitles,
      labelCaps,
      viewport: { w: innerWidth, h: innerHeight },
    };
  });

  results[label] = data;
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
