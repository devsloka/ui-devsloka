import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyResult } from "@/registry/ui/empty-result";

const EmptyResultDemo = () => {
  return (
    <EmptyResult
      className="w-full max-w-md"
      title="No projects yet"
      description="Projects you create or are invited to will show up here. Start one to invite your team."
      action={
        <Button>
          <Plus />
          New project
        </Button>
      }
    />
  );
};

export default EmptyResultDemo;
