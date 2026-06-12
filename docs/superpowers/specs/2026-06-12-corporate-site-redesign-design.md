# miitaso コーポレートサイト全面刷新 設計書

日付: 2026-06-12 / 承認: 津端さん（デザイン=ダークテック系、実績=自社プロダクト+匿名事例、構成=トップ+サービス3ページ）

## 目的

1ページのみの現サイト（淡いブルーの受託テンプレ風）を、「AI導入支援・ソフトウェア開発・新規事業支援」の引き合いにつながる、**技術力の高さが一目で伝わる**サイトに刷新する。

## コンセプト

**「AIで作り、AIを届ける会社」**。差別化の核は「エンジニア出身の代表が、自分たちでAIエージェントを使って開発し、AIプロダクトを本番運用している」という事実。Vercel / Linear / Anthropic 系のダークテック・デザイン。

## ページ構成

| ルート | 内容 | 状態 |
|---|---|---|
| `/` | 新トップ（ダークテック、9セクション） | 全面刷新 |
| `/services/ai` | AI導入支援 詳細 | 新設 |
| `/services/development` | ソフトウェア開発 詳細 | 新設 |
| `/services/new-business` | 新規事業支援 詳細 | 新設 |
| `/about` | 会社概要・代表プロフィール | 刷新（ダーク整合） |
| `/lp/*`, `/research/*`, `/minecraft-english`, `/privacy` | 既存 | 触らない |

## トップページ構成

1. **Hero** — 黒背景＋微細グリッド＋発光グラデ。コピーは「アイデアを、動くプロダクトに。」の進化形。タイピング演出のターミナル（AIエージェント開発の様子）。CTA=無料相談（白ボタン）＋サービスを見る
2. **テックスタック・マーキー** — 実使用技術のみ（Next.js / TypeScript / React / Claude / OpenAI / LINE API / PostgreSQL / Vercel / AWS / Flutter / Shopify / Salesforce）
3. **3本柱サービス** — AI導入支援 / ソフトウェア開発 / 新規事業支援 → 各詳細ページへ
4. **How we build（AI駆動開発）** — research bot の実アーキテクチャ図（LINE → Webhook(Vercel) → Neon → Claude worker → 自動公開）＋コードウィンドウ演出
5. **自社プロダクト** — research（AI市場調査bot）、Japan Property（海外投資家向け不動産）、マイクラEnglish、物件管理システム（社内基幹）
6. **実績スタッツ＋匿名事例** — 事実シートにある数値・事例のみ
7. **プロセス** — ヒアリング → 設計 → AI駆動開発 → 運用伴走
8. **FAQ** — 既存ベースを更新
9. **Contact** — 既存 `/api/contact` + reCAPTCHA を流用、ダークに再スタイル

## サービス詳細ページ（3枚共通パターン）

ヒーロー（課題提起＋約束）→ こんな課題に → 提供内容（3-4ブロック）→ 進め方 → 関連実績（事実シートから）→ FAQ → CTA（無料相談 = `/#contact` へ）。共通コンポーネント `components/corporate/` のサービスページ部品を使い、3枚の見た目を揃える。

## 技術方針

- **新規 npm 依存ゼロ**（過去の Vercel ビルド事故対策）。アニメは CSS keyframes + IntersectionObserver + 軽量 canvas
- 新コードは `components/corporate/`（共有）と `components/home/`（トップ専用）に分離。既存 `components/sections/*` は削除せず残す（ロールバック容易）
- `tailwind.config.{js,ts}` は**編集しない**（未コミット変更が存在）。追加スタイルは `app/globals.css` の追記のみ
- ロゴは黒一色 → ダーク背景では CSS `invert` で白化
- ダークは**ページ単位のスコープ**（各ページのルート要素に背景色を指定）。`globals.css` の `:root` 変数や `body` スタイルは変更しない（既存ライトページを壊さない）
- metadata / `app/sitemap.ts` 更新。フォントは既存 Inter を維持（日本語はシステムゴシック）
- コンタクトフォームのロジックは既存 `components/sections/contact.tsx` から移植（API・reCAPTCHA動作を変えない）

## 公開フロー

feature ブランチで実装 → `npm run build` 検証 → コミット → 津端さんがローカル/プレビューで確認 → main マージで公開。

## 検証

- `npm run build` 成功
- 全新規ルートが 200 を返す（dev サーバで確認）
- 既存ページ（/lp/*, /research, /privacy）が無変更で動作
- 掲載内容がすべて事実シート（styleguide-and-facts.md）に由来すること
