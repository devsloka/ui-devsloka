"use client";
import {
  Plus,
  ImageIcon,
  FileText,
  LinkIcon,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MorphingModal, MorphingModalTab } from "../morphing-modal";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function MorphingModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("post");
  const [originElement, setOriginElement] = useState<HTMLElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabs: MorphingModalTab[] = [
    {
      id: "post",
      label: "Post",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[120px] resize-none"
          />
        </div>
      ),
    },
    {
      id: "image",
      label: "Image",
      icon: ImageIcon,
      content: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag and drop an image, or click to select
              </p>
            </div>
            <Button variant="outline" className="mt-4">
              Upload Image
            </Button>
          </div>
          <Textarea placeholder="Add a caption..." className="resize-none" />
        </div>
      ),
    },
    {
      id: "link",
      label: "Link",
      icon: LinkIcon,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input placeholder="https://" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (Optional)</label>
            <Input placeholder="Title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Add a description..."
              className="resize-none"
            />
          </div>
        </div>
      ),
    },
    {
      id: "poll",
      label: "Poll",
      icon: MessageSquare,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <Input placeholder="Ask a question..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            <div className="space-y-2">
              <Input placeholder="Option 1" />
              <Input placeholder="Option 2" />
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Plus className="mr-1 h-4 w-4" />
              Add Option
            </Button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Poll Duration</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option>1 day</option>
              <option>3 days</option>
              <option>1 week</option>
              <option>2 weeks</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  const openModal = (tab: string) => {
    setActiveTab(tab);
    setOriginElement(buttonRefs.current[tab]);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[500px] border rounded-xl">
      <div className="w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Create New Content</h2>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[tab.id] = el;
              }}
              onClick={() => openModal(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <tab.icon className="h-6 w-6 mb-1" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Click on any of the options above to create new content. The modal
            will morph from the selected button.
          </p>
        </div>
      </div>

      <MorphingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        originElement={originElement}
        submitLabel={(tab) =>
          tab === "post"
            ? "Post"
            : tab === "image"
            ? "Upload"
            : tab === "link"
            ? "Add Link"
            : "Create Poll"
        }
        title="Create"
      />
    </div>
  );
}
