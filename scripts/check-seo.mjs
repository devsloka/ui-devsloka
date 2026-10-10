// Verify a running production build: BASE_URL=http://localhost:3124 npm run seo:check
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SITE_URL = "https://ui.devsloka.in";
const headers = { "User-Agent": "Googlebot" };
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const manifest = JSON.parse(readFileSync(".next/prerender-manifest.json", "utf8"));

const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]));
const meta = (html, key) => [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag)).find((tag) => tag.name === key || tag.property === key)?.content;
const canonical = (html) => [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).find((tag) => tag.rel === "canonical")?.href;

async function get(path, expectedStatus = 200) {
  const response = await fetch(new URL(path, BASE_URL), { headers });
  assert.equal(response.status, expectedStatus, `${path}: HTTP status`);
  return response;
}

const xml = await (await get("/sitemap.xml")).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => decode(url));
assert(urls.length > 0, "Sitemap contains URLs");
assert.equal(new Set(urls).size, urls.length, "Sitemap has no duplicate URLs");
const expectedPaths = Object.keys(manifest.routes).filter((path) => !["/_not-found", "/_global-error", "/contact-us"].includes(path) && !path.endsWith(".txt") && !path.endsWith(".xml"));
assert.deepEqual(new Set(urls.map((url) => new URL(url).pathname)), new Set(expectedPaths), "Sitemap matches all published HTML routes");
assert(!urls.some((url) => url.endsWith("/contact-us")), "Placeholder contact page is excluded");

const imageUrls = new Set();
const titles = new Set();
for (let offset = 0; offset < urls.length; offset += 4) {
  const results = await Promise.all(urls.slice(offset, offset + 4).map(async (url) => {
    assert.equal(new URL(url).origin, SITE_URL, `${url}: production origin`);
    const path = new URL(url).pathname;
    assert(!path.includes("//"), `${url}: no doubled slashes`);
    const response = await get(path);
    assert(response.headers.get("link")?.includes("llms.txt"), `${path}: AI discovery link`);
    const html = await response.text();
    assert.equal(canonical(html), url, `${path}: canonical`);
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
    const description = meta(html, "description");
    assert(title.length > 0 && description?.length > 0, `${path}: title and description`);
    const keywords = meta(html, "keywords")?.split(",").map((term) => term.trim().toLowerCase());
    assert(keywords?.includes("devsloka ui"), `${path}: branded keywords`);
    assert.equal(new Set(keywords).size, keywords.length, `${path}: keywords are deduplicated`);
    assert(keywords.every((term) => term.length > 1), `${path}: keywords are phrases, not individual letters`);
    if (path.startsWith("/blocks")) assert(keywords.includes("tailwind css blocks"), `${path}: block keywords`);
    if (path.startsWith("/utilities")) assert(keywords.includes("custom react hooks"), `${path}: hook keywords`);
    assert.equal(title.match(/Devsloka UI/g)?.length, 1, `${path}: brand appears once`);
    assert.equal(meta(html, "og:title"), title, `${path}: Open Graph title`);
    assert.equal(meta(html, "twitter:title"), title, `${path}: Twitter title`);
    assert.equal(meta(html, "og:description"), description, `${path}: Open Graph description`);
    assert.equal(meta(html, "twitter:description"), description, `${path}: Twitter description`);
    assert.equal(meta(html, "og:url"), url, `${path}: Open Graph URL`);
    assert(!meta(html, "robots")?.includes("noindex"), `${path}: indexable`);
    const image = meta(html, "og:image");
    assert(image && meta(html, "twitter:image") === image, `${path}: consistent share image`);
    assert.equal(new URL(image).protocol, "https:", `${path}: absolute HTTPS image URL`);
    assert(meta(html, "og:image:alt"), `${path}: share image alt text`);
    assert(meta(html, "twitter:image:alt"), `${path}: Twitter image alt text`);
    return { title, image };
  }));
  for (const { title, image } of results) {
    assert(!titles.has(title), `Unique title: ${title}`);
    titles.add(title);
    imageUrls.add(image);
  }
}

for (const image of imageUrls) {
  const url = new URL(image);
  const response = url.origin === SITE_URL
    ? await get(url.pathname)
    : await fetch(image, { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, `${image}: image HTTP status`);
  assert(response.headers.get("content-type")?.startsWith("image/"), `${image}: image content type`);
  assert((await response.arrayBuffer()).byteLength > 0, `${image}: nonempty image data`);
}
const png = Buffer.from(await (await get("/og-home.png")).arrayBuffer());
assert.equal(png.readUInt32BE(16), 1200, "Default OG width");
assert.equal(png.readUInt32BE(20), 630, "Default OG height");

const robots = await (await get("/robots.txt")).text();
assert(robots.includes("User-Agent: *") && robots.includes("Allow: /"), "Public crawler access");
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "Robots links the sitemap");
const indexResponse = await get("/llms.txt");
assert(indexResponse.headers.get("content-type")?.includes("text/plain"), "AI guide content type");
const index = await indexResponse.text();
assert(index.startsWith("# Devsloka UI\n"), "llms.txt project heading");
assert.equal(await (await get("/llm.txt")).text(), index, "llm.txt alias matches llms.txt");
const full = await (await get("/llms-full.txt")).text();
for (const item of registry.items) assert(full.includes(`${SITE_URL}/r/${item.name}.json`), `Full context covers ${item.name}`);
for (const url of urls) assert(full.includes(url), `Full context covers ${url}`);
assert(full.includes("May 21, 2025") && full.includes("October 11, 2026"), "Release history is included");

const home = await (await get("/")).text();
const schemas = [...home.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(([, content]) => JSON.parse(content));
assert(schemas.some((schema) => schema["@graph"]?.some((entry) => entry["@type"] === "WebSite")), "Website structured data");
assert(schemas.some((schema) => schema["@type"] === "SoftwareSourceCode"), "Library structured data");
const contact = await (await get("/contact-us")).text();
assert(meta(contact, "robots")?.includes("noindex"), "Placeholder is noindex");
const missing = await (await get("/components/not-a-published-component", 404)).text();
assert(meta(missing, "robots")?.includes("noindex"), "Missing documentation is noindex");
console.log(`SEO checks passed: ${urls.length} public pages, ${imageUrls.size} share images, ${registry.items.length} registry items, sitemap, robots, AI guides, and structured data.`);
