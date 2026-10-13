import { SectionHeading } from "../section-heading";
import { TextEffectPlayground } from "../text-effect-playground";

export function PlaygroundSection() {
  return (
    <section id="playground" className="mt-40 scroll-mt-24">
      <SectionHeading
        title="Props you can feel."
        description="Every component is built to be tuned. Change the props and the code follows."
      />
      <div className="mt-12">
        <TextEffectPlayground />
      </div>
    </section>
  );
}
