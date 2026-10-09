import { CopyCommand } from "../copy-command";

const INSTALL_COMMAND =
  "npx shadcn@latest add https://ui.devsloka.in/r/morphing-nav.json";

export function InstallSection() {
  return (
    <section
      aria-label="Install"
      className="mt-24 grid grid-cols-1 items-center gap-6 md:grid-cols-12"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
        One command. Any component.
      </p>
      <CopyCommand command={INSTALL_COMMAND} className="md:col-span-9" />
    </section>
  );
}
