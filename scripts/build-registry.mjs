// Builds the shadcn registry served from public/r.
// Each item's npm and registry dependencies are derived from its imports, so
// registry.json can't drift from the source again.
//   node scripts/build-registry.mjs          sync registry.json and write public/r/*.json (plus the public/r/registry.json index)
//   node scripts/build-registry.mjs --check  exit 1 if either is out of date
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const REGISTRY_PATH = "registry.json";
const OUTPUT_DIR = "public/r";
const REGISTRY_URL = "https://ui.devsloka.in/r";
const ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
// Provided by the user's app or by `shadcn init`, never declared per item.
const PROVIDED = new Set(["react", "react-dom", "next", "clsx", "tailwind-merge"]);

const isCheck = process.argv.includes("--check");
const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
const ownItems = new Set(registry.items.map((item) => item.name));
const problems = [];

const packageName = (specifier) =>
  specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0];

function collectDependencies(files) {
  const dependencies = new Set();
  const registryDependencies = new Set();

  for (const { content } of files) {
    for (const [, specifier] of content.matchAll(/from\s+["']([^"']+)["']/g)) {
      if (
        specifier.startsWith("@/components/ui/") ||
        specifier.startsWith("@/hooks/")
      ) {
        const name = specifier.split("/").pop();
        registryDependencies.add(
          ownItems.has(name) ? `${REGISTRY_URL}/${name}.json` : name
        );
      } else if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
        const name = packageName(specifier);
        if (!PROVIDED.has(name)) dependencies.add(name);
      }
    }
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

const setOrDelete = (target, key, values) => {
  if (values.length) target[key] = values;
  else delete target[key];
};

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const item of registry.items) {
  const files = item.files.map((file) => ({
    ...file,
    content: readFileSync(file.path, "utf8"),
  }));
  const derived = collectDependencies(files);

  for (const key of ["dependencies", "registryDependencies"]) {
    if (JSON.stringify(item[key] ?? []) !== JSON.stringify(derived[key])) {
      problems.push(`${item.name}: ${key} should be ${JSON.stringify(derived[key])}`);
    }
    setOrDelete(item, key, derived[key]);
  }

  const output = { $schema: ITEM_SCHEMA, ...item, files };
  const outputPath = `${OUTPUT_DIR}/${item.name}.json`;
  const serialized = JSON.stringify(output, null, 2) + "\n";
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";

  if (current !== serialized) {
    problems.push(`${outputPath} is stale`);
    if (!isCheck) writeFileSync(outputPath, serialized);
  }
}

// The registry index at /r/registry.json lists every item, without file contents,
// as the shadcn registry directory requires.
const indexPath = `${OUTPUT_DIR}/registry.json`;
const indexSerialized = JSON.stringify(registry, null, 2) + "\n";
const currentIndex = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
if (currentIndex !== indexSerialized) {
  problems.push(`${indexPath} is stale`);
  if (!isCheck) writeFileSync(indexPath, indexSerialized);
}

if (isCheck) {
  if (problems.length) {
    console.error(problems.join("\n"));
    console.error(`\n${problems.length} problem(s). Run: npm run registry:build`);
    process.exit(1);
  }
  console.log(`Registry is up to date (${registry.items.length} items).`);
} else {
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log(problems.length ? problems.join("\n") : "Nothing changed.");
  console.log(`\nBuilt ${registry.items.length} items into ${OUTPUT_DIR}.`);
}
