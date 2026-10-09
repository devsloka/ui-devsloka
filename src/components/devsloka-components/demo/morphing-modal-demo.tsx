"use client";

import { useState } from "react";
import { FileText, ImageIcon, LinkIcon, ListChecks, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MorphingModal, type MorphingModalTab } from "@/registry/ui/morphing-modal";

const tabs: MorphingModalTab[] = [
  {
    value: "post",
    label: "Post",
    icon: FileText,
    content: (
      <div className="space-y-2">
        <Label htmlFor="mm-post">Message</Label>
        <Textarea id="mm-post" placeholder="Share an update with your team…" className="min-h-28 resize-none" />
      </div>
    ),
  },
  {
    value: "image",
    label: "Image",
    icon: ImageIcon,
    content: (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center">
          <ImageIcon className="size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">PNG or JPG, up to 10 MB</p>
          <Button variant="outline" size="sm">
            Choose file
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mm-caption">Caption</Label>
          <Input id="mm-caption" placeholder="Add a caption" />
        </div>
      </div>
    ),
  },
  {
    value: "link",
    label: "Link",
    icon: LinkIcon,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mm-url">URL</Label>
          <Input id="mm-url" type="url" placeholder="https://" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mm-note">Note</Label>
          <Textarea id="mm-note" placeholder="Why is this worth reading?" className="resize-none" />
        </div>
      </div>
    ),
  },
  {
    value: "poll",
    label: "Poll",
    icon: ListChecks,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mm-question">Question</Label>
          <Input id="mm-question" placeholder="Where should we hold the offsite?" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mm-option-1">Options</Label>
          <Input id="mm-option-1" placeholder="Option 1" />
          <Input aria-label="Option 2" placeholder="Option 2" />
          <Button variant="ghost" size="sm">
            <Plus className="size-4" aria-hidden />
            Add option
          </Button>
        </div>
      </div>
    ),
  },
];

const submitLabels: Record<string, string> = {
  post: "Publish post",
  image: "Upload image",
  link: "Share link",
  poll: "Create poll",
};

export function MorphingModalDemo() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("post");

  return (
    <div className="flex min-h-80 items-center justify-center p-6">
      <MorphingModal
        open={open}
        onOpenChange={setOpen}
        tab={tab}
        onTabChange={setTab}
        tabs={tabs}
        title="Create"
        description="Share something with your workspace."
        trigger={
          <>
            <Plus className="size-4" aria-hidden />
            Create
          </>
        }
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>{submitLabels[tab]}</Button>
          </>
        }
      />
    </div>
  );
}
