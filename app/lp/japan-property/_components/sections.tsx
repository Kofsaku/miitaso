"use client";

import { useI18n } from "./i18n-context";
import { content, pick, pickList } from "./content";
import {
  AlertTriangle,
  Languages,
  Search,
  Cpu,
  MapPin,
  Building,
  Check,
  Phone,
  Compass,
  Eye,
  BarChart3,
  FileText,
  HeartHandshake,
  Sparkles,
  Code2,
  Network,
  ShieldCheck,
} from "lucide-react";

export function PainPointsSection() {
  const { locale } = useI18n();
  const items = content.painPoints.items;
  const icons = [Languages, AlertTriangle, Search];
  return (
    <section id="problems" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {pick(content.painPoints.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {pick(content.painPoints.title, locale)}
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-stone-50/50 p-7 transition hover:border-stone-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-900">
                  {pick(item.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {pick(item.body, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  const { locale } = useI18n();
  const pillars = content.solution.pillars;
  const icons = [Cpu, MapPin, Building];
  return (
    <section className="bg-stone-900 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {pick(content.solution.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {pick(content.solution.title, locale)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-300">
            {pick(content.solution.body, locale)}
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-700 bg-stone-800/50 p-7 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{pick(p.title, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">
                  {pick(p.body, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  const { locale } = useI18n();
  const items = content.packages.items;
  return (
    <section id="services" className="bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {pick(content.packages.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {pick(content.packages.title, locale)}
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const highlighted = "highlighted" in item && item.highlighted;
            return (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-6 transition ${
                  highlighted
                    ? "border-stone-900 bg-stone-900 text-white shadow-xl"
                    : "border-stone-200 bg-white text-stone-900 hover:border-stone-300 hover:shadow-md"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-stone-900">
                    {locale === "en" ? "MOST POPULAR" : "おすすめ"}
                  </span>
                )}
                <h3 className="text-xl font-bold">{pick(item.name, locale)}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{pick(item.price, locale)}</span>
                </div>
                <p className={`mt-1 text-xs ${highlighted ? "text-stone-300" : "text-stone-500"}`}>
                  {pick(item.priceNote, locale)}
                </p>
                <p
                  className={`mt-5 text-sm leading-relaxed ${
                    highlighted ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  {pick(item.description, locale)}
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {pickList(item.features, locale).map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          highlighted ? "text-amber-400" : "text-emerald-600"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    highlighted
                      ? "bg-amber-500 text-stone-900 hover:bg-amber-400"
                      : "bg-stone-900 text-white hover:bg-stone-800"
                  }`}
                >
                  {pick(item.cta, locale)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const { locale } = useI18n();
  const steps = content.process.steps;
  const icons = [Phone, Compass, Eye, BarChart3, FileText, HeartHandshake];
  return (
    <section id="process" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {pick(content.process.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {pick(content.process.title, locale)}
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-6 transition hover:border-stone-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-bold text-stone-300">{step.number}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-900">
                  {pick(step.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {pick(step.body, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const { locale } = useI18n();
  const points = content.whyUs.points;
  const icons = [Sparkles, Code2, Network, ShieldCheck];
  return (
    <section className="bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {pick(content.whyUs.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {pick(content.whyUs.title, locale)}
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {points.map((p, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-white p-7 transition hover:border-stone-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      {pick(p.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                      {pick(p.body, locale)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { locale } = useI18n();
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-200 via-amber-50 to-stone-100 shadow-xl">
              <div className="flex h-full items-center justify-center text-8xl">
                🚗
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-stone-100 px-3 py-2 font-medium text-stone-700">
                Tesla Model Y
              </div>
              <div className="rounded-lg bg-stone-100 px-3 py-2 font-medium text-stone-700">
                miitaso CEO
              </div>
              <div className="rounded-lg bg-stone-100 px-3 py-2 font-medium text-stone-700">
                15+ years
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              {pick(content.about.eyebrow, locale)}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {pick(content.about.title, locale)}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600 whitespace-pre-line">
              {pick(content.about.body, locale)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { locale } = useI18n();
  const items = content.faq.items;
  return (
    <section className="bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {pick(content.faq.eyebrow, locale)}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {pick(content.faq.title, locale)}
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-stone-300 [&[open]]:border-stone-400"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <h3 className="text-base font-semibold text-stone-900">
                  {pick(item.q, locale)}
                </h3>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                {pick(item.a, locale)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  const { locale } = useI18n();
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-stone-900 py-20 text-white lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.15),_transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          {pick(content.cta.eyebrow, locale)}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {pick(content.cta.title, locale)}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-stone-300">
          {pick(content.cta.body, locale)}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://cal.com/kosaku-tsubata/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-stone-900 shadow-lg transition hover:bg-amber-400"
          >
            {pick(content.cta.buttonPrimary, locale)}
          </a>
          <a
            href="mailto:kosaku.tsubata@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-stone-600 bg-stone-800 px-8 py-4 text-base font-semibold text-white transition hover:bg-stone-700"
          >
            {pick(content.cta.buttonSecondary, locale)}
          </a>
        </div>
      </div>
    </section>
  );
}

export function LpFooter() {
  const { locale } = useI18n();
  return (
    <footer className="border-t border-stone-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-stone-900">Tsubata's Japan</p>
            <p className="mt-1 text-xs text-stone-500">{pick(content.footer.rights, locale)}</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-stone-500">
            {pick(content.footer.legal, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
