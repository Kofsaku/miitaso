# miitaso ブログ機能 設計ドキュメント

日付: 2026-07-02
ステータス: ユーザーレビュー待ち（記事ソース戦略はAFK中の仮決め＝要承認）

## 目的

miitaso.com への検索流入（SEO）を長期資産として構築する。現状は検索流入ほぼゼロ・新規問い合わせゼロ。ブログは「今すぐの問い合わせ獲得」ではなく6〜12ヶ月スパンの資産構築と位置づける（短期はアウトバウンドが担う）。

## チャネル戦略上の役割

既存の役割分担「動画=実演／note=主張／X=拡散」に **ブログ=検索の受け皿** を追加する。

- **正本ソース**: YouTube台本36本（`/Users/kt/youtube戦略/原稿/_新体制_2026-06-18/`、各6,300〜7,600字・検索キーワード設計済み）
- **note18本は転載しない**。noteはnoteのまま独立維持（重複コンテンツ回避、noteドメインとの検索カニバリ回避、役割分担維持）
- 対応する動画が公開済みの記事にはYouTube埋め込みを置き、記事↔動画を相互リンク
- AIによるゼロからの量産はしない。既存の一次コンテンツの再編集のみ（scaled content abuse回避、E-E-A-T維持）

## URL構造

| パス | 内容 |
|---|---|
| `/blog` | 記事一覧。新しい順。v1はページネーションなし |
| `/blog/[slug]` | 記事本文。slugは英語ケバブケース（例: `market-size-myth`） |
| `/blog/feed.xml` | RSS 2.0 フィード |

ヘッダーとフッターのナビに「ブログ」（`/blog`）を追加する。編集対象は現行ダークテック版の `components/corporate/site-header.tsx` と `site-footer.tsx`（旧 `components/header.tsx` は使われていないため触らない）。

## アーキテクチャ（A案: リポジトリ内Markdown + SSG）

### コンテンツ層

- 記事は `content/blog/<slug>.md`。frontmatter＋本文Markdown
- frontmatterスキーマ:
  - `title` (必須): 記事タイトル（H1相当。本文にH1は書かない）
  - `description` (必須): メタディスクリプション兼一覧の要約（80〜120字）
  - `date` (必須): 公開日 YYYY-MM-DD
  - `category` (必須): `新規事業` | `AI導入` | `開発` のいずれか（一覧でのラベル表示のみ。カテゴリページはv1では作らない）
  - `keywords` (任意): 狙う検索キーワードの配列（メモ用途＋meta keywords）
  - `videoId` (任意): 対応するYouTube動画ID。あれば記事内に埋め込み
  - `status` (必須): `published` | `draft`。draftは一覧・sitemap・フィード・generateStaticParamsから除外
- 読み込みユーティリティ `lib/blog.ts`: 全記事取得（date降順）／slug指定取得／frontmatter検証（必須欠落はビルド時に明示的エラー）
- 依存追加は `gray-matter` のみ

### ページ層

- `app/blog/page.tsx`: 一覧。SSG。カード型リスト（タイトル・日付・カテゴリ・description）
- `app/blog/[slug]/page.tsx`: 記事。`generateStaticParams`でSSG、`generateMetadata`でtitle/description/canonical/OG/Twitterカードを出力。JSON-LD（`Article`）を`<script type="application/ld+json">`で埋め込み
- `app/blog/_components/BlogMarkdown.tsx`: 既存プラグインスタック（remark-gfm / remark-cjk-friendly / rehype-slug / rehype-autolink-headings / rehype-highlight）を使う描画コンポーネント。`/research`の`ReportMarkdown`はライトテーマ＋レポート専用CTAのため流用せず、ブログ専用に作る
- デザインはコーポレートサイトのダークテック系テーマを踏襲。`@tailwindcss/typography`の`prose prose-invert`ベース
- ブログの一覧・記事ページは他のコーポレートページと同様に `SiteHeader` / `SiteFooter`（`components/corporate/`）で挟む
- 記事末に問い合わせCTA。リンク先は既存サイトの慣習どおり `/#contact`（トップページの問い合わせフォームセクション）
- OG画像はv1ではサイト共通のものを使用

### SEO層

- `app/sitemap.ts` を拡張し、`/blog`と全published記事を記事ディレクトリから動的に列挙（既存の手書きルート列挙は維持）
- RSS: `app/blog/feed.xml/route.ts` で published 記事から生成
- 記事ページはSSGなので追加のキャッシュ設定は不要

## 記事制作パイプライン（運用）

1. YouTube台本1本を選ぶ（初弾は`_撮影公開プラン.md`の最初の6本を優先）
2. AI再編集: 話し言葉→書き言葉、ト書き・タイムコード削除、検索意図に合わせた構成へ再設計、4,000〜6,000字、H2/H3見出し、`miitaso-core/voice.md`準拠、守秘ルール維持（実クライアント名・AIモデル名を出さない、業種一般化）、既存記事への内部リンク
3. コフさんレビュー（内容の質・守秘の最終確認）
4. commit & push → Vercelデプロイ＝公開
5. 週1本ペース（在庫36本≒約8ヶ月分）

## v1スコープ

- ブログ基盤一式（上記ページ・SEO層・ナビ追加）
- 初弾記事3本（候補: 05 MVPを作りたいの9割／20 市場規模○兆円の本当の読み方／26 システム入れれば解決がなぜ入力を増やすのか。最終選定はユーザー）

### v2以降（今回はやらない）

- 記事別OG画像の自動生成（next/og）
- カテゴリページ・ページネーション（記事20本超あたりで導入）
- 関連記事の自動表示

## エラーハンドリング

- 存在しないslug → `notFound()`（404）
- frontmatter必須項目欠落 → `lib/blog.ts`がビルド時に明示的エラーで落とす（不正データのまま公開しない）
- `content/blog/`が空でも一覧ページはビルド可能（空状態表示）

## テスト・検証

- `npm run build` が通ること（SSGで全記事が生成されること）
- ローカルで確認: 記事ページのmeta/OG/JSON-LD出力、sitemap.xmlへの記事反映、feed.xmlの妥当性、draft記事が一覧・sitemapに出ないこと
- モバイル表示（一覧・記事）の目視確認

## 決定事項の背景

- **SSG（A案）を選んだ理由**: SEOには静的・高速・インデックス可能が最重要。既存の`/research`（Neon DB・動的・noindex）とは要件が真逆のため流用しない。CMSは一人＋AI運用では不要
- **note転載をやめた理由**: noteはcanonical指定ができず、ドメインの強いnote側が検索上位を取り、miitaso.comのSEO資産化という本来目的が達成できないため
