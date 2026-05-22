"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "./i18n-context";
import { content, pick } from "./content";
import { LanguageSwitcher } from "./language-switcher";

export function LpHeader() {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navLinks = [
    { href: "#services", label: content.nav.services },
    { href: "#properties", label: content.nav.properties },
    { href: "#process", label: content.nav.process },
    { href: "#about", label: content.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-xl font-bold tracking-tight text-stone-900">
            Tsubata&apos;s Japan
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone-700 transition-colors hover:text-stone-900"
            >
              {pick(l.label, locale)}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            {pick(content.nav.contact, locale)}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:bg-stone-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`border-t border-stone-200 bg-white md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
            >
              {pick(l.label, locale)}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-3 text-base font-semibold text-white transition hover:bg-stone-800"
          >
            {pick(content.nav.contact, locale)}
          </a>
        </nav>
      </div>
    </header>
  );
}
