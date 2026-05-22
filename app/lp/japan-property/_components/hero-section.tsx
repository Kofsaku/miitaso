"use client";

import { useI18n } from "./i18n-context";
import { content, pick } from "./content";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { VillaHeroIllustration } from "./visuals";

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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
                aria-label={pick(content.hero.ctaPrimary, locale)}
              >
                {pick(content.hero.ctaPrimary, locale)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#properties"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-base font-semibold text-stone-700 transition hover:bg-stone-100"
                aria-label={pick(content.hero.ctaSecondary, locale)}
              >
                {pick(content.hero.ctaSecondary, locale)}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/50">
              <VillaHeroIllustration className="absolute inset-0 h-full w-full" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    <span>
                      {locale === "en"
                        ? "Higashi-Izu, Shizuoka"
                        : "静岡県 東伊豆町"}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                    <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                    {locale === "en" ? "Featured" : "注目"}
                  </span>
                </div>
                <p className="mt-2 text-base font-semibold text-stone-900">
                  {locale === "en"
                    ? "Coastal Onsen Villa"
                    : "海近 温泉一戸建て"}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-stone-900">¥6.8M</span>
                  <span className="text-xs text-stone-500">
                    · 110m² · {locale === "en" ? "Built 1988" : "築1988"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  {locale === "en"
                    ? "11min walk to Inatori Station · Pacific view"
                    : "稲取駅 徒歩11分 · 太平洋眺望"}
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
