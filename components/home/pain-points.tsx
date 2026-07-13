import { Check } from "lucide-react"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

/**
 * 自己同定を作るペインチェックリスト。
 * 文言は理想顧客（「AIで何かしたいが何から手をつければいいか分からない経営者」）が
 * 実際に使う言葉をそのまま置く。ひとつでも当てはまれば相談へ、という導線。
 */
const painPoints = [
  "AIで何かしたいが、自社の何に使えるか分からない",
  "ウチみたいな商売でも、AIは使えるのだろうか",
  "アイデアはあるが、これでいいのか自信がない",
  "相談できる相手がいない",
  "業者に頼むと、結局こちらが全部決めることになる",
  "前に作ってもらったが、思っていたものと違った",
]

export function PainPoints() {
  return (
    <Section variant="transparent" chapter="01 課題" className="scroll-mt-16">
      <SectionHeading
        label="CHECKLIST"
        title={
          <>
            こんなこと、
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              ありませんか？
            </span>
          </>
        }
        lead="ひとつでも当てはまれば、まずは頭の整理からご一緒します。"
      />
      <div data-particle-avoid className="grid gap-4 sm:grid-cols-2">
        {painPoints.map((text, i) => (
          <Reveal key={text} delay={i * 80} className="h-full">
            <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-[#050a18]/70 p-6 backdrop-blur">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10">
                <Check className="h-3.5 w-3.5 text-sky-400" />
              </span>
              <p className="leading-relaxed text-slate-300">「{text}」</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
