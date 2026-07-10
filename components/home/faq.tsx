import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/corporate/reveal"
import { Section, SectionHeading } from "@/components/corporate/section"

const faqs = [
  {
    question: "費用の目安を教えてください",
    answer:
      "プロジェクトの規模や要件によって大きく変わるため、一律の料金は設けていません。無料相談で要件をうかがった上で、お見積もりをご提示します。予算が限られている場合は、その範囲でできる進め方からご提案します。",
  },
  {
    question: "開発期間はどのくらいですか？",
    answer:
      "要件の複雑さや確定状況によって変わります。小さく作って検証するMVPから段階的に進めることもできますので、スケジュールのご希望もあわせてご相談ください。",
  },
  {
    question: "どんな技術を使っていますか？",
    answer:
      "Next.js / React / TypeScript を中心に、Node.js・Python・Ruby・PHP、モバイルは Flutter に対応しています。AI機能は Claude（Anthropic）・OpenAI、インフラは AWS・Vercel・PostgreSQL（Neon）・Firebase など、プロジェクトに合わせて選定します。",
  },
  {
    question: "AIは自社でも使えるので、外部に頼む必要がない気がします",
    answer:
      "ChatGPTなどのツールを業務で使うことと、業務プロセスにAIを組み込んで成果を出すことは、別の仕事です。後者には、効果が出る業務の特定、既存システムとの連携、精度の検証、運用定着までの設計が必要になります。私たちが請け負うのはその全体です。逆に、ツールの活用だけで十分なケースでは、その旨を正直にお伝えします。",
  },
  {
    question: "AIに詳しくなくても相談できますか？",
    answer:
      "問題ありません。「AIで何ができるのか分からない」という段階からのご相談がほとんどです。業務をうかがいながら、AIが効く箇所・効かない箇所を整理するところから一緒に始めます。",
  },
  {
    question: "小さく始められますか？",
    answer:
      "はい。最初から大きく作るのではなく、小さなスコープで検証しながら広げていく進め方を推奨しています。まずは一部の業務や一つの機能からで構いません。",
  },
  {
    question: "相談だけでも大丈夫ですか？",
    answer:
      "もちろんです。アイデア段階・構想段階のご相談も歓迎します。「何から始めればいいか分からない」という状態でも、一緒に整理していきますのでお気軽にお問い合わせください。相談は無料です。",
  },
]

/**
 * FAQ（ダーク版アコーディオン）。
 */
export function Faq() {
  return (
    <Section id="faq" variant="transparent" chapter="06 次はあなた" className="scroll-mt-16">
      <SectionHeading
        label="FAQ"
        title="よくある質問"
        lead="その他のご質問は、お問い合わせフォームからお気軽にどうぞ。"
      />
      <Reveal>
        <Accordion type="single" collapsible className="max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl border border-white/10 bg-[#050a18]/70 px-6 backdrop-blur"
            >
              <AccordionTrigger className="py-5 text-left font-medium text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  )
}
