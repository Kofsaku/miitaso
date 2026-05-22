"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Locale = "en" | "ja";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("japan-property-locale") as Locale | null;
    if (saved === "en" || saved === "ja") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("japan-property-locale", l);
  };

  const toggle = () => setLocale(locale === "en" ? "ja" : "en");

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
