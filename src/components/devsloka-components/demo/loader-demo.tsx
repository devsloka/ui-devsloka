import { Loader } from "@/registry/ui/loader";

export default function LoaderDemo() {
  return (
    <div className="flex items-center gap-10">
      <Loader size="sm" />
      <Loader />
      <Loader size="lg" className="text-primary" />
      <Loader size="lg" dots={5} className="text-muted-foreground" />
    </div>
  );
}
