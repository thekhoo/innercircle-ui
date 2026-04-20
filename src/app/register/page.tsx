"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useStatusGuard } from "@/hooks/use-status-guard";
import { InnercircleService } from "@/services/innercircle-service";
import { UserStatus } from "@/types/user";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isLoading } = useStatusGuard(UserStatus.Unregistered);
  const t = useTranslations("register");

  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const displayName =
    fullName === "" && session?.user?.name ? session.user.name : fullName;

  if (isLoading) return null;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    InnercircleService.getInstance().registerUser({
      email: session?.user?.email ?? "",
      fullName: displayName,
      teamName,
    });

    router.push("/pending");
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-8">
      <div className="w-full max-w-xs">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-10">
          {t("brand")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-white/30">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              value={session?.user?.email ?? ""}
              disabled
              className="w-full px-4 py-3 text-sm text-white/30 bg-transparent border border-white/10 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-white/50">
              {t("fullNameLabel")}
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={1024}
              required
              placeholder={t("fullNamePlaceholder")}
              className="w-full px-4 py-3 text-sm text-white/80 bg-transparent border border-white/30 hover:border-white/50 focus:border-white/60 focus:outline-none transition-colors duration-300 placeholder:text-white/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-white/50">
              {t("teamNameLabel")}
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={64}
              required
              placeholder={t("teamNamePlaceholder")}
              className="w-full px-4 py-3 text-sm text-white/80 bg-transparent border border-white/30 hover:border-white/50 focus:border-white/60 focus:outline-none transition-colors duration-300 placeholder:text-white/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center px-6 py-4 border border-white/30 text-white/80 hover:text-white hover:border-white/60 active:opacity-70 transition-all duration-300 text-sm tracking-widest uppercase font-light disabled:opacity-30 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </main>
  );
}
