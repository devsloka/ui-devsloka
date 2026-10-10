// Screenshots each component, background, hook and block demo into public/images/<slug>.png.
// These images are the cards on /components, the landing page's index previews and the
// pages' Open Graph images, so re-run this whenever a demo changes.
//
//   npm run build && npm run start          (in another terminal)
//   npm run previews                        all items
//   npm run previews -- morphing-nav tour   only these slugs
//
// Uses a local Chromium-based browser over the DevTools protocol (no extra dependencies).
// Set CHROME_PATH if it isn't found, and BASE_URL if the site isn't on localhost:3000.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const PORT = 9339;
const VIEWPORT = { width: 1440, height: 1100 };
const SETTLE_MS = 2500;

const BROWSERS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const slugsIn = (dir, ext) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(ext))
    .map((file) => file.slice(0, -ext.length));

// Hidden items stay in src/registry but are left out of registry.json.
const PUBLISHED = new Set(
  JSON.parse(readFileSync("registry.json", "utf8")).items.map((item) => item.name)
);

const ITEMS = [
  ...slugsIn("src/registry/ui", ".tsx").map((slug) => ({ slug, path: `/components/${slug}` })),
  ...slugsIn("src/registry/backgrounds", ".tsx").filter((slug) => PUBLISHED.has(slug)).map((slug) => ({
    slug,
    path: `/components/backgrounds/${slug}`,
  })),
  ...slugsIn("src/registry/hooks", ".ts").map((slug) => ({ slug, path: `/utilities/${slug}` })),
  // Blocks are keyed by their docs slug; the first preview on the page is the main block.
  ...[...readFileSync("src/utilities/blocks.utils.ts", "utf8").matchAll(/\n  "([a-z0-9-]+)": \{\n    block:/g)]
    .map(([, slug]) => ({ slug, path: `/blocks/${slug}` })),
];

// Overlays only show their real UI once opened, so open them before capturing.
const PREPARE = {
  tour: `[...document.querySelectorAll("main button")].find((b) => /tour/i.test(b.textContent))?.click()`,
  "morphing-modal": `document.querySelector("main [role=tabpanel] button[aria-haspopup=dialog]")?.click()`,
};

// Modals render outside the preview panel, so frame the dialog itself instead.
const FRAME_DIALOG = new Set(["morphing-modal"]);

// Scroll-driven demos have very tall panels; crop a window around the device instead.
const CENTER_ON = {
  "animated-smartwatch": "time",
  "laptop-closes-on-scroll": "img",
};
const CROPPED_HEIGHT = 640;

// Cards show previews at 16:10; crop to the demo plus padding at that ratio.
const ASPECT = 16 / 10;
const PADDING = 48;

// Floating widgets that would otherwise appear in every screenshot.
const HIDE_OVERLAYS = `document.querySelectorAll(".fixed.bottom-6.right-6").forEach((el) => (el.style.display = "none"))`;

const clipExpression = (frameDialog, centerOn) => `(() => {
  const target = ${frameDialog}
    ? document.querySelector("[role=dialog][aria-modal=true]") ?? document.querySelector("[role=dialog]")
    : document.querySelector("main [role=tabpanel][data-state=active]");
  if (!target) return null;
  const r = target.getBoundingClientRect();
  const anchor = ${JSON.stringify(centerOn ?? null)} && target.querySelector(${JSON.stringify(centerOn ?? "")});
  if (anchor) {
    const a = anchor.getBoundingClientRect();
    const top = Math.max(r.top, a.top + a.height / 2 - ${CROPPED_HEIGHT} / 2);
    return { x: r.left, y: top + window.scrollY, width: r.width, height: ${CROPPED_HEIGHT} };
  }
  if (!${frameDialog}) {
    // Union of the demo's own elements inside the preview wrapper.
    const parts = [...(target.firstElementChild?.children ?? [])]
      .map((el) => el.getBoundingClientRect())
      .filter((b) => b.width && b.height);
    if (parts.length) {
      const left = Math.min(...parts.map((b) => b.left)) - ${PADDING};
      const top = Math.min(...parts.map((b) => b.top)) - ${PADDING};
      let width = Math.max(...parts.map((b) => b.right)) + ${PADDING} - left;
      let height = Math.max(...parts.map((b) => b.bottom)) + ${PADDING} - top;
      if (width / height > ${ASPECT}) height = width / ${ASPECT};
      else width = height * ${ASPECT};
      const cx = left + (Math.max(...parts.map((b) => b.right)) + ${PADDING} - left) / 2;
      const cy = top + (Math.max(...parts.map((b) => b.bottom)) + ${PADDING} - top) / 2;
      // Keep the crop inside the preview panel.
      width = Math.min(width, r.width);
      height = Math.min(height, r.height);
      const x = Math.min(Math.max(cx - width / 2, r.left), r.right - width);
      const y = Math.min(Math.max(cy - height / 2, r.top), r.bottom - height);
      return { x, y: y + window.scrollY, width, height };
    }
  }
  const pad = ${frameDialog} ? 48 : 0;
  return {
    x: Math.max(r.left - pad, 0),
    y: Math.max(r.top - pad, 0) + window.scrollY,
    width: r.width + pad * 2,
    height: r.height + pad * 2,
  };
})()`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const browserPath = BROWSERS.find((path) => existsSync(path));
  if (!browserPath) {
    console.error("No Chromium-based browser found. Set CHROME_PATH.");
    process.exit(1);
  }

  const only = process.argv.slice(2);
  const items = only.length ? ITEMS.filter((item) => only.includes(item.slug)) : ITEMS;
  const profile = mkdtempSync(join(tmpdir(), "devsloka-previews-"));
  const browser = spawn(
    browserPath,
    ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"],
    { stdio: "ignore" }
  );

  try {
    let targets;
    for (let attempt = 0; attempt < 50 && !targets; attempt++) {
      await sleep(200);
      targets = await fetch(`http://127.0.0.1:${PORT}/json`)
        .then((response) => response.json())
        .catch(() => undefined);
    }
    const page = targets.find((target) => target.type === "page");
    const socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve) => (socket.onopen = resolve));

    let nextId = 0;
    const pending = new Map();
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      pending.get(message.id)?.(message.result);
    };
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        pending.set(++nextId, resolve);
        socket.send(JSON.stringify({ id: nextId, method, params }));
      });
    const evaluate = async (expression) =>
      (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }))
        ?.result?.value;

    await send("Emulation.setDeviceMetricsOverride", { ...VIEWPORT, deviceScaleFactor: 1, mobile: false });

    // The site defaults to dark; set it explicitly so previews are consistent.
    await send("Page.navigate", { url: BASE_URL });
    await sleep(1000);
    await evaluate(`localStorage.setItem("theme", "dark")`);

    for (const { slug, path } of items) {
      await send("Page.navigate", { url: BASE_URL + path });
      await sleep(SETTLE_MS);
      await evaluate(HIDE_OVERLAYS);
      if (PREPARE[slug]) {
        await evaluate(PREPARE[slug]);
        await sleep(1200);
      }
      const clip = await evaluate(clipExpression(FRAME_DIALOG.has(slug), CENTER_ON[slug]));
      if (!clip) {
        console.warn(`skip  ${slug}: no preview panel at ${path}`);
        continue;
      }
      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { ...clip, scale: 2 },
      });
      writeFileSync(`public/images/${slug}.png`, Buffer.from(data, "base64"));
      console.log(`saved public/images/${slug}.png`);
    }
    socket.close();
  } finally {
    browser.kill();
    rmSync(profile, { recursive: true, force: true });
  }
}

main();
