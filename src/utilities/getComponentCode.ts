import fs from "fs";
import path from "path";

/**
 * Reads a source file under `src/` so its code can be shown on a docs page.
 * The path is joined onto a fixed `src` folder: a fully dynamic path would make
 * Next.js trace (and deploy) the whole project, including `public/`.
 */
export const getComponentCode = (sourcePath: string) => {
  try {
    const relativePath = sourcePath.replace(/^src\//, "");
    return fs.readFileSync(path.join(process.cwd(), "src", relativePath), "utf-8");
  } catch (error) {
    console.error("Error reading component code:", error);
    return "// Error loading component code";
  }
};
