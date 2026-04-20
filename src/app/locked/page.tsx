"use client";

import { useTranslations } from "next-intl";
import { useStatusGuard } from "@/hooks/use-status-guard";
import { UserStatus } from "@/types/user";
import { signOutAction } from "@/app/auth-actions";

export default function LockedPage() {
  const { isLoading } = useStatusGuard(UserStatus.Locked);
  const t = useTranslations("locked");

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-xs tracking-[0.4em] font-light uppercase text-white/30 mb-6">
          {t("brand")}
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mb-2">
          {t("heading")}
        </p>
        <p className="text-white/30 text-xs leading-relaxed mb-10">
          {t("description")}
        </p>
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-xs tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            {t("signOut")}
          </button>
        </form>
      </div>
    </div>
  );
}
