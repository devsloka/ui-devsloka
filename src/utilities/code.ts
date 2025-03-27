export const formatCode = (code: string) => {
  const lines = code.split("\n");
  const firstLine = lines[0] || "";
  const padLength = firstLine.match(/^\s*/)?.[0].length || 0;
  return lines
    .map((line) => line.slice(padLength))
    .join("\n")
    .trim();
};
