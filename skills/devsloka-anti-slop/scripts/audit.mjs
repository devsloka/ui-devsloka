#!/usr/bin/env node
// Screenshot + quality audit for a landing page. Zero dependencies (Node 22+, any Chromium-based browser).
//
//   node audit.mjs <url> [--out <dir>] [--widths 375,768,1024,1440] [--themes auto|light,dark]
//                        [--reduced-motion] [--wait <ms>] [--max-section-height <px>]
//
// Writes <out>/report.md, <out>/report.json and PNGs:
//   <width>[-<theme>]-00-full.png      whole page, scaled down (overview / squint test)
//   <width>[-<theme>]-NN-<section>[-K].png  each top-level section at real size, one screen per file
// Exit code 1 if any FAIL.
//
// --themes auto (default) shoots the page as served. light,dark also emulates prefers-color-scheme and toggles
// the `dark` class on <html>, so only use it for pages that support both modes.
// Set CHROME_PATH to pick a browser explicitly.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

// ---------- args ----------
const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const flag = (name) => argv.includes(`--${name}`);
const url = argv.find((a) => /^https?:\/\//.test(a));
if (!url) { console.error("Usage: node audit.mjs <url> [--out dir] [--widths 375,768,1024,1440] [--themes auto|light,dark]"); process.exit(2); }
const OUT = opt("out", join(tmpdir(), `slop-audit-${Date.now()}`));
const WIDTHS = opt("widths", "375,768,1024,1440").split(",").map(Number);
const THEMES = opt("themes", "auto").split(",");
const REDUCED = flag("reduced-motion");
const WAIT = Number(opt("wait", "1200"));
const MAX_SECTION_H = Number(opt("max-section-height", "2400"));
mkdirSync(OUT, { recursive: true });

// ---------- browser ----------
function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  // Playwright's downloaded browsers.
  for (const root of [join(homedir(), "Library/Caches/ms-playwright"), join(homedir(), ".cache/ms-playwright")]) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root).filter((d) => d.startsWith("chromium")).sort().reverse()) {
      const base = join(root, dir);
      const found = [
        "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        "chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
        "chrome-mac/Chromium.app/Contents/MacOS/Chromium",
        "chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium",
        "chrome-linux/chrome", "chrome-linux64/chrome",
      ].map((p) => join(base, p)).find(existsSync);
      if (found) return found;
    }
  }
  return null;
}

const browserPath = findBrowser();
if (!browserPath) { console.error("No Chromium-based browser found. Install Chrome or set CHROME_PATH."); process.exit(2); }
const profile = mkdtempSync(join(tmpdir(), "slop-audit-profile-"));
const browser = spawn(browserPath, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run",
  "--no-default-browser-check", "--hide-scrollbars", "--mute-audio", "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader", "--disable-background-timer-throttling", "--disable-renderer-backgrounding",
  "--disable-backgrounding-occluded-windows", "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

const wsUrl = await new Promise((resolve, reject) => {
  let buf = "";
  const t = setTimeout(() => reject(new Error("Browser did not start")), 20000);
  browser.stderr.on("data", (d) => {
    buf += d;
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearTimeout(t); resolve(m[1]); }
  });
  browser.on("exit", (code) => reject(new Error(`Browser exited (${code})`)));
});

// ---------- CDP ----------
const ws = new WebSocket(wsUrl);
await new Promise((r, j) => { ws.addEventListener("open", r); ws.addEventListener("error", j); });
let nextId = 1;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(`${msg.error.message}`));
    else resolve(msg.result);
  } else if (msg.method) for (const l of listeners) l(msg);
});
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params, sessionId }));
});
const waitFor = (method, sessionId, timeout = 30000) => new Promise((resolve) => {
  const t = setTimeout(() => { done(); resolve(null); }, timeout);
  const l = (m) => { if (m.method === method && m.sessionId === sessionId) { clearTimeout(t); done(); resolve(m.params); } };
  const done = () => listeners.splice(listeners.indexOf(l), 1);
  listeners.push(l);
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId: S } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, S);
await send("Runtime.enable", {}, S);
await send("Log.enable", {}, S);

const consoleErrors = [];
listeners.push((m) => {
  if (m.sessionId !== S) return;
  if (m.method === "Runtime.exceptionThrown") consoleErrors.push(`exception: ${m.params.exceptionDetails?.exception?.description?.split("\n")[0] ?? m.params.exceptionDetails?.text}`);
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") consoleErrors.push(`console.error: ${m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300)}`);
  if (m.method === "Log.entryAdded" && m.params.entry.level === "error") consoleErrors.push(`${m.params.entry.source}: ${m.params.entry.text.slice(0, 200)}${m.params.entry.url ? ` (${m.params.entry.url})` : ""}`);
});

const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, S);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};
// beyond=true renders regions outside the viewport (used only for the scaled overview). Section shots stay
// inside the viewport: capturing beyond it under mobile emulation can re-lay the page out wider than the phone.
const shoot = async (file, clip, beyond = false) => {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: beyond, ...(clip ? { clip } : {}) }, S);
  writeFileSync(join(OUT, file), Buffer.from(data, "base64"));
  return file;
};

// ---------- in-page probes ----------
// Also force instant scrolling: pages with `scroll-behavior: smooth` (or Lenis) would still be mid-scroll when we shoot.
const HIDE_DEV = `document.querySelectorAll("nextjs-portal, [data-nextjs-toast], #__next-build-watcher").forEach(e => e.style.setProperty("display","none","important"));
  document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
  document.body.style.setProperty("scroll-behavior", "auto", "important");`;

const SCROLL_PASS = `(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const step = Math.max(200, innerHeight * 0.7);
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo({ top: y, behavior: "instant" }); await sleep(140); }
  scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }); await sleep(400);
  scrollTo({ top: 0, behavior: "instant" }); await sleep(500);
  await document.fonts.ready;
  return document.documentElement.scrollHeight;
})()`;

const SECTIONS = `(() => {
  let root = document.querySelector("main") || document.body;
  while (root.children.length === 1 && root.firstElementChild.children.length > 1) root = root.firstElementChild;
  const els = [];
  const header = document.querySelector("body header, [role=banner]");
  if (header && !root.contains(header)) els.push(header);
  els.push(...root.children);
  document.querySelectorAll("body footer, [role=contentinfo]").forEach(f => { if (!root.contains(f) && !els.includes(f)) els.push(f); });
  return els.map((el) => {
    const r = el.getBoundingClientRect();
    const h = el.querySelector("h1,h2,h3");
    const name = el.id || el.getAttribute("aria-label") || (h && h.textContent.trim()) || el.tagName.toLowerCase();
    return { top: r.top + scrollY, height: r.height, name: name.slice(0, 60) };
  }).filter((s) => s.height >= 60);
})()`;

const METRICS = `(async () => {
  // Measure against the device width, not innerWidth: when content is too wide, mobile Chrome widens the
  // layout viewport (the page zooms out), which would hide the overflow from an innerWidth comparison.
  const W = __DEVICE_WIDTH__;
  const layoutWidth = innerWidth;
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0; };
  const desc = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".") : "");
  const all = [...document.body.querySelectorAll("*")].filter(el => !["SCRIPT","STYLE","NOSCRIPT","TEMPLATE"].includes(el.tagName));

  // Horizontal overflow. An element counts when it runs past the right edge and no ancestor below <body>
  // clips or scrolls it. That also catches content the page hides with overflow-x on html/body, which
  // never shows up as a horizontal scrollbar but still cuts text off on phones. Fixed layers (off-canvas
  // menus) and hidden or aria-hidden content are ignored.
  const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") return true; } return false; };
  const inFixedLayer = (el) => { for (let p = el; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).position === "fixed") return true; return false; };
  const docOverflow = document.documentElement.scrollWidth - W;
  const wide = all.filter(el => { const r = el.getBoundingClientRect(); return r.right > W + 1 && r.width > 0 && vis(el) && !clipped(el) && !inFixedLayer(el) && !el.closest("[aria-hidden=true],[inert],[hidden]"); });
  const offenders = wide.slice(0, 8).map(el => desc(el) + " → right " + Math.round(el.getBoundingClientRect().right) + "px");
  const hiddenOverflow = docOverflow <= 1 && wide.length > 0;

  // Text styles.
  const textEls = all.filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1) && vis(el));
  const families = {}; const sizes = {}; let tiny = 0;
  for (const el of textEls) { const s = getComputedStyle(el); const f = s.fontFamily.split(",")[0].replace(/["']/g, "").trim(); families[f] = (families[f] || 0) + 1; const px = Math.round(parseFloat(s.fontSize)); sizes[px] = (sizes[px] || 0) + 1; if (px < 12) tiny++; }

  // Effective opacity: content still invisible after the scroll pass (animation never fired?).
  const effOpacity = (el) => { let o = 1; for (let p = el; p && p !== document.documentElement; p = p.parentElement) o *= parseFloat(getComputedStyle(p).opacity); return o; };
  const invisible = textEls.filter(el => effOpacity(el) < 0.05 && !el.closest("[aria-hidden=true],[role=dialog],[hidden],[inert]")).slice(0, 8).map(el => desc(el) + ": " + el.textContent.trim().slice(0, 50));

  // Shape, spacing, colour.
  const radii = {}; let spacingTotal = 0, spacingOff = 0; const offSamples = new Set();
  let purple = 0, gradients = 0, purpleGradients = 0, gradientText = 0; const bg = new Set(); const fg = new Set();
  const hue = (r, g, b) => { r/=255; g/=255; b/=255; const mx = Math.max(r,g,b), mn = Math.min(r,g,b), l = (mx+mn)/2; if (mx === mn) return [0,0,l]; const d = mx-mn; const s = l > .5 ? d/(2-mx-mn) : d/(mx+mn); let h = mx === r ? (g-b)/d + (g<b?6:0) : mx === g ? (b-r)/d + 2 : (r-g)/d + 4; return [h*60, s, l]; };
  // Purple-ish: rgb() in hue 250–300, or oklch()/lch() with hue 270–320 and real chroma (Tailwind v4 emits oklch).
  const isPurple = (str) =>
    [...str.matchAll(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/g)].some(m => { const [h,s,l] = hue(+m[1],+m[2],+m[3]); return h >= 250 && h <= 300 && s > .35 && l > .2 && l < .8; }) ||
    [...str.matchAll(/(?:ok)?lch\\(\\s*([\\d.]+)%?\\s+([\\d.]+)\\s+([\\d.]+)/g)].some(m => { const L = +m[1] > 1 ? +m[1] / 100 : +m[1]; const C = +m[2]; const H = +m[3]; const chroma = str.includes("oklch") ? C > 0.08 : C > 30; return H >= 270 && H <= 320 && chroma && L > .25 && L < .85; });
  for (const el of all.slice(0, 4000)) {
    if (!vis(el)) continue;
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    const rad = s.borderTopLeftRadius; if (rad !== "0px" && r.width >= 24 && r.height >= 24) { const v = parseFloat(rad) >= 999 ? "full" : Math.round(parseFloat(rad)) + "px"; radii[v] = (radii[v] || 0) + 1; }
    for (const p of ["paddingTop","paddingBottom","paddingLeft","paddingRight","marginTop","marginBottom","rowGap","columnGap"]) { const v = parseFloat(s[p]); if (v > 2) { spacingTotal++; if (Math.abs(v - Math.round(v / 4) * 4) > 0.6) { spacingOff++; if (offSamples.size < 6) offSamples.add(desc(el) + " " + p + "=" + v + "px"); } } }
    if (s.backgroundColor !== "rgba(0, 0, 0, 0)") { bg.add(s.backgroundColor); if (isPurple(s.backgroundColor)) purple++; }
    fg.add(s.color); if (isPurple(s.color)) purple++;
    if (s.backgroundImage.includes("gradient")) { gradients++; if (isPurple(s.backgroundImage)) purpleGradients++; }
    if ((s.backgroundClip === "text" || s.webkitBackgroundClip === "text") && el.textContent.trim()) gradientText++;
  }

  // Tap targets (mobile only).
  let smallTargets = []; if (W < 768) smallTargets = [...document.querySelectorAll("a[href], button, [role=button], input:not([type=hidden]), select, textarea")].filter(el => vis(el) && !el.closest("p, li p") ).filter(el => { const r = el.getBoundingClientRect(); return r.width < 40 || r.height < 40; }).map(el => desc(el) + " " + Math.round(el.getBoundingClientRect().width) + "×" + Math.round(el.getBoundingClientRect().height) + " " + (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30));

  return { width: W, layoutWidth, docOverflow, hiddenOverflow, offenders, families, sizes, tinyText: W < 768 ? tiny : 0, invisible, radii, spacingTotal, spacingOff, offSamples: [...offSamples], purple, gradients, purpleGradients, gradientText, bgColors: bg.size, textColors: fg.size, smallTargets: smallTargets.slice(0, 10), smallTargetCount: smallTargets.length };
})()`;

const SEO = `(async () => {
  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const h = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(e => ({ level: +e.tagName[1], text: e.textContent.trim().slice(0, 80) }));
  const skips = []; for (let i = 1; i < h.length; i++) if (h[i].level > h[i-1].level + 1) skips.push(h[i-1].level + "→" + h[i].level + " (" + h[i].text + ")");
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => { try { const j = JSON.parse(s.textContent); const items = Array.isArray(j) ? j : j["@graph"] ?? [j]; return items.map(i => i["@type"]); } catch { return ["(invalid JSON)"]; } });
  const imgs = [...document.querySelectorAll("img")];
  const nameless = [...document.querySelectorAll("a[href], button")].filter(el => !(el.textContent.trim() || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("title") || el.querySelector("img[alt]:not([alt=''])"))).map(el => el.outerHTML.slice(0, 100));
  const perf = await new Promise((res) => {
    let lcp = null, cls = 0;
    try { new PerformanceObserver(l => { const e = l.getEntries().at(-1); if (e) lcp = { ms: Math.round(e.startTime), element: e.element ? e.element.tagName.toLowerCase() + (e.element.id ? "#" + e.element.id : "") : null }; }).observe({ type: "largest-contentful-paint", buffered: true }); } catch {}
    try { new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; }).observe({ type: "layout-shift", buffered: true }); } catch {}
    setTimeout(() => res({ lcp, cls: Math.round(cls * 1000) / 1000 }), 300);
  });
  const bodyText = document.body.innerText;
  const demoCopy = ["Bramble", "Plinth", "Pallet", "pallet.sh", "orders-api", "haworthia", "Lorem ipsum", "lorem ipsum", "John Doe"].filter(w => bodyText.includes(w));
  const banned = ["unlock", "unleash", "supercharge", "revolutioni", "seamless", "effortless", "elevate", "empower", "game-changer", "cutting-edge", "next-level", "leverage", "harness the power", "fast-paced", "transform your", "all-in-one", "streamline", "world-class", "best-in-class", "robust", "say goodbye to", "look no further", "like never before", "at your fingertips", "reimagine"]
    .filter(p => new RegExp("\\\\b" + p, "i").test(bodyText));
  return {
    demoCopy, banned,
    title: document.title, description: meta('meta[name="description"]'), canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
    ogTitle: meta('meta[property="og:title"]'), ogDescription: meta('meta[property="og:description"]'), ogImage: meta('meta[property="og:image"]'),
    twitterCard: meta('meta[name="twitter:card"]'), lang: document.documentElement.lang, viewport: meta('meta[name="viewport"]'),
    h1: h.filter(x => x.level === 1).map(x => x.text), headingSkips: skips, headings: h.length,
    imgMissingAlt: imgs.filter(i => !i.hasAttribute("alt")).map(i => i.src.slice(0, 100)), imgCount: imgs.length,
    namelessControls: nameless.slice(0, 6), jsonLd: ld,
    landmarks: { header: document.querySelectorAll("header").length, nav: document.querySelectorAll("nav").length, main: document.querySelectorAll("main").length, footer: document.querySelectorAll("footer").length },
    ...perf,
  };
})()`;

// ---------- run ----------
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "section";
const results = { url, out: OUT, browser: browserPath, widths: {}, seo: null, consoleErrors: [], shots: [] };

for (const width of WIDTHS) {
  for (const theme of THEMES) {
    const mobile = width < 768;
    const height = mobile ? 812 : width < 1200 ? 1000 : 900;
    const tag = theme === "auto" ? `${width}` : `${width}-${theme}`;
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, S);
    await send("Emulation.setTouchEmulationEnabled", { enabled: mobile }, S);
    const features = [{ name: "prefers-reduced-motion", value: REDUCED ? "reduce" : "no-preference" }];
    if (theme !== "auto") features.push({ name: "prefers-color-scheme", value: theme });
    await send("Emulation.setEmulatedMedia", { features }, S);

    const loaded = waitFor("Page.loadEventFired", S, 45000);
    await send("Page.navigate", { url }, S);
    if (!(await loaded)) console.warn(`[${tag}] load event timed out; continuing`);
    await sleep(WAIT);
    if (theme !== "auto") await evaluate(`document.documentElement.classList.toggle("dark", ${theme === "dark"}); document.documentElement.style.colorScheme = "${theme}"`);
    await evaluate(HIDE_DEV);

    if (!results.seo) results.seo = await evaluate(SEO);
    const docHeight = await evaluate(SCROLL_PASS);
    await evaluate(HIDE_DEV);
    const metrics = await evaluate(METRICS.replace("__DEVICE_WIDTH__", String(width)));
    results.widths[tag] = metrics;

    // Full-page overview, scaled so it stays legible as a thumbnail.
    const scale = Math.min(1, 6000 / docHeight, 1);
    const overviewScale = Math.min(scale, mobile ? 0.5 : 0.35);
    results.shots.push(await shoot(`${tag}-00-full.png`, { x: 0, y: 0, width, height: docHeight, scale: overviewScale }, true));

    // Per-section shots: scroll each into view first so in-view and scroll-driven states are live.
    const sections = await evaluate(SECTIONS);
    let i = 1;
    // Each section is shot one screen at a time, the way a visitor sees it: <section>.png, then -2.png, -3.png…
    for (const s of sections) {
      const total = Math.min(s.height, MAX_SECTION_H);
      for (let offset = 0, part = 1; offset < total; offset += height, part++) {
        const top = Math.round(s.top + offset);
        const y = await evaluate(`(scrollTo({ top: ${top}, behavior: "instant" }), scrollY)`);
        await sleep(450);
        const h = Math.max(1, Math.round(Math.min(height, total - offset, height - (top - y))));
        const file = `${tag}-${String(i).padStart(2, "0")}-${slug(s.name)}${part > 1 ? `-${part}` : ""}.png`;
        results.shots.push(await shoot(file, { x: 0, y: top, width, height: h, scale: 1 }));
      }
      i++;
    }
    results.widths[tag].sections = sections.map((s) => `${s.name} (${Math.round(s.height)}px${s.height > MAX_SECTION_H ? ", cropped" : ""})`);
  }
}
// Vercel Analytics and Speed Insights scripts only exist on Vercel deployments; locally they always 404.
results.consoleErrors = [...new Set(consoleErrors)].filter((e) => !e.includes("/_vercel/"));

// ---------- verdicts ----------
const fails = [], warns = [], infos = [];
const seo = results.seo;
if (!seo.title) fails.push("No <title>"); else if (seo.title.length > 65) warns.push(`Title is ${seo.title.length} chars (aim ≤ 60): "${seo.title}"`);
if (!seo.description) fails.push("No meta description"); else if (seo.description.length < 110 || seo.description.length > 170) warns.push(`Meta description is ${seo.description.length} chars (aim 140–160)`);
if (seo.h1.length !== 1) fails.push(`${seo.h1.length} <h1> elements (need exactly 1): ${JSON.stringify(seo.h1)}`);
if (!seo.lang) fails.push("<html> has no lang");
if (seo.imgMissingAlt.length) fails.push(`${seo.imgMissingAlt.length} <img> without alt: ${seo.imgMissingAlt.slice(0, 3).join(", ")}`);
if (seo.namelessControls.length) fails.push(`Links/buttons without an accessible name: ${seo.namelessControls.slice(0, 3).join(" | ")}`);
if (seo.banned.length) fails.push(`Banned marketing phrases in rendered copy: ${seo.banned.join(", ")}`);
if (seo.demoCopy.length) fails.push(`Demo/placeholder copy rendered on the page: ${seo.demoCopy.join(", ")} (a block still shows its DEFAULTS)`);
if (!seo.canonical) warns.push("No canonical link");
if (!seo.ogTitle || !seo.ogImage) warns.push(`Open Graph incomplete (og:title ${seo.ogTitle ? "ok" : "missing"}, og:image ${seo.ogImage ? "ok" : "missing"})`);
if (!seo.twitterCard) warns.push("No twitter:card");
if (!seo.jsonLd.length) warns.push("No JSON-LD structured data"); else infos.push(`JSON-LD types: ${seo.jsonLd.join(", ")}`);
if (seo.headingSkips.length) warns.push(`Heading level skips: ${seo.headingSkips.slice(0, 4).join("; ")}`);
if (!seo.landmarks.main) warns.push("No <main> landmark");
if (seo.lcp) (seo.lcp.ms > 2500 ? warns : infos).push(`LCP ${seo.lcp.ms}ms on ${seo.lcp.element} (dev servers are slower than production)`);
(seo.cls > 0.1 ? warns : infos).push(`CLS ${seo.cls}`);
if (results.consoleErrors.length) fails.push(`${results.consoleErrors.length} console/runtime errors:\n    - ${results.consoleErrors.slice(0, 8).join("\n    - ")}`);

for (const [tag, m] of Object.entries(results.widths)) {
  if (m.layoutWidth > m.width + 1) fails.push(`[${tag}] The page lays out ${m.layoutWidth}px wide on a ${m.width}px screen, so phones zoom it out. Widest elements: ${m.offenders.slice(0, 4).join("; ")}`);
  else if (m.docOverflow > 1) fails.push(`[${tag}] Horizontal overflow of ${m.docOverflow}px: ${m.offenders.slice(0, 4).join("; ")}`);
  else if (m.hiddenOverflow) fails.push(`[${tag}] Content runs past the right edge and is cut off (the page hides overflow, so there is no scrollbar): ${m.offenders.slice(0, 4).join("; ")}`);
  if (m.gradientText) fails.push(`[${tag}] ${m.gradientText} gradient-text element(s)`);
  if (m.purpleGradients) fails.push(`[${tag}] ${m.purpleGradients} purple gradient(s) rendered`);
  if (m.invisible.length) warns.push(`[${tag}] Text still invisible after scrolling (animation never fired?): ${m.invisible.slice(0, 3).join(" | ")}`);
  if (m.smallTargetCount) warns.push(`[${tag}] ${m.smallTargetCount} tap targets under 40px: ${m.smallTargets.slice(0, 3).join(" | ")}`);
  if (m.tinyText) warns.push(`[${tag}] ${m.tinyText} text elements under 12px`);
  if (tag.startsWith("1440") || tag === String(WIDTHS.at(-1))) {
    const fams = Object.keys(m.families);
    if (fams.length > 3) warns.push(`[${tag}] ${fams.length} font families rendered: ${fams.join(", ")}`);
    infos.push(`[${tag}] Fonts: ${Object.entries(m.families).sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f} (${n})`).join(", ")}`);
    const sizeCount = Object.keys(m.sizes).length;
    (sizeCount > 12 ? warns : infos).push(`[${tag}] ${sizeCount} distinct font sizes: ${Object.keys(m.sizes).map(Number).sort((a, b) => a - b).join(", ")}px`);
    const radii = Object.entries(m.radii).sort((a, b) => b[1] - a[1]);
    const nonFull = radii.filter(([r]) => r !== "full");
    (nonFull.length > 4 ? warns : infos).push(`[${tag}] Radii: ${radii.map(([r, n]) => `${r}×${n}`).join(", ") || "none"}`);
    const pct = m.spacingTotal ? Math.round((m.spacingOff / m.spacingTotal) * 100) : 0;
    (pct > 15 ? warns : infos).push(`[${tag}] ${pct}% of spacing values off the 4px grid${m.offSamples.length ? `: ${m.offSamples.slice(0, 3).join("; ")}` : ""}`);
    if (m.purple > 3) warns.push(`[${tag}] ${m.purple} elements use purple/violet colours`);
    infos.push(`[${tag}] ${m.gradients} gradient backgrounds · ${m.bgColors} background colours · ${m.textColors} text colours`);
    infos.push(`[${tag}] Sections: ${m.sections.join(" · ")}`);
  }
}

const md = [
  `# Landing page audit`,
  ``,
  `${url} · ${new Date().toISOString()} · widths ${WIDTHS.join(", ")} · themes ${THEMES.join(", ")}${REDUCED ? " · reduced motion" : ""}`,
  ``,
  `## FAIL (${fails.length})`, ...(fails.length ? fails.map((f) => `- ${f}`) : ["- none"]),
  ``,
  `## WARN (${warns.length})`, ...(warns.length ? warns.map((w) => `- ${w}`) : ["- none"]),
  ``,
  `## INFO`, ...infos.map((i) => `- ${i}`),
  ``,
  `## SEO snapshot`,
  `- title: ${seo.title}`, `- description: ${seo.description}`, `- h1: ${seo.h1.join(" | ")}`, `- canonical: ${seo.canonical}`, `- og:image: ${seo.ogImage}`,
  ``,
  `## Screenshots (in ${OUT})`,
  ...results.shots.map((s) => `- ${s}`),
  ``,
  `Next: open the section screenshots (1440 and 375 first) and score each section with the rubric in references/anti-slop.md.`,
].join("\n");
writeFileSync(join(OUT, "report.md"), md);
writeFileSync(join(OUT, "report.json"), JSON.stringify({ ...results, fails, warns, infos }, null, 2));

console.log(`audit: ${fails.length} FAIL · ${warns.length} WARN · ${results.shots.length} screenshots → ${OUT}`);
for (const f of fails) console.log(`FAIL ${f}`);
for (const w of warns) console.log(`WARN ${w}`);
console.log(`Report: ${join(OUT, "report.md")}`);

try { await send("Browser.close"); } catch {}
ws.close();
browser.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(fails.length ? 1 : 0);
