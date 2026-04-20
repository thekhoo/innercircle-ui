"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeTransition } from "@/components/welcome-transition";
import { InnercircleService } from "@/services/innercircle-service";
import { UserStatus } from "@/types/user";
import { getStatusRedirectPath } from "@/hooks/use-status-guard";

export default function WelcomePage() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const status = InnercircleService.getInstance().getUserStatus();
    if (status === UserStatus.Active) {
      setShowAnimation(true);
    } else {
      router.replace(getStatusRedirectPath(status));
    }
  }, [router]);

  if (!showAnimation) return null;

  return <WelcomeTransition onComplete={() => router.push("/home")} />;
}
