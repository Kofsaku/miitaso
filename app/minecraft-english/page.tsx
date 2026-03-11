"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  ExternalLink,
  Frown,
  Gamepad2,
  Globe,
  Headphones,
  MapPin,
  MessageCircle,
  Play,
  Sparkles,
  Timer,
  Youtube,
  Zap,
} from "lucide-react"

const YOUTUBE_URL = "https://www.youtube.com/@minecraft-english-jp"
const LINE_URL = "https://lin.ee/PcdyxaG"

function useInView() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// --- Hero ---
function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-emerald-400/50 to-green-500/40 rounded-full blur-3xl animate-blob-move-1" />
        <div className="absolute w-[250px] h-[250px] bg-gradient-to-br from-lime-400/40 to-emerald-400/30 rounded-full blur-3xl animate-blob-move-2" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 text-sm text-emerald-700 font-medium animate-fade-in-up hover:bg-emerald-100 transition-colors"
          >
            <Youtube className="w-4 h-4" />
            YouTube チャンネル公開中
          </a>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 animate-fade-in-up">
            遊んでたら、
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              英語ができてた。
            </span>
          </h1>

          <p
            className="max-w-[600px] text-lg text-slate-600 md:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            マインクラフトの実況を見ているだけで、
            <br />
            気づいたら英語が聞き取れるようになる。
            <br className="hidden md:block" />
            そんな新しい英語体験を、YouTubeで届けます。
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                YouTubeを見てみる
                <Play className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("method")}
              className="border-slate-300 hover:bg-slate-50 hover:scale-105 transition-all duration-300"
            >
              学習メソッドを知る
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Problems ---
const problems = [
  {
    icon: Frown,
    title: "英語の勉強が続かない",
    description:
      "テキストや単語帳を開いても退屈で挫折してしまう。モチベーションが保てない。",
  },
  {
    icon: BookOpen,
    title: "勉強感が強すぎる",
    description:
      "「勉強しなきゃ」というプレッシャーがストレスに。楽しさがないから身につかない。",
  },
  {
    icon: Timer,
    title: "忙しくて時間がない",
    description:
      "まとまった学習時間が取れない。スキマ時間で手軽に触れられる方法が欲しい。",
  },
]

function ProblemsSection() {
  const { ref, isVisible } = useInView()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">PROBLEMS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            英語学習、こんな悩みありませんか？
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Solution ---
function SolutionSection() {
  const { ref, isVisible } = useInView()

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">SOLUTION</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            答えは「遊ぶこと」だった
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            教科書を捨てて、マインクラフトの世界に飛び込もう。
            <br />
            ゲームの中で自然に英語に触れることで、
            <br className="hidden md:block" />
            「気づいたらわかるようになっていた」を実現します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-400 mb-2">
              従来の英語学習
            </h3>
            <ul className="space-y-3 text-slate-500">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                テキストや単語帳を繰り返し暗記
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                文法ルールを覚えて問題を解く
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                義務感だけで続かない
              </li>
            </ul>
          </div>

          <div
            className={`bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 shadow-sm border border-emerald-100 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-2">
              マイクラ English
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                「〇〇は英語で何て言う？」クイズ形式で楽しく学ぶ
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                マイクラの映像で意味が自然とわかる
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                楽しいから毎日続けられる
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Method (Comprehensible Input) ---
function MethodSection() {
  const { ref, isVisible } = useInView()

  const points = [
    {
      icon: Headphones,
      title: "理解可能なインプット",
      description:
        "Comprehensible Input（理解可能なインプット）とは、言語学者スティーブン・クラッシェンが提唱した第二言語習得理論。今の自分のレベルより「ほんの少しだけ上」の内容を大量に浴びることで、自然に言語を習得できるという考え方です。",
    },
    {
      icon: Sparkles,
      title: "映像が意味を補完する",
      description:
        "マインクラフトのゲーム画面が強力なコンテキストを提供。「何について話しているか」が映像で分かるから、知らない単語でも意味を推測できます。まるで赤ちゃんが母語を覚えるように。",
    },
    {
      icon: Brain,
      title: "クイズ形式で記憶に残る",
      description:
        "「育てるって英語で？」「G R _ W」のような穴埋めクイズで、自分の頭で考えてから答え合わせ。受動的に見るだけでなく、能動的に参加するから定着率が違います。",
    },
  ]

  return (
    <section id="method" ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">METHOD</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            科学的に裏付けされた学習法
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            ただ「楽しい」だけじゃない。
            <br />
            第二言語習得研究に基づいた、本当に効果のあるメソッドです。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {points.map((point, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <point.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {point.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- Video Style ---
function VideoStyleSection() {
  const { ref, isVisible } = useInView()

  const examples = [
    { japanese: "育てるって何て言う？", hint: "GR_W", answer: "GROW" },
    { japanese: "収穫って英語で？", hint: "H_RV_ST", answer: "HARVEST" },
    { japanese: "作物は英語で？", hint: "CR_PS", answer: "CROPS" },
    { japanese: "村って何て言う？", hint: "V_LL_GE", answer: "VILLAGE" },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">VIDEO STYLE</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            こんな動画を配信中
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            マイクラをプレイしながら「〇〇は英語で何て言う？」を
            <br className="hidden md:block" />
            クイズ形式で出題。穴埋めヒントで考えて、答え合わせ。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`bg-slate-900 rounded-2xl p-6 text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="text-emerald-400 font-medium text-sm mb-2">
                {example.japanese}
              </p>
              <p className="text-3xl font-bold text-white tracking-wider font-mono">
                {example.hint}
              </p>
              <div className="mt-3 inline-block bg-emerald-500/20 rounded-full px-3 py-1">
                <p className="text-emerald-400 text-sm font-medium">
                  Answer: {example.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              チャンネルを見る
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

// --- YouTube Channel ---
function YoutubeSection() {
  const { ref, isVisible } = useInView()

  return (
    <section id="youtube" ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">YOUTUBE</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            YouTube チャンネルについて
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <Youtube className="w-12 h-12 text-white" />
                  </div>
                </a>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  ジョージア出身のホストが、英語でマイクラ実況
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  ジョージア出身のフレンドリーなホストが、簡単な英語でマインクラフトをプレイ。
                  「育てるって何て言う？」「収穫って英語で？」など、
                  マイクラに出てくる英単語をクイズ形式で出題します。
                  穴埋めヒントを見ながら考えて、答え合わせ。
                  ゲームを楽しみながら、自然とボキャブラリーが増えていきます。
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 rounded-full px-3 py-1 text-sm text-emerald-700">
                    <Globe className="w-3.5 h-3.5" />
                    英語でプレイ
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 rounded-full px-3 py-1 text-sm text-emerald-700">
                    <Headphones className="w-3.5 h-3.5" />
                    初心者向け
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-200 rounded-full px-3 py-1 text-sm text-emerald-700">
                    <Zap className="w-3.5 h-3.5" />
                    Comprehensible Input
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-emerald-200/50 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTubeチャンネルを見る
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  LINE で最新情報を受け取る
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- How It Works ---
function HowItWorksSection() {
  const { ref, isVisible } = useInView()

  const steps = [
    {
      icon: Play,
      number: "01",
      title: "動画を再生する",
      description:
        "YouTubeでマイクラ実況を再生。通勤中、寝る前、いつでもOK。",
    },
    {
      icon: Gamepad2,
      number: "02",
      title: "ゲームを楽しむ",
      description:
        "マイクラの冒険を一緒に楽しむ。勉強だと思わなくて大丈夫。",
    },
    {
      icon: Headphones,
      number: "03",
      title: "自然に英語を浴びる",
      description:
        "映像を見ながら英語を聞くことで、意味が自然と理解できる。",
    },
    {
      icon: Sparkles,
      number: "04",
      title: "気づいたら聞き取れる",
      description:
        "繰り返し触れることで、ある日突然「あ、わかる！」の瞬間が訪れる。",
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">HOW IT WORKS</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            使い方はシンプル
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex gap-6 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-emerald-600">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Features ---
function FeaturesSection() {
  const { ref, isVisible } = useInView()

  const features = [
    {
      icon: Gamepad2,
      title: "マインクラフトという最強のコンテンツ",
      description:
        "世界で最もプレイされたゲームの一つ。年齢・国籍問わず楽しめるから、英語学習の入り口に最適です。",
    },
    {
      icon: Globe,
      title: "ジョージアの文化も学べる",
      description:
        "ホストの母国ジョージアの話も飛び出すかも？英語だけでなく、異文化への興味も広がります。",
    },
    {
      icon: Zap,
      title: "無料で始められる",
      description:
        "YouTubeだから完全無料。教材費もレッスン料もゼロ。必要なのはスマホかPCだけ。",
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">FEATURES</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            ここが違う
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-100 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- FAQ ---
const faqs = [
  {
    question: "英語が全くできなくても大丈夫ですか？",
    answer:
      "はい、大丈夫です。動画では簡単な英語をゆっくりはっきり話しています。映像でゲームの状況が分かるので、英語が聞き取れなくても内容を理解できます。見続けることで少しずつ耳が慣れていきます。",
  },
  {
    question: "Comprehensible Inputって本当に効果があるんですか？",
    answer:
      "言語学者スティーブン・クラッシェンの研究に基づいた、第二言語習得で最も支持されている理論の一つです。「理解可能なインプットを大量に浴びること」が言語習得の鍵だとされており、多くの多言語話者がこの方法で言語を身につけています。",
  },
  {
    question: "どのくらいで効果を感じられますか？",
    answer:
      "個人差はありますが、毎日20〜30分の視聴を続けると、数週間で簡単なフレーズが聞き取れるようになってきます。大切なのは「楽しみながら続けること」。無理せず、ゲームを楽しむ感覚で視聴してください。",
  },
  {
    question: "子どもでも見られますか？",
    answer:
      "もちろんです。マインクラフトは子どもにも大人気のゲームです。簡単な英語で進行するので、お子さまの英語耳を育てるのにもぴったりです。",
  },
  {
    question: "なぜジョージアの人なんですか？",
    answer:
      "ジョージア出身のホストは英語が母語ではないからこそ、学習者の気持ちがわかります。ネイティブのように速く話しすぎず、クリアで聞き取りやすい英語を話すので、学習者にとって最適なインプットを提供できます。",
  },
]

function FaqSection() {
  const { ref, isVisible } = useInView()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-medium mb-2">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
            よくある質問
          </h2>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-slate-100 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

// --- CTA ---
function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 mb-4">
            英語は、
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              楽しんだもの勝ち。
            </span>
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            マイクラの世界で、新しい英語体験を始めよう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-5 w-5" />
                YouTubeを見る
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                LINEで情報を受け取る
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Simple Header for this LP ---
function LpHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            width={60}
            height={40}
            alt="miitaso"
            className="h-8 w-auto"
          />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          miitaso トップへ
        </Link>
      </div>
    </header>
  )
}

// --- Footer ---
function LpFooter() {
  return (
    <footer className="w-full border-t border-slate-100 bg-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                width={60}
                height={40}
                alt="miitaso"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              遊んでたら、英語ができてた。
              <br />
              マイクラ × Comprehensible Input で新しい英語体験を。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">会社情報</h3>
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>〒104-0061 東京都中央区銀座1丁目12番4号N&E BLD.6F</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} miitaso. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// --- Page ---
export default function MinecraftEnglishPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LpHeader />
      <main className="flex-1">
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <VideoStyleSection />
        <MethodSection />
        <YoutubeSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LpFooter />
    </div>
  )
}
