"use client";

import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MorphingCardProps {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  className?: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  actionText?: string;
  onAction?: () => void;
}

export function MorphingCard({
  id,
  title,
  description,
  content,
  image,
  className,
  isExpanded = false,
  onExpand,
  onCollapse,
  actionText = "Learn More",
  onAction,
}: MorphingCardProps) {
  return (
    <div className="relative">
      <motion.div
        layoutId={`card-${id}`}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
          className,
          isExpanded
            ? "fixed inset-0 z-50 m-auto w-[95vw] max-w-4xl h-[90vh] overflow-y-auto"
            : "cursor-pointer hover:shadow-md"
        )}
        onClick={!isExpanded ? onExpand : undefined}
      >
        <motion.div layoutId={`image-${id}`} className="relative aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        <motion.div layoutId={`content-${id}`} className="p-4">
          <motion.h3 layoutId={`title-${id}`} className="text-xl font-semibold">
            {title}
          </motion.h3>

          <motion.div layoutId={`description-${id}`} className="mt-2">
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground">{content}</p>
                <Button onClick={onAction} className="mt-4">
                  {actionText}
                </Button>
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {description}
              </p>
            )}
          </motion.div>
        </motion.div>

        {isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              onCollapse?.();
            }}
          >
            <X className="h-5 w-5 cursor-pointer" />
          </motion.button>
        )}

        {!isExpanded && (
          <motion.div className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm">
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
