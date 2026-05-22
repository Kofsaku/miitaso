"use client";

import { useI18n } from "./i18n-context";
import { MapPin, Sparkles, Star } from "lucide-react";

type Sample = {
  id: string;
  city: string;
  cityJa: string;
  prefecture: string;
  prefectureJa: string;
  emoji: string;
  bgGradient: string;
  type: string;
  typeJa: string;
  priceManYen: number;
  area: string;
  builtYear: string;
  access: string;
  accessJa: string;
  fitFor: string[];
  fitForJa: string[];
  strategy: "introduce" | "reno-sell";
  highlight: string;
  highlightJa: string;
  url: string;
};

const samples: Sample[] = [
  {
    id: "izu-3582",
    city: "Higashi-Izu",
    cityJa: "東伊豆町",
    prefecture: "Shizuoka",
    prefectureJa: "静岡県",
    emoji: "🌊",
    bgGradient: "from-sky-100 via-blue-50 to-cyan-100",
    type: "4DK Coastal House",
    typeJa: "4DK 海近一戸建て",
    priceManYen: 350,
    area: "92m²",
    builtYear: "1979",
    access: "13min walk to Izu-Inatori Stn",
    accessJa: "伊豆稲取駅 徒歩13分",
    fitFor: ["Digital Nomad", "Airbnb", "Retiree"],
    fitForJa: ["デジタルノマド", "Airbnb投資", "退職者"],
    strategy: "reno-sell",
    highlight: "Pacific Ocean view, hot spring district",
    highlightJa: "太平洋ビュー、温泉地",
    url: "https://higashiizu-t22301.akiya-athome.jp/",
  },
  {
    id: "minami-boso-3582",
    city: "Minamiboso",
    cityJa: "南房総市",
    prefecture: "Chiba",
    prefectureJa: "千葉県",
    emoji: "🌅",
    bgGradient: "from-orange-100 via-amber-50 to-yellow-100",
    type: "House w/ Pacific view",
    typeJa: "太平洋ビュー戸建て",
    priceManYen: 800,
    area: "125m²",
    builtYear: "1985",
    access: "5min drive to Chikura Stn",
    accessJa: "千倉駅 車5分",
    fitFor: ["Family Vacation", "Airbnb"],
    fitForJa: ["家族休暇", "Airbnb投資"],
    strategy: "reno-sell",
    highlight: "Bath with ocean view, south-facing",
    highlightJa: "浴室から海眺望、南向き",
    url: "https://www.minamibosocity-iju.jp/vacant/3582/",
  },
  {
    id: "kasama-1",
    city: "Kasama",
    cityJa: "笠間市",
    prefecture: "Ibaraki",
    prefectureJa: "茨城県",
    emoji: "🏯",
    bgGradient: "from-emerald-100 via-green-50 to-teal-100",
    type: "Traditional Farmhouse",
    typeJa: "伝統的農家住宅",
    priceManYen: 600,
    area: "150m²",
    builtYear: "1970",
    access: "1.5h from Tokyo (JR Joban Line)",
    accessJa: "東京から1.5時間 (常磐線)",
    fitFor: ["Retiree", "Renovator"],
    fitForJa: ["退職者", "リノベ愛好家"],
    strategy: "reno-sell",
    highlight: "Pottery town, large garden, ¥1.9M projected profit",
    highlightJa: "陶芸の街、広い庭、粗利1,925万見込み",
    url: "https://kasama-c08216.akiya-athome.jp/",
  },
  {
    id: "yugawara-2",
    city: "Yugawara",
    cityJa: "湯河原町",
    prefecture: "Kanagawa",
    prefectureJa: "神奈川県",
    emoji: "♨️",
    bgGradient: "from-pink-100 via-rose-50 to-amber-100",
    type: "Hot Spring Town House",
    typeJa: "温泉街の戸建て",
    priceManYen: 880,
    area: "98m²",
    builtYear: "1988",
    access: "11min walk to Yugawara Stn",
    accessJa: "湯河原駅 徒歩11分",
    fitFor: ["Expat Weekend Home", "Retiree"],
    fitForJa: ["駐在週末別荘", "退職者"],
    strategy: "introduce",
    highlight: "75min from Tokyo, hot spring access",
    highlightJa: "東京から75分、温泉アクセス",
    url: "https://yugawara-t14384.akiya-athome.jp/",
  },
  {
    id: "hokuto-1",
    city: "Hokuto",
    cityJa: "北杜市",
    prefecture: "Yamanashi",
    prefectureJa: "山梨県",
    emoji: "⛰️",
    bgGradient: "from-purple-100 via-violet-50 to-indigo-100",
    type: "Yatsugatake Cottage",
    typeJa: "八ヶ岳南麓コテージ",
    priceManYen: 680,
    area: "110m²",
    builtYear: "1990",
    access: "2.5h from Tokyo, near Kobuchizawa Stn",
    accessJa: "東京から2.5時間、小淵沢駅近く",
    fitFor: ["Retiree", "Wealthy Buyer"],
    fitForJa: ["退職者", "富裕層"],
    strategy: "introduce",
    highlight: "Mt. Fuji + Yatsugatake views, established expat community",
    highlightJa: "富士山+八ヶ岳ビュー、外国人コミュニティ確立",
    url: "https://www.city.hokuto.yamanashi.jp/teijyu_ijyu/bank/",
  },
  {
    id: "odawara-3",
    city: "Odawara",
    cityJa: "小田原市",
    prefecture: "Kanagawa",
    prefectureJa: "神奈川県",
    emoji: "🏯",
    bgGradient: "from-stone-200 via-stone-100 to-amber-100",
    type: "Suburban Family House",
    typeJa: "郊外ファミリーハウス",
    priceManYen: 1300,
    area: "120m²",
    builtYear: "1995",
    access: "11min walk to Itabashi Stn",
    accessJa: "板橋駅 徒歩11分",
    fitFor: ["Expat Family", "Tokyo Commuter"],
    fitForJa: ["駐在ファミリー", "東京通勤可"],
    strategy: "introduce",
    highlight: "60min Shinkansen to Tokyo, castle town",
    highlightJa: "新幹線で東京60分、城下町",
    url: "https://odawara-c14206.akiya-athome.jp/",
  },
];

export function SamplePropertiesSection() {
  const { locale } = useI18n();
  return (
    <section id="properties" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            {locale === "en" ? "Sample Curated Properties" : "キュレート済みサンプル物件"}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {locale === "en"
              ? "Real Properties from Our Database"
              : "実際のデータベースからの物件サンプル"}
          </h2>
          <p className="mt-4 text-base text-stone-600">
            {locale === "en"
              ? "Showing 6 of 734 curated properties. Full access available with any package."
              : "734件のキュレート物件のうち6件を表示。全件はパッケージ加入後にアクセス可能。"}
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samples.map((s) => (
            <div
              key={s.id}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300 hover:shadow-lg"
            >
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${s.bgGradient} flex items-center justify-center text-7xl`}
              >
                {s.emoji}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-900 backdrop-blur">
                  {s.strategy === "reno-sell" ? (
                    <>
                      <Sparkles className="h-3 w-3" />
                      {locale === "en" ? "Reno + Resell" : "リノベ売却向き"}
                    </>
                  ) : (
                    <>
                      <Star className="h-3 w-3" />
                      {locale === "en" ? "Ready Match" : "紹介向き"}
                    </>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                  <MapPin className="h-3 w-3" />
                  <span>
                    {locale === "en" ? `${s.city}, ${s.prefecture}` : `${s.prefectureJa} ${s.cityJa}`}
                  </span>
                </div>
                <h3 className="mt-1 text-base font-semibold text-stone-900">
                  {locale === "en" ? s.type : s.typeJa}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-stone-900">
                    ¥{(s.priceManYen / 100).toFixed(2)}M
                  </span>
                  <span className="text-xs text-stone-500">
                    ({s.area} · {locale === "en" ? "Built " : "築"}
                    {s.builtYear})
                  </span>
                </div>
                <p className="mt-3 text-xs text-stone-500">
                  {locale === "en" ? s.access : s.accessJa}
                </p>
                <p className="mt-3 text-sm font-medium text-stone-700">
                  {locale === "en" ? s.highlight : s.highlightJa}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(locale === "en" ? s.fitFor : s.fitForJa).map((f) => (
                    <span
                      key={f}
                      className="inline-flex rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
