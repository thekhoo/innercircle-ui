"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useStatusGuard, getStatusRedirectPath } from "@/hooks/use-status-guard";
import { InnercircleService } from "@/services/innercircle-service";
import { UserStatus } from "@/types/user";

export default function PendingPage() {
  const router = useRouter();
  const { isLoading } = useStatusGuard(UserStatus.PendingVerification);
  const t = useTranslations("pending");

  if (isLoading) return null;

  const handleCheckAgain = () => {
    const status = InnercircleService.getInstance().getUserStatus();
    router.push(getStatusRedirectPath(status));
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-8">
      <div className="w-full max-w-xs text-center">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-10">
          {t("brand")}
        </p>
        <p className="text-white/80 text-sm font-light mb-3">
          {t("heading")}
        </p>
        <p className="text-white/30 text-xs leading-relaxed mb-10">
          {t("description")}
        </p>
        <button
          onClick={handleCheckAgain}
          className="w-full flex items-center justify-center px-6 py-4 border border-white/30 text-white/80 hover:text-white hover:border-white/60 active:opacity-70 transition-all duration-300 text-sm tracking-widest uppercase font-light"
        >
          {t("checkAgain")}
        </button>
      </div>
    </main>
  );
}
