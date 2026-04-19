"use client";

import { useRouter } from "next/navigation";
import { WelcomeTransition } from "@/components/welcome-transition";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <WelcomeTransition
      onComplete={() => router.push("/home")}
    />
  );
}
