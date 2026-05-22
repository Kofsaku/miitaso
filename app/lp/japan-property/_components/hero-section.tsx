"use client";

import { useI18n } from "./i18n-context";
import { content, pick } from "./content";
import { ArrowRight, MapPin } from "lucide-react";

export function HeroSection() {
  const { locale } = useI18n();
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(120,53,15,0.08),_transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
              {pick(content.hero.badge, locale)}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {pick(content.hero.title, locale)}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600 sm:text-xl">
              {pick(content.hero.subtitle, locale)}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-stone-800 hover:shadow-lg"
              >
                {pick(content.hero.ctaPrimary, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#properties"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                {pick(content.hero.ctaSecondary, locale)}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-stone-100 to-stone-200 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center text-9xl">
                🏡
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <MapPin className="h-3 w-3" />
                  <span>Higashi-Izu, Shizuoka</span>
                </div>
                <p className="mt-1 text-base font-semibold text-stone-900">
                  4DK Coastal House · ¥3.5M
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  ★ {locale === "en" ? "MUST-VISIT" : "MUST視察"} · 13min walk to Inatori Station
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-stone-200 pt-12 sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold text-stone-900">734+</p>
            <p className="mt-2 text-sm text-stone-600">
              {pick(content.hero.statLabel1, locale)}
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-stone-900">109</p>
            <p className="mt-2 text-sm text-stone-600">
              {pick(content.hero.statLabel2, locale)}
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-stone-900">
              {pick(content.hero.stat3Value, locale)}
            </p>
            <p className="mt-2 text-sm text-stone-600">
              {pick(content.hero.statLabel3, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
