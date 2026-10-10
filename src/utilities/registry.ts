import fs from "fs";
import path from "path";

type RegistryItem = {
  name: string;
  files: { path: string }[];
  dependencies?: string[];
  registryDependencies?: string[];
};

const REGISTRY_URL = "https://ui.devsloka.in/r";

function readRegistry(): RegistryItem[] {
  // A fixed path, so the build only traces registry.json rather than the whole project.
  const source = fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf-8");
  return (JSON.parse(source) as { items: RegistryItem[] }).items;
}

/** `npx shadcn add` command for one registry item. */
export const getCliCommand = (name: string) =>
  `npx shadcn@latest add ${REGISTRY_URL}/${name}.json`;

/**
 * Manual install commands for an item. They come from registry.json, which
 * `npm run registry:build` derives from the item's imports, so they always match the code.
 */
export function getInstallCommands(name: string) {
  const item = readRegistry().find((entry) => entry.name === name);
  const commands = [
    item?.dependencies?.length && `npm i ${item.dependencies.join(" ")}`,
    item?.registryDependencies?.length &&
      `npx shadcn@latest add ${item.registryDependencies.join(" ")}`,
  ].filter(Boolean);
  return commands.length ? commands.join("\n") : undefined;
}

/** Number of registry items whose source lives in `src/registry/<folder>`. */
export function countRegistryItems(folder: "ui" | "backgrounds" | "hooks" | "blocks") {
  return readRegistry().filter((item) =>
    item.files[0]?.path.startsWith(`src/registry/${folder}/`)
  ).length;
}
