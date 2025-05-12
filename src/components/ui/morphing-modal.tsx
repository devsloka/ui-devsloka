"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MorphingModalTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content: ReactNode;
}

interface MorphingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: MorphingModalTab[];
  originElement?: HTMLElement | null;
  submitLabel?: string | ((tab: string) => string);
  title?: string;
}

export function MorphingModal({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  tabs,
  originElement,
  submitLabel,
  title = "Create Content",
}: MorphingModalProps) {
  const getSubmitLabel = () => {
    if (typeof submitLabel === "function") return submitLabel(activeTab);
    if (submitLabel) return submitLabel;
    return "Submit";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                {title} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
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
                  {tabs.find((tab) => tab.id === activeTab)?.content}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>{getSubmitLabel()}</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
