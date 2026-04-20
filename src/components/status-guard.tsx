"use client";

import { useStatusGuard } from "@/hooks/use-status-guard";
import { UserStatus } from "@/types/user";

interface StatusGuardProps {
  requiredStatus: UserStatus | UserStatus[];
}

export function StatusGuard({ requiredStatus }: StatusGuardProps) {
  useStatusGuard(requiredStatus);
  return null;
}
