export function formatToDemo(input: string): string {
  return (
    input
      .split("-")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("") + "demo"
  );
}
