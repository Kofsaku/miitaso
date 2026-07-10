import { Marquee } from "@/components/corporate/marquee"

/** 事実シート「使用技術」に記載のあるものだけを流す */
const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Ruby",
  "PHP",
  "Flutter",
  "PostgreSQL (Neon)",
  "Firebase",
  "AWS",
  "Vercel",
  "Claude (Anthropic)",
  "OpenAI",
  "LINE Messaging API",
  "Shopify",
  "Salesforce API",
  "Tailwind CSS",
]

/**
 * テックスタックの無限マーキー。
 */
export function TechMarquee() {
  return (
    <section aria-label="使用技術" className="border-y border-white/5 py-10">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
        TECH STACK
      </p>
      <Marquee duration={40} fadeColor="#030712">
        {techs.map((tech) => (
          <span key={tech} className="px-8 font-mono text-sm text-slate-400">
            {tech}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
