import { signOut } from "@/auth";
import { getTranslations } from "next-intl/server";

export async function NavBar() {
  const t = await getTranslations("nav");

  return (
    <nav className="w-full border-b border-stone-200 bg-[var(--color-warm-white)] px-6 py-4 flex items-center justify-between">
      <span className="text-xs tracking-[0.4em] font-light uppercase text-stone-800">
        {t("brand")}
      </span>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          aria-label={t("logoutAriaLabel")}
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors duration-200"
        >
          {t("logout")}
        </button>
      </form>
    </nav>
  );
}
