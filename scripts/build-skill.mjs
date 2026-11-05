// Packages the Anti-Slop agent skill for download from /skill.
//   node scripts/build-skill.mjs          write public/skill/devsloka-anti-slop.zip
//   node scripts/build-skill.mjs --check  exit 1 if the zip is stale or the catalog drifted from registry.json
//
// The skill's catalog (references/catalog.md) documents every published component and block, so it is
// checked against registry.json: every listed name must exist, and every published item must be listed.
import { deflateRawSync } from "node:zlib";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const SKILL = "devsloka-anti-slop";
const SOURCE = `skills/${SKILL}`;
const OUTPUT = `public/skill/${SKILL}.zip`;
const isCheck = process.argv.includes("--check");
const problems = [];

// ---------- catalog vs registry ----------
const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const published = new Set(registry.items.filter((item) => item.type !== "registry:hook").map((item) => item.name));
const catalog = readFileSync(join(SOURCE, "references/catalog.md"), "utf8");
// Names in a table's first column or at the start of a bullet are item references.
const listed = new Set([
  ...[...catalog.matchAll(/^\| `([a-z0-9]+(?:-[a-z0-9]+)*)`/gm)].map((m) => m[1]),
  ...[...catalog.matchAll(/^- `([a-z0-9]+(?:-[a-z0-9]+)*)`/gm)].map((m) => m[1]),
]);
for (const name of listed) if (!published.has(name)) problems.push(`catalog.md lists "${name}", which is not in registry.json`);
for (const name of published) if (!catalog.includes(`\`${name}\``)) problems.push(`catalog.md does not mention published item "${name}"`);

// ---------- deterministic zip ----------
const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir).sort()) {
    if (entry === ".DS_Store" || entry === "evals") continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
};
walk(SOURCE);

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
// Fixed timestamp (2026-01-01 00:00) so the archive only changes when the files do.
const DOS_TIME = 0;
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

const locals = [];
const centrals = [];
let offset = 0;
for (const file of files) {
  const name = Buffer.from(`${SKILL}/${relative(SOURCE, file).split("\\").join("/")}`);
  const data = readFileSync(file);
  const packed = deflateRawSync(data, { level: 9 });
  const crc = crc32(data);
  const executable = file.endsWith(".mjs");

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(8, 8); // deflate
  local.writeUInt16LE(DOS_TIME, 10);
  local.writeUInt16LE(DOS_DATE, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(packed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  local.writeUInt16LE(0, 28);
  locals.push(local, name, packed);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE((3 << 8) | 20, 4); // made by Unix, so permissions are kept
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt16LE(DOS_TIME, 12);
  central.writeUInt16LE(DOS_DATE, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(packed.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE(((executable ? 0o100755 : 0o100644) << 16) >>> 0, 38);
  central.writeUInt32LE(offset, 42);
  centrals.push(central, name);

  offset += local.length + name.length + packed.length;
}
const centralSize = centrals.reduce((sum, b) => sum + b.length, 0);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralSize, 12);
end.writeUInt32LE(offset, 16);
const zip = Buffer.concat([...locals, ...centrals, end]);

const current = existsSync(OUTPUT) ? readFileSync(OUTPUT) : Buffer.alloc(0);
if (!current.equals(zip)) {
  problems.push(`${OUTPUT} is stale`);
  if (!isCheck) {
    mkdirSync("public/skill", { recursive: true });
    writeFileSync(OUTPUT, zip);
  }
}

const catalogProblems = problems.filter((p) => p.startsWith("catalog.md"));
if (isCheck) {
  if (problems.length) {
    console.error(problems.join("\n"));
    console.error(`\n${problems.length} problem(s). Update ${SOURCE}/references/catalog.md, then run: npm run skill:build`);
    process.exit(1);
  }
  console.log(`Skill is up to date (${files.length} files, ${published.size} catalogued items).`);
} else {
  if (catalogProblems.length) {
    console.error(catalogProblems.join("\n"));
    process.exit(1);
  }
  console.log(problems.length ? `Wrote ${OUTPUT} (${(zip.length / 1024).toFixed(1)} KB, ${files.length} files).` : "Nothing changed.");
}
