"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  ImageIcon,
  FileText,
  LinkIcon,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function MorphingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("post");
  const [originElement, setOriginElement] = useState<HTMLElement | null>(null);

  const buttonRefs = {
    post: useRef<HTMLButtonElement>(null),
    image: useRef<HTMLButtonElement>(null),
    link: useRef<HTMLButtonElement>(null),
    poll: useRef<HTMLButtonElement>(null),
  };

  const tabs = [
    { id: "post", label: "Post", icon: FileText, ref: buttonRefs.post },
    { id: "image", label: "Image", icon: ImageIcon, ref: buttonRefs.image },
    { id: "link", label: "Link", icon: LinkIcon, ref: buttonRefs.link },
    { id: "poll", label: "Poll", icon: MessageSquare, ref: buttonRefs.poll },
  ];

  const openModal = (e: React.MouseEvent<HTMLButtonElement>, tab: string) => {
    setOriginElement(e.currentTarget);
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "post":
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] resize-none"
            />
          </div>
        );
      case "image":
        return (
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
        );
      case "link":
        return (
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
        );
      case "poll":
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[500px] border rounded-xl">
      <div className="w-full max-w-md  rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Create New Content</h2>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={tab.ref}
              onClick={(e) => openModal(e, tab.id)}
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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              layoutId={`modal-${activeTab}`}
              initial={{
                opacity: 0,
                scale: 0.8,
                x: originElement
                  ? originElement.getBoundingClientRect().left +
                    originElement.offsetWidth / 2 -
                    200
                  : 0,
                y: originElement
                  ? originElement.getBoundingClientRect().top +
                    originElement.offsetHeight / 2 -
                    200
                  : 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                x: originElement
                  ? originElement.getBoundingClientRect().left +
                    originElement.offsetWidth / 2 -
                    200
                  : 0,
                y: originElement
                  ? originElement.getBoundingClientRect().top +
                    originElement.offsetHeight / 2 -
                    200
                  : 0,
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background border rounded-xl shadow-xl z-50"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">
                  Create{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <Button variant="ghost" size="icon" onClick={closeModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 py-2 text-sm font-medium relative",
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    )}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getTabContent()}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button>
                    {activeTab === "post"
                      ? "Post"
                      : activeTab === "image"
                      ? "Upload"
                      : activeTab === "link"
                      ? "Add Link"
                      : "Create Poll"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
