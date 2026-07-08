# トップページWebGL刷新 設計書 — 「思考が、構造になる。」

日付: 2026-07-07
対象: `app/page.tsx`（トップページのみ）
参考: minamo-studio.netlify.app / tokyo-metro-3d-model.netlify.app

## 目的

miitaso.com のトップページを、WebGL・シェーダー・スクロール駆動演出によるアワード級の体験に刷新する。**テキストコンテンツ・セクション構成・SEOメタデータは現状維持**。デザイン性とモーションのみを最高水準に引き上げる。サイト自体を「作れるコンサル」の証拠にする。

## 決定事項

| 論点 | 決定 |
|---|---|
| 対象範囲 | トップページのみ（下層は触らない） |
| 演出の核 | 粒子が「カオス（思考）→構造（プロダクト）」へ組み上がるスクロール物語 |
| 振り切り度 | アワード級（ローディング演出・フルスクリーン粒子ヒーロー）。ただしガードレール付き |
| 技術 | React Three Fiber + カスタムGLSL + Lenis + GSAP |

## 体験設計（ナラティブ）

WebGLキャンバスは画面に固定（`position: fixed`, z-0）され、コンテンツがその上をスクロールする。粒子は全編を通して存在し、スクロール位置に応じて姿をモーフィングする。

### ローディング（初回のみ・最大1.5秒）

粒子が画面中央に収束して「miitaso」のワードマークを形成→散開してヒーローへ。sessionStorageで2回目以降はスキップ。コンテンツ表示をブロックしない。

### 第0章 ヒーロー＝思考のカオス

- 全画面に数万の粒子が漂う（curl noiseによる常時ゆらぎ）
- マウス移動で粒子が反応（斥力/引力）
- コピー「考えるだけでも、」「作るだけでもない。」が1行ずつマスクリビール
- その後、粒子が収束して research ボットのターミナルウィンドウを「組み上げる」。カオスから最初に生まれる構造物が実稼働中の自社AIエージェント＝「作れる証拠」の初撃

### スクロール物語（既存セクションへの章割り当て）

| セクション | 章ラベル | 粒子の姿 |
|---|---|---|
| Hero | 00 思考 | カオス漂流 → ターミナル組み上げ |
| TechMarquee〜Services | 01 設計 | 3つの星座クラスタ（3サービス対応） |
| HowWeBuild | 02 実装 | 流れるパイプライン（光の流れ） |
| Products | 03 成果物 | ワイヤーフレームの画面形状 |
| TrackRecord | 04 実績 | 立ち上がるグラフ形状＋数字カウントアップ |
| Process | 05 進め方 | 一本の道・ステップの光点 |
| FAQ〜Contact | 06 次はあなた | 整然とした格子へ静まり→CTAボタンの発光へ収束 |

### ディテール演出

- カスタムカーソル（ドット＋追従リング、ホバー対象で拡大）— タッチデバイスでは無効
- 磁力ボタン（カーソル接近で吸い付く）
- 文字のライン単位マスクリビール
- 章番号ラベル（`01 思考` 等、モノスペース）
- スクロール進捗インジケーター
- 粒子のブルーム発光、微細フィルムグレイン、章切替時のみ軽い色収差

## 技術アーキテクチャ

### 新規依存

`three` / `@react-three/fiber` / `@react-three/postprocessing` / `lenis` / `gsap`（dreiは実装計画の精査で不要と判明したため採用しない）

> **訂正（2026-07-08、Task 11総合検証で判明）**: 当初「React 18.3.1固定→R3F v8系」で計画・実装したが、実機のheadless Chrome検証でWebGLシーンが`ReactCurrentBatchConfig`未定義エラーで常時クラッシュしていることが発覚した。原因はNext.js 15のApp Routerがクライアントコンポーネントに実際にはReact 19をバンドルすること（package.jsonのreact@18.3.1指定に反して、実行時は19.2.0-canary相当が使われる）。react-reconciler@0.27（R3F v8依存）がReact 19で削除された内部APIにアクセスして例外を投げていた。対応としてReact 18固定の前提を破棄し、`react`/`react-dom`をReact 19系、`@react-three/fiber`をv9系（react-reconciler内蔵）、`@react-three/postprocessing`をv3系へ移行した。詳細は実装計画のTask 11節を参照。

### コンポーネント構成

```
components/webgl/
  scene.tsx            … Canvasホスト。next/dynamic(ssr:false)で遅延読込
  particle-field.tsx   … 粒子システム本体（1つのPoints、GPU側で全計算）
  shaders/             … 頂点/フラグメントシェーダー（GLSL）
  use-scroll-story.ts  … スクロール進捗→章・モーフ進行度の変換
  morph-targets.ts     … 各章の粒子配置を手続き生成
components/home/       … 各セクションを新演出でリライト（テキストは現状維持）
```

### 粒子モーフィング

- 各粒子に章ごとの目標座標を `BufferAttribute` として持たせる
- 頂点シェーダー内で `scrollProgress` uniform に応じて補間（CPUは毎フレームuniform更新のみ）
- デスクトップ約3万粒子で60fps目標
- curl noiseで常時ゆらぎを加算

### スクロール統括

- Lenis（慣性スクロール）→ 進捗を GSAP ScrollTrigger（DOM側演出）と粒子uniform（WebGL側）の両方へ配信
- DOM: 文字リビール・カウントアップ・パララックス = GSAP
- WebGL: モーフ進行 = uniform
- 章境界はDOMセクションのオフセットから算出（mount/resize時に再計測）

### ポストプロセス

Bloom＋Vignette。色収差は章切替の瞬間のみ。モバイルでは全OFF。

## パフォーマンス・ガードレール

- **SEO無傷**: コピー・CTA・メタデータはサーバーレンダリングHTMLのまま。WebGLは装飾レイヤー
- **初回表示**: コピー即表示→粒子は後からフェードイン合流。LCP 2.5秒以内目標
- **モバイル**: 粒子数約1/6、ポストプロセスOFF、カスタムカーソル無効
- **prefers-reduced-motion**: Canvas非表示＋CSSのみの控えめ表示
- **フォールバック**: WebGL非対応/クラッシュ時はErrorBoundaryで現行のGridBackground＋Glowに切替
- **FPS監視**: 45fps未満で粒子数を段階的に自動削減
- **バンドル**: WebGL関連はnext/dynamicで分割、初期JSに含めない

## エラー処理

- Canvas全体をErrorBoundaryでラップ→フォールバック背景
- シェーダーコンパイル失敗・コンテキストロストも同経路で吸収
- フォーム（Contact）は既存実装を変更しない

## 検証（完了条件）

1. `npm run build` 通過
2. スクロール全編の演出通し確認（実ブラウザ）
3. モバイル確認（実機またはDevToolsエミュレーション）
4. `prefers-reduced-motion` 切替確認
5. Lighthouse確認（Performance/SEOが現状から大幅劣化していないこと）
6. Contactフォーム送信が壊れていないこと

## スコープ外

- 下層ページ（services/about/lp/research等）の刷新
- テキストコンテンツの変更
- ヘッダー/フッターの構造変更（見た目の微調整はあり得る）
