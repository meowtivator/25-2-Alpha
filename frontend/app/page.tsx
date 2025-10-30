"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { H1 } from "@/components/Typography";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.MAIN);
    }, 2000);

    return ()=> clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-24 h-24 bg-green-300 rounded-3xl mb-6"></div>
      <H1 className="text-foreground">App Name</H1>
    </div>
  )
}
