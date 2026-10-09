import { ComponentIndex } from "../component-index";
import { SectionHeading } from "../section-heading";

export function IndexSection() {
  return (
    <section id="index" className="mt-40 scroll-mt-24">
      <SectionHeading
        index="01"
        label="Index"
        title="Everything in the library, in one list."
        description="Hover a name to preview it, open it for the code. Each entry installs with the shadcn CLI."
      />
      <div className="mt-12">
        <ComponentIndex />
      </div>
    </section>
  );
}
