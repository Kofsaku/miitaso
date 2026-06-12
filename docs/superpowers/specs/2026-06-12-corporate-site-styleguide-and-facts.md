# miitaso 新サイト スタイルガイド & 事実シート

実装エージェント全員が従う規約。**このシートにない数値・実績・固有名詞をサイトに書くことを禁止する。**

---

## Part 1: スタイルガイド（ダークテック）

### カラートークン

| 用途 | 値 |
|---|---|
| ページ背景 | `bg-[#030712]`（gray-950 相当の濃紺黒） |
| セカンダリ背景（交互セクション） | `bg-[#070b14]` |
| カード/サーフェス | `bg-white/[0.03]`、ホバー `bg-white/[0.06]` |
| ボーダー | `border-white/10`、ホバー `border-sky-400/40` |
| 見出しテキスト | `text-white` |
| 本文テキスト | `text-slate-400`（読ませる本文は `text-slate-300`） |
| 補足/キャプション | `text-slate-500` |
| アクセントグラデ（テキスト・線） | `from-sky-400 via-blue-500 to-violet-500` |
| アクセント単色 | `text-sky-400` |
| 成功/チェック | `text-emerald-400` |

### ボタン

- **プライマリCTA**: 白背景・黒文字（Vercel風）`bg-white text-gray-950 hover:bg-slate-200 rounded-full px-8 font-semibold`
- **セカンダリ**: `border border-white/20 text-white hover:bg-white/10 rounded-full`
- 既存 `components/ui/button.tsx` は使っても使わなくてもよい（クラス上書きで対応）

### タイポグラフィ

- フォントは既存の Inter（layout.tsx）を維持。**next/font の追加はしない**
- セクションラベル: 等幅 `font-mono text-xs tracking-[0.25em] uppercase text-sky-400`（例: `AI INTEGRATION`）。font-mono は Tailwind デフォルト（システム等幅）
- H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white`
- H2: `text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white`
- 強調語はアクセントグラデの `bg-clip-text text-transparent`
- 日本語見出しは漢字かな交じりで短く。英語ラベルを添えて「テック感」を出す

### レイアウト・装飾

- セクション: `py-24 md:py-32`、コンテナ `container px-4 md:px-6` + `max-w-6xl mx-auto`
- セクション頭は必ず: ラベル（mono）→ H2 → リード文（`text-slate-400 max-w-2xl`）
- グリッド背景（Heroなど）: CSSのみ
  `background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 64px 64px;`
- 発光: `bg-sky-500/20 blur-[120px] rounded-full` の絶対配置 div（1〜2個/セクションまで）
- カード: `rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition`
- ホバーで `-translate-y-1` + ボーダー発光。やりすぎ禁止（精密さ＞派手さ）
- スクロール出現: 共有 `<Reveal>` コンポーネント（IntersectionObserver + opacity/translate-y、`prefers-reduced-motion` 尊重）

### ロゴ

`/logo.png` は黒一色 → ダーク上では `className="invert"` を付ける。

### 文体

- です・ます調。煽らない。技術者の静かな自信。「〜できます」より「〜しています」（実例で語る）
- 絵文字・感嘆符の多用禁止

---

## Part 2: 事実シート（これ以外の実績・数値は書くな）

### 会社

- 社名: miitaso（ミータソ）/ 代表: 津端 晃作（つばた こうさく）
- 法人設立: 2024年12月（代表個人としては2021年からフリーランスで開発・PM案件を多数）
- 所在地: 〒104-0061 東京都中央区銀座1丁目12番4号 N&E BLD.6F
- 事業: AI導入支援 / ソフトウェア開発（受託・プロダクト開発）/ 新規事業支援
- 代表写真: `/tsubata.png`

### 代表プロフィール（公開可）

- 自動車部品商社で海外調達・開発営業 → 運送・物流SaaSスタートアップで営業からエンジニアに転身
- Ruby/JavaScript/AWS で Salesforce API連携・スクレイピング基盤を要件定義から運用まで単独構築し、車両掲載台数を業界8位→2位に引き上げた
- 2021年からフリーランス（PM・開発）、2024年12月 miitaso 創業
- ベトナム・バングラデシュ等、多国籍オフショア開発チームのPM経験
- 現在のメインスタックは Next.js / React / TypeScript。Claude・OpenAI を使ったAI機能の実装実績多数

### 使用技術（マーキー・スタック表記に使ってよいもの）

Next.js / React / TypeScript / Node.js / Python / Ruby / PHP / Flutter / PostgreSQL(Neon) / Firebase / AWS / Vercel / Claude(Anthropic) / OpenAI / LINE Messaging API / Shopify / Salesforce API / Tailwind CSS

### 数値実績（この4つのみ。これ以外の数値を作るな）

1. 他社見積 **2,000万円** の開発を **500万円** で実現（ペットオーナー向けSNSアプリ、Flutter）
2. データ連携基盤の構築で車両掲載台数 **業界8位 → 2位**（運送・物流SaaS）
3. オフショア開発PM **3カ国**（ベトナム・バングラデシュ・シンガポール）
4. **要件定義から運用まで一気通貫**（単独で全工程を担える）

### 自社プロダクト（実在。アーキテクチャも公開可）

1. **research** — LINEで事業アイデアを送ると、AIエージェント（Claude）が市場調査して数分でレポートを自動生成し miitaso.com/research/ に公開するbot。構成: LINE Webhook(Vercel・署名検証) → Neon(Postgres) → Claude調査ワーカー → LINE push通知
2. **Japan Property** — 海外投資家向け・日本の温泉地物件の英語サイト（多言語LP+問い合わせ）
3. **マイクラ English** — 「遊んでたら、英語ができてた。」マインクラフト×英語学習サービス
4. **物件管理システム** — 物件・ブローカー情報を一元管理する社内基幹システム（認証・権限付き）

### 匿名事例（クライアントワーク。この粒度・匿名のまま使う）

- 自治体の電子通貨アプリ開発 — ITコンサルタントとして要件定義を担当
- B2B繊維商社のECサイト刷新 — Shopify開発PM（改修・新機能開発）
- 運送・物流SaaS — Salesforce API連携/スクレイピング基盤を単独構築（→業界8位→2位）
- 中古車関連企業 — 車両在庫管理DX・在庫管理システムを多数開発
- マーケ支援企業のSFA/CRM — LINE・Instagram DM・Outlook・Gmail連携の顧客管理/ステップ配信ツール
- AIコール領域 — AI自動稼働システム
- AIライブ配信アプリ — 配信中にAIが自動コメント
- 動画自動クリップ生成ツール — YouTube URL→ショートクリップ
- ペットオーナー向けSNS（Flutter）— 他社見積2,000万円→500万円で実現
- eSIM販売アプリ / オンライン写真販売 / 学習塾の単語学習アプリ / 仕事紹介系アプリ（React+Laravel・決済/SMS認証）
- 大手通信キャリアのスマートデバイス連携アプリ — オフショアPM
- 美容室向け大手SaaS — Shopify+ポイントアプリ開発PM

### 禁止事項

- 上記にない数値（「導入実績◯社」「満足度◯%」「◯件納品」等）の捏造
- クライアント実名の記載（自治体名含む。「自治体」「B2B繊維商社」等の匿名表記のみ）
- 「業界No.1」等の優位性主張、効果保証（「売上が上がります」等）
- 料金の具体額（料金は「無料相談で見積もり」へ誘導。既存LPには載っているがコーポレートには載せない）
