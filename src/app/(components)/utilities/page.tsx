"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UtilitiesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/utilities/use-fetch");
  }, [router]);

  return null;
};

export default UtilitiesPage;
