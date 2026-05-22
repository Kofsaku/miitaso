"use client";

import { useI18n } from "./i18n-context";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, toggle } = useI18n();
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur transition hover:bg-stone-100"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "en" ? "日本語" : "English"}</span>
    </button>
  );
}
