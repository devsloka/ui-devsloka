"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Template } from "@/lib/templates";
import { ArrowRight, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden border-0 bg-background/50 backdrop-blur-sm transition-all hover:shadow-xl dark:bg-muted/10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={template.image || "/placeholder.svg"}
              alt={template.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {template.isPro && (
            <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
              PRO
            </Badge>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 flex justify-between"
          >
            <Button variant="secondary" size="sm" className="h-8 gap-1">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button size="sm" className="h-8 gap-1">
              Use <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{template.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart
                className={`h-4 w-4 ${
                  template.isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-xs">{template.likes}</span>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {template.description}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-start gap-1 p-4 pt-0">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
