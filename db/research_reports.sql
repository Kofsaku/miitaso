-- LINE「research」リードマグネット用テーブル
-- Neon(Postgres)で一度だけ実行する。
-- 設計の出典: /Users/kt/SNS戦略/06_LINE特典_research機能.md

create table if not exists research_reports (
  slug          text primary key,            -- 推測不能スラッグ（URL: /research/<slug>）
  line_user_id  text,                         -- LINEのuserId（無料回数の管理用）
  idea          text not null,                -- ユーザーが送った事業アイデア
  status        text not null default 'pending', -- pending | processing | done | error
  summary       text,                         -- LINE通知用の短いサマリー
  report_md     text,                         -- レポート本文（Markdown）
  cost_usd      numeric,                      -- claude -p の total_cost_usd（監視用）
  created_at    timestamptz not null default now(),
  done_at       timestamptz
);

create index if not exists idx_research_reports_status on research_reports (status, created_at);
create index if not exists idx_research_reports_user   on research_reports (line_user_id);
