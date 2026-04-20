"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserStatus } from "@/types/user";
import { InnercircleService } from "@/services/innercircle-service";

export function getStatusRedirectPath(status: UserStatus): string {
  switch (status) {
    case UserStatus.Unregistered:
      return "/register";
    case UserStatus.PendingVerification:
      return "/pending";
    case UserStatus.Active:
      return "/home";
    case UserStatus.Locked:
      return "/locked";
  }
}

export function useStatusGuard(requiredStatus: UserStatus | UserStatus[]) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    const currentStatus = InnercircleService.getInstance().getUserStatus();
    setStatus(currentStatus);

    const required = Array.isArray(requiredStatus)
      ? requiredStatus
      : [requiredStatus];

    if (!required.includes(currentStatus)) {
      router.replace(getStatusRedirectPath(currentStatus));
    } else {
      setIsLoading(false);
    }
  }, [requiredStatus, router]);

  return { isLoading, status };
}
