import { CopyCommand } from "../copy-command";
import { SectionHeading } from "../section-heading";

const INSTALL_COMMAND =
  "npx shadcn@latest add https://ui.devsloka.in/r/morphing-nav.json";

export function InstallSection() {
  return (
    <section aria-labelledby="install-title" className="mt-32">
      <SectionHeading
        title={<span id="install-title">One command. Any component.</span>}
        description="Install with the shadcn CLI and the source lands in components/ui, typed and ready to change. Or copy it by hand."
      />
      <CopyCommand command={INSTALL_COMMAND} className="mt-10" />
    </section>
  );
}
