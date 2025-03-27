"use client";
import { useState, useEffect } from "react";

export const useDeviceDetection = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/iphone|ipad|android/.test(userAgent));
  }, []);

  return isMobile;
};
