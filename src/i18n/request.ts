import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";

const supportedLocales = ["en"] as const;
type Locale = (typeof supportedLocales)[number];

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "en";
  const preferred = acceptLanguage
    .split(",")[0]
    .trim()
    .split(";")[0]
    .split("-")[0]
    .toLowerCase();
  return supportedLocales.includes(preferred as Locale)
    ? (preferred as Locale)
    : "en";
}

function loadMessages(locale: Locale): Record<string, unknown> {
  const dir = path.join(process.cwd(), "messages", locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.reduce<Record<string, unknown>>((messages, file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    return { ...messages, ...JSON.parse(content) };
  }, {});
}

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = detectLocale(headersList.get("accept-language"));
  return {
    locale,
    messages: loadMessages(locale),
  };
});
