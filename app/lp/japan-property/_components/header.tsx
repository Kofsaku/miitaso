"use client";

import Link from "next/link";
import { useI18n } from "./i18n-context";
import { content, pick } from "./content";
import { LanguageSwitcher } from "./language-switcher";

export function LpHeader() {
  const { locale } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-stone-900">
            Tsubata's Japan
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#services" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            {pick(content.nav.services, locale)}
          </a>
          <a href="#properties" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            {pick(content.nav.properties, locale)}
          </a>
          <a href="#process" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            {pick(content.nav.process, locale)}
          </a>
          <a href="#about" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            {pick(content.nav.about, locale)}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            {pick(content.nav.contact, locale)}
          </a>
        </nav>
        <div className="md:hidden">
          <LanguageSwitcher />
        </div>
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
