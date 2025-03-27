"use client";
import { useState } from "react";

export const useClipboard = (): {
  isCopied: boolean;
  copy: (text: string) => void;
} => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return { isCopied, copy };
};
