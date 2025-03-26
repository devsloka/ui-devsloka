import fs from "fs";
import path from "path";

export const getComponentCode = (basePath: string) => {
  try {
    const componentPath = path.resolve(basePath);
    return fs.readFileSync(componentPath, "utf-8");
  } catch (error) {
    console.error(`Error reading`, error);
    return `// Error loading component`;
  }
};
