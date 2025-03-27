"use client";
import { useState, useEffect } from "react";

export const useDarkMode = (): [boolean, (isDark: boolean) => void] => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  return [isDark, setIsDark];
};
