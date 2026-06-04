# LINE「research」リードマグネット（市場調査bot）

LINEで `research ＋事業アイデア` を送ると、内部で徹底的に市場調査し、
レポートを `miitaso.com/research/<slug>` に公開してURLを返す機能。

設計の全体像・思想・コスト/誠実さルールは
`/Users/kt/SNS戦略/06_LINE特典_research機能.md` を参照（こちらが正）。

## 構成（4ピース）

| ピース | 実体 | 置き場所 |
|---|---|---|
| ① DB | `db/research_reports.sql` のテーブル | Neon(Postgres) |
| ② レポートページ | `app/research/[slug]/page.tsx` | miitaso / Vercel |
| ③ Webhook | `app/api/line/webhook/route.ts`（＋ `lib/line.ts`） | miitaso / Vercel |
| ④ 調査ワーカー | `worker/research-worker.mjs`（＋ `worker/research_prompt.md`） | **Vercel不可。手元の箱/VPS** |

```
LINE → ③Webhook(Vercel): 署名検証 → pending登録 → reply tokenで即「調査中」ack
④Worker(手元): pending を claude -p で調査 → report_md をNeonに書き戻し
              → LINE push で「サマリー＋ miitaso.com/research/<slug>」
ユーザー → ②ページ がNeonからMarkdownを引いて描画
```

## セットアップ

### 1. DBテーブル作成（一度だけ）
Neonのコンソール or psql で `db/research_reports.sql` を実行。

### 2. LINE 設定（LINE Developers）
- Messaging APIチャネルを作成
- Webhook URL = `https://miitaso.com/api/line/webhook`、Webhook利用をON
- 応答メッセージ（自動応答）はOFF（botが返すため）
- チャネルシークレット / チャネルアクセストークンを控える

### 3. 環境変数
Vercel（②③）側:
```
DATABASE_URL=...                      # Neon（既存）
LINE_CHANNEL_SECRET=...               # 署名検証
LINE_CHANNEL_ACCESS_TOKEN=...         # reply/push
NEXT_PUBLIC_LINE_ADD_FRIEND_URL=...   # レポート末尾CTAの遷移先（未設定なら /contact）
RESEARCH_FREE_LIMIT=3                 # 任意：無料回数
```
ワーカー（④）側（手元の箱）:
```
DATABASE_URL=...                      # 同じNeon
ANTHROPIC_API_KEY=...                 # claude -p 用
LINE_CHANNEL_ACCESS_TOKEN=...         # push用
SITE_BASE_URL=https://miitaso.com     # 任意
RESEARCH_MODEL=opus                   # 任意
RESEARCH_MAX_TURNS=30                 # 任意：コスト/レイテンシ上限
RESEARCH_MAX_BUDGET_USD=1.5           # 任意：1回あたり予算上限
RESEARCH_POLL_MS=5000                 # 任意：ポーリング間隔
RESEARCH_TIMEOUT_MS=600000            # 任意：1ジョブのタイムアウト(10分)
```

### 4. ワーカー起動（手元 or VPS）
```
cd /Users/kt/miitaso
node worker/research-worker.mjs
```
常駐させる場合は launchd / pm2 / systemd / cron 等で。

## ⚠️ 実装前に確認すべきこと（スケルトンのため未確定）

- **`claude -p` のフラグ名はバージョン差がある。** `claude --help` で実機確認すること。
  特に `--append-system-prompt-file` / `--max-budget-usd` / `--permission-mode bypassPermissions`。
  代替: `--dangerously-skip-permissions`、または `--max-turns` のみでコスト管理。
  （安全の本丸は「ツールをWebSearch/WebFetchに絞る」こと。これは効いている前提。）
- ④ワーカーは miitaso の `node_modules`（@neondatabase/serverless）を使う前提で
  miitasoディレクトリから実行する。別環境で動かすなら `npm i @neondatabase/serverless` を。
- コスト/不正対策は**先に**入れる: 無料回数（実装済み・簡易）／月次コスト上限（未実装・要追加）／スパム判定（未実装）。
- レポート公開前のモデレーション（未実装・要追加）。`processOne` で `report_md` を検証してから done にする。
- `extractSummary` は簡易版。サマリーの質を上げるなら別途調整。

## 動作確認の手順（このスケルトンはまだ通しで未検証）
1. DBテーブル作成
2. `vercel dev` or 本番で webhook を疎通（LINE Developersの「検証」）
3. 友だち追加 → オンボーディングが返るか
4. `research テスト案` 送信 → 「調査中」ackが返り、`research_reports` に pending 行ができるか
5. 手元で worker 起動 → 行が done になり、LINEにURLがpushされるか
6. URLを開く → レポートが描画されるか（未完了なら「作成中」表示）
