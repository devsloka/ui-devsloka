import fs from "fs";
import path from "path";

export const getComponentCode = (basePath: string) => {
  try {
    const componentPath = path.join(process.cwd(), basePath);
    return fs.readFileSync(componentPath, "utf-8");
  } catch (error) {
    console.error("Error reading component code:", error);
    return "// Error loading component code";
  }
};
