# トップページWebGL刷新 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** miitaso.com トップページに、粒子が「カオス→構造」へモーフィングするWebGLスクロール物語を実装する（設計書: `docs/superpowers/specs/2026-07-07-top-page-webgl-redesign-design.md`）。

**Architecture:** 固定配置のR3F Canvasが背後で粒子を描画し、コンテンツ（既存セクション、テキスト不変）がその上をスクロールする。粒子の形状は章ごとの目標座標をBufferAttributeとして持ち、頂点シェーダーがスクロール進行度uniformで補間する。スクロール状態はモジュールシングルトン`storyState`を介してDOM側（Lenis/GSAP）とWebGL側（useFrame）が共有する。

**Tech Stack:** Next.js 15 (App Router) / React 18 / three + @react-three/fiber v8 / @react-three/postprocessing / lenis / gsap / vitest（純ロジックのみ）

## Global Constraints

- ~~React 18.3.1 固定 → @react-three/fiber は v8系。@react-three/postprocessing は v2系~~ **【2026-07-08訂正】** Task 11の実機検証でNext.js 15がクライアントに実際にはReact 19をバンドルすることが判明（package.json記載と無関係に実行時はReact 19）。R3F v8はReact 19未対応のreact-reconciler@0.27に依存しており常時クラッシュしていた。**現行の正**: `react`/`react-dom` は19系、`@react-three/fiber` は **v9系**（react-reconciler内蔵）、`@react-three/postprocessing` は **v3系**。詳細は本ファイル末尾のTask 11節を参照
- **テキストコンテンツ・セクション順序・id（`services` `products` `works` `faq` `contact`）・メタデータは変更禁止**
- 下層ページ（services/about/lp等）に影響を出さない：共有コンポーネント（`Section` `StepFlow`）の既存デフォルト挙動を変えない（新propの追加のみ可）
- 既存ファイルの変更は `package.json` / `app/page.tsx` / `app/globals.css`（末尾追記のみ） / `components/home/` / 共有コンポーネント（`Section`・`StepFlow`）へのprop追加、に限る。Contactフォームのロジックは変更禁止
- WebGL関連は `next/dynamic` + `ssr: false` で遅延読込。コピー・CTAはSSRのまま
- `prefers-reduced-motion: reduce` 時：Canvas非表示・Lenis無効・イントロスキップ・カスタムカーソル無効
- 粒子数: デスクトップ24,000 / 劣化時12,000→4,500 / モバイル(coarse pointer)4,500。FPS 45未満で自動劣化
- カメラ: fov 50 / position (0,0,9) / 粒子はz=0平面近傍。可視平面: 高さ `2*9*tan(25°)≈8.39`、幅 `8.39*aspect`
- コミットは各タスク末尾で。コミットメッセージ末尾に `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- **デプロイの罠（過去実績）**: 新規ファイルのコミット漏れでVercelだけ落ちる事故があるため、コミット前に `git status` で未追跡ファイルを必ず確認

## File Structure

```
components/webgl/
  morph-targets.ts      … 章ごとの粒子配置を手続き生成（純関数・テスト対象）
  story-state.ts        … スクロール物語の共有状態シングルトン
  scroll-story.ts       … スクロール位置→章/mix変換（純関数・テスト対象）＋DOM計測
  world-mapping.ts      … ピクセル→ワールド座標変換（純関数・テスト対象）
  quality.ts            … デバイス品質プロファイルと劣化（純関数・テスト対象）
  shaders.ts            … GLSL（頂点/フラグメント）テンプレート文字列
  particle-field.tsx    … Pointsとシェーダーマテリアル
  scene.tsx             … Canvas・ポストプロセス・FPS監視・マウス追跡
  stage-loader.tsx      … dynamic import＋フォールバック背景＋ErrorBoundary
  smooth-scroll.tsx     … Lenis＋ScrollTrigger統合
  scroll-progress.tsx   … 上部進捗バー
  intro-overlay.tsx     … 初回イントロ（sessionStorage制御）
  runtime-targets.ts    … ワードマーク文字サンプリング＋ターミナル枠（ブラウザ専用）
  cursor-fx.tsx         … カスタムカーソル
  magnetic.tsx          … 磁力ボタンラッパー
  __tests__/            … vitestユニットテスト
components/corporate/
  section.tsx           … 変更: variant="transparent" と chapter prop追加
  service-page.tsx      … 変更: StepFlowにvariant prop追加（default維持）
components/home/        … 変更: 各セクションにvariant/chapter指定（テキスト不変）
app/page.tsx            … 変更: レイヤー統合＋data-story-chapter
app/globals.css         … 追記: マスクリビール・Lenis・カーソル・グレイン
```

**章割り当て（データとして固定）:**

| chapter | セクション | 形状 shape | ラベル |
|---|---|---|---|
| 0 | Hero | chaos（＋aTerminal収束） | 00 思考 |
| 1 | Services | constellation | 01 設計 |
| 2 | HowWeBuild | pipeline | 02 実装 |
| 3 | Products | wireframe | 03 成果物 |
| 4 | TrackRecord | graph | 04 実績 |
| 5 | Process | path | 05 進め方 |
| 6 | Faq+Contact | lattice | 06 次はあなた |

---

### Task 1: 依存関係とテスト基盤

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: なし
- Produces: 以降の全タスクが使うnpm依存と `npm test` スクリプト

- [ ] **Step 1: 依存を追加**

```bash
cd /Users/kt/miitaso
npm install three@^0.169.0 @react-three/fiber@^8.17.10 @react-three/postprocessing@^2.16.3 lenis@^1.1.14 gsap@^3.12.5
npm install -D vitest@^2.1.8 @types/three@^0.169.0
```

Expected: エラーなく完了。`@react-three/fiber` がv8系で入ることを `npm ls @react-three/fiber` で確認（**v9が入ったら失敗**。React 18と非互換のため `npm install @react-three/fiber@8` で入れ直す）。

- [ ] **Step 2: testスクリプトを追加**

`package.json` の `"scripts"` に追加:

```json
    "test": "vitest run --passWithNoTests"
```

- [ ] **Step 3: 検証**

```bash
npm test
npm run build
```

Expected: vitest が "No test files found, exiting with code 0"、build 成功。

- [ ] **Step 4: コミット**

```bash
git status   # 未追跡ファイルがpackage.json/package-lock.json以外に無いこと
git add package.json package-lock.json
git commit -m "chore(webgl): three/r3f/lenis/gsap/vitestを導入

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 形状ジェネレータ morph-targets.ts（TDD）

**Files:**
- Create: `components/webgl/morph-targets.ts`
- Test: `components/webgl/__tests__/morph-targets.test.ts`

**Interfaces:**
- Consumes: なし（純関数）
- Produces:
  - `mulberry32(seed: number): () => number` — 決定的乱数
  - `type ShapeName = 'chaos'|'constellation'|'pipeline'|'wireframe'|'graph'|'path'|'lattice'`
  - `generateShape(name: ShapeName, count: number, seed?: number): Float32Array` — 長さ `count*3`
  - `CHAPTER_SHAPES: ShapeName[]` — index=章番号0..6（上の表の順）

- [ ] **Step 1: 失敗するテストを書く**

`components/webgl/__tests__/morph-targets.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import {
  CHAPTER_SHAPES,
  generateShape,
  mulberry32,
  type ShapeName,
} from "../morph-targets"

const ALL: ShapeName[] = [
  "chaos", "constellation", "pipeline", "wireframe", "graph", "path", "lattice",
]

describe("mulberry32", () => {
  it("同じseedで同じ列を返す", () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })
  it("0以上1未満を返す", () => {
    const r = mulberry32(7)
    for (let i = 0; i < 100; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe("generateShape", () => {
  it("count*3の長さを返す", () => {
    for (const name of ALL) {
      expect(generateShape(name, 500).length).toBe(1500)
    }
  })
  it("同じ引数で決定的", () => {
    for (const name of ALL) {
      expect(generateShape(name, 300, 5)).toEqual(generateShape(name, 300, 5))
    }
  })
  it("全形状がワールド境界内 (|x|<=7.5, |y|<=4.5, |z|<=3.5)", () => {
    for (const name of ALL) {
      const p = generateShape(name, 900)
      for (let i = 0; i < p.length; i += 3) {
        expect(Math.abs(p[i])).toBeLessThanOrEqual(7.5)
        expect(Math.abs(p[i + 1])).toBeLessThanOrEqual(4.5)
        expect(Math.abs(p[i + 2])).toBeLessThanOrEqual(3.5)
      }
    }
  })
  it("constellationはi%3で3クラスタに分かれ、平均が各中心の近くにある", () => {
    const p = generateShape("constellation", 3000)
    const centers = [
      [-3.4, 0.6], [0, -0.4], [3.4, 0.6],
    ]
    for (let c = 0; c < 3; c++) {
      let sx = 0, sy = 0, n = 0
      for (let i = c; i < 3000; i += 3) {
        sx += p[i * 3]; sy += p[i * 3 + 1]; n++
      }
      expect(Math.abs(sx / n - centers[c][0])).toBeLessThan(0.4)
      expect(Math.abs(sy / n - centers[c][1])).toBeLessThan(0.4)
    }
  })
  it("graphは4本の棒（xが±3/±1の近傍に集まる）", () => {
    const p = generateShape("graph", 2000)
    const cols = [-3, -1, 1, 3]
    for (let i = 0; i < p.length; i += 3) {
      const nearest = Math.min(...cols.map((c) => Math.abs(p[i] - c)))
      expect(nearest).toBeLessThanOrEqual(0.7)
    }
  })
  it("CHAPTER_SHAPESは7章分", () => {
    expect(CHAPTER_SHAPES).toEqual([
      "chaos", "constellation", "pipeline", "wireframe", "graph", "path", "lattice",
    ])
  })
})
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npx vitest run components/webgl/__tests__/morph-targets.test.ts`
Expected: FAIL（モジュールが存在しない）

- [ ] **Step 3: 実装**

`components/webgl/morph-targets.ts`:

```ts
/**
 * 章ごとの粒子目標座標を手続き生成する純関数群。
 * ワールド座標系: カメラ(0,0,9)/fov50 の z=0 平面。x±7.5 / y±4.5 / z±3.5 に収める。
 */

export type ShapeName =
  | "chaos"
  | "constellation"
  | "pipeline"
  | "wireframe"
  | "graph"
  | "path"
  | "lattice"

/** 章番号(0..6) → 形状名 */
export const CHAPTER_SHAPES: ShapeName[] = [
  "chaos",
  "constellation",
  "pipeline",
  "wireframe",
  "graph",
  "path",
  "lattice",
]

/** 決定的な擬似乱数（テスト可能性とSSR/CSR一致のため Math.random は使わない） */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Box-Muller。クラスタのガウス分布に使う */
function gaussian(rand: () => number): number {
  const u = Math.max(rand(), 1e-9)
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function chaos(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    out[i * 3] = (rand() * 2 - 1) * 7
    out[i * 3 + 1] = (rand() * 2 - 1) * 4
    out[i * 3 + 2] = (rand() * 2 - 1) * 3
  }
  return out
}

/** 3サービスに対応する3つの星座クラスタ */
function constellation(count: number, rand: () => number): Float32Array {
  const centers = [
    [-3.4, 0.6, 0],
    [0, -0.4, 0],
    [3.4, 0.6, 0],
  ]
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const c = centers[i % 3]
    out[i * 3] = clamp(c[0] + gaussian(rand) * 0.9, -7.5, 7.5)
    out[i * 3 + 1] = clamp(c[1] + gaussian(rand) * 0.7, -4.5, 4.5)
    out[i * 3 + 2] = clamp(c[2] + gaussian(rand) * 0.5, -3.5, 3.5)
  }
  return out
}

/** アイデア→コードの光の流れ。5本の正弦ストリーム */
function pipeline(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const lanes = [-2.4, -1.2, 0, 1.2, 2.4]
  for (let i = 0; i < count; i++) {
    const lane = lanes[i % lanes.length]
    const t = rand()
    const x = -6 + t * 12
    out[i * 3] = x
    out[i * 3 + 1] = clamp(lane * 0.9 + Math.sin(x * 0.8 + lane * 2.1) * 0.55 + gaussian(rand) * 0.08, -4.5, 4.5)
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.5
  }
  return out
}

/** 3枚の画面ワイヤーフレーム（枠＋ヘッダーライン） */
function wireframe(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const screens = [-3.6, 0, 3.6]
  const w = 2.7
  const h = 1.8
  for (let i = 0; i < count; i++) {
    const cx = screens[i % 3]
    const r = rand()
    let x: number, y: number
    if (r < 0.72) {
      // 外周
      const t = rand() * 4
      const side = Math.floor(t)
      const f = t - side
      if (side === 0) { x = -w / 2 + f * w; y = h / 2 }
      else if (side === 1) { x = w / 2; y = h / 2 - f * h }
      else if (side === 2) { x = w / 2 - f * w; y = -h / 2 }
      else { x = -w / 2; y = -h / 2 + f * h }
    } else if (r < 0.86) {
      // タイトルバー
      x = -w / 2 + rand() * w
      y = h / 2 - 0.32
    } else {
      // 内側の行（コンテンツ表現）
      x = -w / 2 + 0.2 + rand() * (w - 0.4)
      y = h / 2 - 0.7 - Math.floor(rand() * 3) * 0.38
    }
    out[i * 3] = cx + x
    out[i * 3 + 1] = y + 0.2
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.15
  }
  return out
}

/** 立ち上がる4本の棒グラフ */
function graph(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const cols = [-3, -1, 1, 3]
  const heights = [1.4, 2.1, 2.9, 3.7]
  for (let i = 0; i < count; i++) {
    const c = i % 4
    out[i * 3] = cols[c] + (rand() * 2 - 1) * 0.55
    out[i * 3 + 1] = -2.1 + rand() * heights[c]
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.4
  }
  return out
}

/** 一本の道＋ステップの光点（4ノード濃縮） */
function path(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const nodeTs = [0.12, 0.38, 0.64, 0.9]
  for (let i = 0; i < count; i++) {
    let t: number
    if (rand() < 0.45) {
      // ノード周辺に濃縮
      t = clamp(nodeTs[i % 4] + gaussian(rand) * 0.02, 0, 1)
    } else {
      t = rand()
    }
    const x = -5.5 + t * 11
    out[i * 3] = x
    out[i * 3 + 1] = clamp(Math.sin(t * Math.PI * 2.2) * 1.5 + gaussian(rand) * 0.07, -4.5, 4.5)
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.3
  }
  return out
}

/** 整然とした3D格子（静まり＝完成） */
function lattice(count: number, rand: () => number): Float32Array {
  const out = new Float32Array(count * 3)
  const nx = 16
  const ny = 9
  const nz = 4
  const cells = nx * ny * nz
  for (let i = 0; i < count; i++) {
    const cell = i % cells
    const ix = cell % nx
    const iy = Math.floor(cell / nx) % ny
    const iz = Math.floor(cell / (nx * ny))
    out[i * 3] = -6 + (ix / (nx - 1)) * 12 + gaussian(rand) * 0.02
    out[i * 3 + 1] = -3.2 + (iy / (ny - 1)) * 6.4 + gaussian(rand) * 0.02
    out[i * 3 + 2] = -1.5 + (iz / (nz - 1)) * 3 + gaussian(rand) * 0.02
  }
  return out
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v))
}

const GENERATORS: Record<ShapeName, (count: number, rand: () => number) => Float32Array> = {
  chaos,
  constellation,
  pipeline,
  wireframe,
  graph,
  path,
  lattice,
}

export function generateShape(name: ShapeName, count: number, seed = 1): Float32Array {
  return GENERATORS[name](count, mulberry32(seed * 7919 + name.length))
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npx vitest run components/webgl/__tests__/morph-targets.test.ts`
Expected: PASS（全テスト）

- [ ] **Step 5: コミット**

```bash
git add components/webgl/morph-targets.ts components/webgl/__tests__/morph-targets.test.ts
git commit -m "feat(webgl): 章別粒子形状ジェネレータを追加（決定的乱数・テスト付き）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: 物語状態と座標変換 story-state.ts / scroll-story.ts / world-mapping.ts（TDD）

**Files:**
- Create: `components/webgl/story-state.ts`
- Create: `components/webgl/scroll-story.ts`
- Create: `components/webgl/world-mapping.ts`
- Test: `components/webgl/__tests__/scroll-story.test.ts`
- Test: `components/webgl/__tests__/world-mapping.test.ts`

**Interfaces:**
- Consumes: なし
- Produces:
  - `storyState: { from: number; to: number; mix: number; intro: number; heroConverge: number; progress: number; mouseActive: number }`（可変シングルトン。Reactを介さず毎フレーム読み書き）
  - `runtimeTargets: { wordmark: Float32Array | null; terminal: Float32Array | null; version: number }`
  - `computeStory(y: number, anchors: number[]): { from: number; to: number; mix: number }`
  - `measureChapters(): number[]` — `[data-story-chapter]` 各要素の中心の絶対Y（章番号順）
  - `updateStoryFromScroll(scrollY: number, viewportH: number, docH: number, anchors: number[]): void`
  - `visiblePlaneSize(fovDeg: number, dist: number, aspect: number): { width: number; height: number }`
  - `pixelToWorld(px: number, py: number, vw: number, vh: number, plane: { width: number; height: number }): { x: number; y: number }`
  - `rectPerimeterPositions(rect: {x:number;y:number;width:number;height:number}, vw: number, vh: number, plane: {width:number;height:number}, count: number, seed?: number): Float32Array`

- [ ] **Step 1: 失敗するテストを書く**

`components/webgl/__tests__/scroll-story.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { computeStory } from "../scroll-story"

const anchors = [0, 1000, 2000, 3000]

describe("computeStory", () => {
  it("先頭より上では章0でmix 0", () => {
    expect(computeStory(-100, anchors)).toEqual({ from: 0, to: 1, mix: 0 })
    expect(computeStory(0, anchors)).toEqual({ from: 0, to: 1, mix: 0 })
  })
  it("アンカー中間で保持帯（前後30%）を除いた線形mix", () => {
    // t=0.5 → mix=(0.5-0.3)/0.4=0.5
    expect(computeStory(500, anchors).mix).toBeCloseTo(0.5)
    // t=0.2 → 保持帯なので0
    expect(computeStory(200, anchors).mix).toBe(0)
    // t=0.8 → 保持帯なので1
    expect(computeStory(800, anchors).mix).toBe(1)
  })
  it("2番目の区間はfrom=1,to=2", () => {
    const s = computeStory(1500, anchors)
    expect(s.from).toBe(1)
    expect(s.to).toBe(2)
    expect(s.mix).toBeCloseTo(0.5)
  })
  it("最終アンカー以降はmix 1で張り付く", () => {
    expect(computeStory(3500, anchors)).toEqual({ from: 2, to: 3, mix: 1 })
  })
  it("アンカーが1つ以下なら章0固定", () => {
    expect(computeStory(500, [0])).toEqual({ from: 0, to: 0, mix: 0 })
    expect(computeStory(500, [])).toEqual({ from: 0, to: 0, mix: 0 })
  })
})
```

`components/webgl/__tests__/world-mapping.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import {
  pixelToWorld,
  rectPerimeterPositions,
  visiblePlaneSize,
} from "../world-mapping"

describe("visiblePlaneSize", () => {
  it("fov50/dist9で高さ≈8.39", () => {
    const { height, width } = visiblePlaneSize(50, 9, 16 / 9)
    expect(height).toBeCloseTo(2 * 9 * Math.tan((25 * Math.PI) / 180), 5)
    expect(width).toBeCloseTo(height * (16 / 9), 5)
  })
})

describe("pixelToWorld", () => {
  const plane = { width: 14, height: 8 }
  it("画面中央は原点", () => {
    expect(pixelToWorld(500, 400, 1000, 800, plane)).toEqual({ x: 0, y: 0 })
  })
  it("左上は(-w/2, +h/2)", () => {
    expect(pixelToWorld(0, 0, 1000, 800, plane)).toEqual({ x: -7, y: 4 })
  })
  it("右下は(+w/2, -h/2)", () => {
    expect(pixelToWorld(1000, 800, 1000, 800, plane)).toEqual({ x: 7, y: -4 })
  })
})

describe("rectPerimeterPositions", () => {
  it("count*3を返し、全点が矩形のワールド境界内", () => {
    const plane = { width: 14, height: 8 }
    const rect = { x: 500, y: 200, width: 300, height: 200 }
    const p = rectPerimeterPositions(rect, 1000, 800, plane, 600)
    expect(p.length).toBe(1800)
    const tl = { x: (500 / 1000 - 0.5) * 14, y: (0.5 - 200 / 800) * 8 }
    const br = { x: (800 / 1000 - 0.5) * 14, y: (0.5 - 400 / 800) * 8 }
    for (let i = 0; i < p.length; i += 3) {
      expect(p[i]).toBeGreaterThanOrEqual(tl.x - 0.01)
      expect(p[i]).toBeLessThanOrEqual(br.x + 0.01)
      expect(p[i + 1]).toBeLessThanOrEqual(tl.y + 0.01)
      expect(p[i + 1]).toBeGreaterThanOrEqual(br.y - 0.01)
    }
  })
})
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npx vitest run components/webgl/__tests__/scroll-story.test.ts components/webgl/__tests__/world-mapping.test.ts`
Expected: FAIL（モジュールが存在しない）

- [ ] **Step 3: 実装**

`components/webgl/story-state.ts`:

```ts
/**
 * スクロール物語の共有状態。
 * DOM側（Lenis/GSAP/イントロ）が書き、WebGL側（useFrame）が毎フレーム読む。
 * Reactの再レンダリングを避けるため可変シングルトンにしている。
 */
export const storyState = {
  /** 現在章と次章のインデックス（0..6） */
  from: 0,
  to: 0,
  /** from→toの補間 0..1 */
  mix: 0,
  /** 0=ワードマーク表示中 → 1=通常（イントロ完了） */
  intro: 1,
  /** ヒーロー: 0=カオス → 1=ターミナル枠に収束 */
  heroConverge: 0,
  /** ページ全体のスクロール進捗 0..1 */
  progress: 0,
  /** マウス演出の強さ 0=非アクティブ, 1=アクティブ（タッチ端末は常時0） */
  mouseActive: 0,
}

/**
 * 実行時にDOM計測から生成する粒子目標（ワードマーク文字・ターミナル枠）。
 * versionの増加をparticle-fieldが検知してGPUバッファを更新する。
 */
export const runtimeTargets: {
  wordmark: Float32Array | null
  terminal: Float32Array | null
  version: number
} = {
  wordmark: null,
  terminal: null,
  version: 0,
}
```

`components/webgl/scroll-story.ts`:

```ts
import { storyState } from "./story-state"

const HOLD = 0.3 // 各章の前後30%は形状を保持し、中間40%でモーフする

/**
 * スクロール基準位置y（ビューポート中心の絶対Y）と章アンカー中心の配列から
 * (from, to, mix) を求める純関数。
 */
export function computeStory(
  y: number,
  anchors: number[]
): { from: number; to: number; mix: number } {
  if (anchors.length < 2) return { from: 0, to: 0, mix: 0 }
  const last = anchors.length - 1
  if (y <= anchors[0]) return { from: 0, to: 1, mix: 0 }
  if (y >= anchors[last]) return { from: last - 1, to: last, mix: 1 }
  let i = 0
  while (i < last - 1 && y >= anchors[i + 1]) i++
  const t = (y - anchors[i]) / (anchors[i + 1] - anchors[i])
  const mix = Math.min(1, Math.max(0, (t - HOLD) / (1 - HOLD * 2)))
  return { from: i, to: i + 1, mix }
}

/** [data-story-chapter] 要素の中心絶対Yを章番号順に返す（ブラウザ専用） */
export function measureChapters(): number[] {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-story-chapter]")
  )
  return els
    .map((el) => {
      const rect = el.getBoundingClientRect()
      return {
        n: Number(el.dataset.storyChapter ?? 0),
        center: rect.top + window.scrollY + rect.height / 2,
      }
    })
    .sort((a, b) => a.n - b.n)
    .map((e) => e.center)
}

/** スクロールイベントからstoryStateを更新する（ブラウザ専用） */
export function updateStoryFromScroll(
  scrollY: number,
  viewportH: number,
  docH: number,
  anchors: number[]
): void {
  const s = computeStory(scrollY + viewportH / 2, anchors)
  storyState.from = s.from
  storyState.to = s.to
  storyState.mix = s.mix
  const scrollable = Math.max(1, docH - viewportH)
  storyState.progress = Math.min(1, Math.max(0, scrollY / scrollable))
}
```

`components/webgl/world-mapping.ts`:

```ts
import { mulberry32 } from "./morph-targets"

type PlaneSize = { width: number; height: number }
type PixelRect = { x: number; y: number; width: number; height: number }

/** カメラfov(度)と距離から、z=0平面の可視サイズを求める */
export function visiblePlaneSize(
  fovDeg: number,
  dist: number,
  aspect: number
): PlaneSize {
  const height = 2 * dist * Math.tan((fovDeg * Math.PI) / 360)
  return { height, width: height * aspect }
}

/** ピクセル座標→z=0平面のワールド座標 */
export function pixelToWorld(
  px: number,
  py: number,
  vw: number,
  vh: number,
  plane: PlaneSize
): { x: number; y: number } {
  return {
    x: (px / vw - 0.5) * plane.width,
    y: (0.5 - py / vh) * plane.height,
  }
}

/**
 * DOM矩形（px）を粒子目標に変換する。
 * 70%を外周、14%をタイトルバー線、16%を内側の行に配る（ターミナル枠の見立て）。
 */
export function rectPerimeterPositions(
  rect: PixelRect,
  vw: number,
  vh: number,
  plane: PlaneSize,
  count: number,
  seed = 3
): Float32Array {
  const rand = mulberry32(seed)
  const tl = pixelToWorld(rect.x, rect.y, vw, vh, plane)
  const br = pixelToWorld(rect.x + rect.width, rect.y + rect.height, vw, vh, plane)
  const w = br.x - tl.x
  const h = tl.y - br.y
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = rand()
    let x: number, y: number
    if (r < 0.7) {
      const t = rand() * 4
      const side = Math.floor(t)
      const f = t - side
      if (side === 0) { x = tl.x + f * w; y = tl.y }
      else if (side === 1) { x = br.x; y = tl.y - f * h }
      else if (side === 2) { x = br.x - f * w; y = br.y }
      else { x = tl.x; y = br.y + f * h }
    } else if (r < 0.84) {
      x = tl.x + rand() * w
      y = tl.y - h * 0.12
    } else {
      x = tl.x + w * 0.08 + rand() * w * 0.84
      y = tl.y - h * (0.25 + Math.floor(rand() * 4) * 0.17)
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.1
  }
  return out
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS（Task 2のテスト含め全て）

- [ ] **Step 5: コミット**

```bash
git add components/webgl/story-state.ts components/webgl/scroll-story.ts components/webgl/world-mapping.ts components/webgl/__tests__/scroll-story.test.ts components/webgl/__tests__/world-mapping.test.ts
git commit -m "feat(webgl): スクロール物語の状態管理と座標変換を追加

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 品質プロファイル quality.ts（TDD）

**Files:**
- Create: `components/webgl/quality.ts`
- Test: `components/webgl/__tests__/quality.test.ts`

**Interfaces:**
- Consumes: なし
- Produces:
  - `type Quality = { tier: 'high'|'mid'|'low'; count: number; postfx: boolean; maxDpr: number }`
  - `resolveQuality(env: { coarsePointer: boolean; deviceMemory?: number }): Quality`
  - `degrade(q: Quality): Quality` — 1段階劣化（lowで底打ち）
  - `detectEnv(): { coarsePointer: boolean; deviceMemory?: number }`（ブラウザ専用）

- [ ] **Step 1: 失敗するテストを書く**

`components/webgl/__tests__/quality.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { degrade, resolveQuality } from "../quality"

describe("resolveQuality", () => {
  it("デスクトップ既定はhigh 24000/postfx有効", () => {
    expect(resolveQuality({ coarsePointer: false })).toEqual({
      tier: "high", count: 24000, postfx: true, maxDpr: 1.75,
    })
  })
  it("タッチ端末はlow 4500/postfx無効", () => {
    expect(resolveQuality({ coarsePointer: true })).toEqual({
      tier: "low", count: 4500, postfx: false, maxDpr: 1.5,
    })
  })
  it("メモリ4GB以下のデスクトップはmid", () => {
    expect(resolveQuality({ coarsePointer: false, deviceMemory: 4 }).tier).toBe("mid")
  })
})

describe("degrade", () => {
  it("high→mid→low→low", () => {
    const high = resolveQuality({ coarsePointer: false })
    const mid = degrade(high)
    expect(mid.tier).toBe("mid")
    expect(mid.count).toBe(12000)
    expect(mid.postfx).toBe(false)
    const low = degrade(mid)
    expect(low.tier).toBe("low")
    expect(degrade(low)).toEqual(low)
  })
})
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npx vitest run components/webgl/__tests__/quality.test.ts`
Expected: FAIL

- [ ] **Step 3: 実装**

`components/webgl/quality.ts`:

```ts
/** デバイス性能に応じた描画品質プロファイル */
export type Quality = {
  tier: "high" | "mid" | "low"
  count: number
  postfx: boolean
  maxDpr: number
}

const TIERS: Record<Quality["tier"], Quality> = {
  high: { tier: "high", count: 24000, postfx: true, maxDpr: 1.75 },
  mid: { tier: "mid", count: 12000, postfx: false, maxDpr: 1.5 },
  low: { tier: "low", count: 4500, postfx: false, maxDpr: 1.5 },
}

export function resolveQuality(env: {
  coarsePointer: boolean
  deviceMemory?: number
}): Quality {
  if (env.coarsePointer) return TIERS.low
  if (env.deviceMemory !== undefined && env.deviceMemory <= 4) return TIERS.mid
  return TIERS.high
}

/** FPS低下時に1段階劣化させる（lowで底打ち） */
export function degrade(q: Quality): Quality {
  if (q.tier === "high") return TIERS.mid
  return TIERS.low
}

/** ブラウザ環境の検出（SSRでは呼ばない） */
export function detectEnv(): { coarsePointer: boolean; deviceMemory?: number } {
  return {
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    deviceMemory: (navigator as { deviceMemory?: number }).deviceMemory,
  }
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS（全テスト）

- [ ] **Step 5: コミット**

```bash
git add components/webgl/quality.ts components/webgl/__tests__/quality.test.ts
git commit -m "feat(webgl): デバイス品質プロファイルとFPS劣化ロジックを追加

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: シェーダーと粒子フィールド shaders.ts / particle-field.tsx

**Files:**
- Create: `components/webgl/shaders.ts`
- Create: `components/webgl/particle-field.tsx`

**Interfaces:**
- Consumes: `generateShape` / `CHAPTER_SHAPES` / `mulberry32`（Task 2）、`storyState` / `runtimeTargets`（Task 3）
- Produces:
  - `particleVertexShader: string` / `particleFragmentShader: string`
  - `<ParticleField count={number} />` — R3F Canvas内で使うコンポーネント
  - uniform名（scene側からは触らない・内部完結）: `uTime uFrom uTo uMix uIntro uHeroConverge uMouse uMouseActive uPixelRatio uSize uColorA uColorB`
  - attribute名: `position`(=chaos) `aConstellation aPipeline aWireframe aGraph aPath aLattice aTerminal aWordmark aRandom`

視覚コンポーネントのためユニットテスト対象外。ゲートは `npm run build` 通過（描画確認はTask 7）。

- [ ] **Step 1: shaders.ts を実装**

`components/webgl/shaders.ts`:

```ts
/**
 * 粒子システムのGLSL。
 * 頂点: 章別目標座標のif-chain選択 → stagger付きmix → simplexノイズゆらぎ → マウス斥力
 * フラグメント: ソフト円スプライト＋コア発光（加算合成前提）
 */

// Ashima Arts の 3D simplex noise（MITライセンスの定番実装）
const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

export const particleVertexShader = /* glsl */ `
attribute vec3 aConstellation;
attribute vec3 aPipeline;
attribute vec3 aWireframe;
attribute vec3 aGraph;
attribute vec3 aPath;
attribute vec3 aLattice;
attribute vec3 aTerminal;
attribute vec3 aWordmark;
attribute float aRandom;

uniform float uTime;
uniform int uFrom;
uniform int uTo;
uniform float uMix;
uniform float uIntro;
uniform float uHeroConverge;
uniform vec3 uMouse;
uniform float uMouseActive;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vAlpha;
varying vec3 vColor;

${simplexNoise}

vec3 chapterPos(int idx) {
  // 章0はカオス(position)とターミナル枠の合成（ヒーロー収束演出）
  if (idx == 0) return mix(position, aTerminal, uHeroConverge);
  if (idx == 1) return aConstellation;
  if (idx == 2) return aPipeline;
  if (idx == 3) return aWireframe;
  if (idx == 4) return aGraph;
  if (idx == 5) return aPath;
  return aLattice;
}

float noiseAmpFor(int idx) {
  if (idx == 0) return mix(1.0, 0.12, uHeroConverge); // 収束中はゆらぎを絞る
  if (idx == 1) return 0.35;
  if (idx == 2) return 0.5;
  if (idx == 3) return 0.22;
  if (idx == 4) return 0.2;
  if (idx == 5) return 0.3;
  return 0.1;
}

void main() {
  // 粒子ごとに開始をずらした有機的なモーフ
  float stag = clamp(uMix * 1.3 - aRandom * 0.3, 0.0, 1.0);
  float m = smoothstep(0.0, 1.0, stag);
  vec3 base = mix(chapterPos(uFrom), chapterPos(uTo), m);

  // イントロ: ワードマーク → 物語へ
  base = mix(aWordmark, base, smoothstep(0.0, 1.0, uIntro));

  float amp = mix(noiseAmpFor(uFrom), noiseAmpFor(uTo), m);
  vec3 noisePos = base * 0.35 + uTime * 0.06;
  vec3 wobble = vec3(
    snoise(noisePos),
    snoise(noisePos + vec3(31.4, 0.0, 0.0)),
    snoise(noisePos + vec3(0.0, 47.2, 0.0))
  ) * amp;
  vec3 pos = base + wobble;

  // マウス斥力
  vec3 diff = pos - uMouse;
  float dist = length(diff);
  float push = smoothstep(2.2, 0.0, dist) * 0.9 * uMouseActive;
  pos += (diff / max(dist, 0.0001)) * push;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.6 + aRandom * 0.8);
  gl_PointSize = size * uPixelRatio * (14.0 / -mv.z);

  // 奥行きで減衰（被写界深度風）
  float depth = clamp((-mv.z - 4.0) / 14.0, 0.0, 1.0);
  vAlpha = mix(0.9, 0.22, depth);
  float hue = clamp(base.x * 0.12 + 0.5 + (aRandom - 0.5) * 0.3, 0.0, 1.0);
  vColor = mix(uColorA, uColorB, hue);
}
`

export const particleFragmentShader = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float mask = smoothstep(0.5, 0.12, d);
  float core = smoothstep(0.18, 0.0, d) * 0.85;
  vec3 col = vColor * (0.7 + core);
  gl_FragColor = vec4(col, (mask * 0.55 + core) * vAlpha);
}
`
```

- [ ] **Step 2: particle-field.tsx を実装**

`components/webgl/particle-field.tsx`:

```tsx
"use client"

import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { CHAPTER_SHAPES, generateShape, mulberry32 } from "./morph-targets"
import { runtimeTargets, storyState } from "./story-state"
import { particleFragmentShader, particleVertexShader } from "./shaders"

const COLOR_A = new THREE.Color("#38bdf8") // sky-400
const COLOR_B = new THREE.Color("#8b5cf6") // violet-500

/**
 * 粒子システム本体。章別目標座標をattributeに焼き、
 * 毎フレームstoryStateをuniformへ流し込むだけ（CPU負荷は一定）。
 */
export function ParticleField({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const appliedVersion = useRef(-1)
  const mouse = useRef({ x: 0, y: 0 })

  const attributes = useMemo(() => {
    const chaos = generateShape("chaos", count)
    const rand = mulberry32(99)
    const randoms = new Float32Array(count)
    for (let i = 0; i < count; i++) randoms[i] = rand()
    return {
      chaos,
      constellation: generateShape("constellation", count),
      pipeline: generateShape("pipeline", count),
      wireframe: generateShape("wireframe", count),
      graph: generateShape("graph", count),
      path: generateShape("path", count),
      lattice: generateShape("lattice", count),
      // 実行時計測前はカオスのコピー（＝収束しても違和感なし）
      terminal: chaos.slice(),
      wordmark: chaos.slice(),
      randoms,
    }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uMix: { value: 0 },
      uIntro: { value: 1 },
      uHeroConverge: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uMouseActive: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 40 },
      uColorA: { value: COLOR_A },
      uColorB: { value: COLOR_B },
    }),
    []
  )

  // 実行時目標（ワードマーク/ターミナル枠）の反映
  const applyRuntimeTargets = () => {
    const geo = geometryRef.current
    if (!geo || appliedVersion.current === runtimeTargets.version) return
    appliedVersion.current = runtimeTargets.version
    for (const [name, data] of [
      ["aWordmark", runtimeTargets.wordmark],
      ["aTerminal", runtimeTargets.terminal],
    ] as const) {
      if (!data) continue
      const attr = geo.getAttribute(name) as THREE.BufferAttribute
      // 粒子数と長さが違う場合は繰り返しで埋める
      const arr = attr.array as Float32Array
      for (let i = 0; i < arr.length; i++) arr[i] = data[i % data.length]
      attr.needsUpdate = true
    }
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return
    applyRuntimeTargets()
    const u = mat.uniforms
    u.uTime.value += delta
    u.uFrom.value = storyState.from
    u.uTo.value = storyState.to
    u.uMix.value = storyState.mix
    u.uIntro.value = storyState.intro
    u.uHeroConverge.value = storyState.heroConverge
    u.uPixelRatio.value = state.gl.getPixelRatio()
    // マウスをワールド座標へ（z=0平面）＋ダンピング
    const { width, height } = state.viewport
    const wx = (mouse.current.x / state.size.width - 0.5) * width
    const wy = (0.5 - mouse.current.y / state.size.height) * height
    const v = u.uMouse.value as THREE.Vector3
    v.x += (wx - v.x) * Math.min(1, delta * 6)
    v.y += (wy - v.y) * Math.min(1, delta * 6)
    u.uMouseActive.value +=
      (storyState.mouseActive - u.uMouseActive.value) * Math.min(1, delta * 4)
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[attributes.chaos, 3]} />
        <bufferAttribute attach="attributes-aConstellation" args={[attributes.constellation, 3]} />
        <bufferAttribute attach="attributes-aPipeline" args={[attributes.pipeline, 3]} />
        <bufferAttribute attach="attributes-aWireframe" args={[attributes.wireframe, 3]} />
        <bufferAttribute attach="attributes-aGraph" args={[attributes.graph, 3]} />
        <bufferAttribute attach="attributes-aPath" args={[attributes.path, 3]} />
        <bufferAttribute attach="attributes-aLattice" args={[attributes.lattice, 3]} />
        <bufferAttribute attach="attributes-aTerminal" args={[attributes.terminal, 3]} />
        <bufferAttribute attach="attributes-aWordmark" args={[attributes.wordmark, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[attributes.randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

注意: `CHAPTER_SHAPES` はここでは直接使わないが、章⇔attributeの対応はこの配列の順序（chaos→…→lattice）と一致させてある。ズレたら`chapterPos()`のif-chainを直すこと。

- [ ] **Step 3: ビルド検証**

Run: `npm run build`
Expected: 成功（未使用importの lint warning が出たら削除）

- [ ] **Step 4: コミット**

```bash
git status
git add components/webgl/shaders.ts components/webgl/particle-field.tsx
git commit -m "feat(webgl): 粒子モーフィングのGLSLとParticleFieldを実装

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: シーンとローダー scene.tsx / stage-loader.tsx

**Files:**
- Create: `components/webgl/scene.tsx`
- Create: `components/webgl/stage-loader.tsx`

**Interfaces:**
- Consumes: `ParticleField`（Task 5）、`resolveQuality`/`degrade`/`detectEnv`（Task 4）、`storyState`/`measureChapters`/`updateStoryFromScroll`（Task 3）、既存 `GridBackground`/`Glow`
- Produces:
  - `<WebglScene />`（default export、dynamic import用）— Canvas＋ポストプロセス＋FPS監視＋スクロール購読
  - `<StageLoader />` — ページに置く唯一の入口。フォールバック背景を含む

- [ ] **Step 1: scene.tsx を実装**

`components/webgl/scene.tsx`:

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing"
import { degrade, detectEnv, resolveQuality, type Quality } from "./quality"
import { measureChapters, updateStoryFromScroll } from "./scroll-story"
import { storyState } from "./story-state"
import { ParticleField } from "./particle-field"

/** FPSを監視し45を2秒下回ったら品質を1段階落とす */
function FpsWatchdog({ onDegrade }: { onDegrade: () => void }) {
  const acc = useRef({ time: 0, frames: 0 })
  useFrame((_, delta) => {
    acc.current.time += delta
    acc.current.frames += 1
    if (acc.current.time >= 2) {
      const fps = acc.current.frames / acc.current.time
      acc.current.time = 0
      acc.current.frames = 0
      if (fps < 45) onDegrade()
    }
  })
  return null
}

/** 章切替の瞬間だけ色収差を効かせる */
function TransitionAberration() {
  const ref = useRef<{ offset: THREE.Vector2 } | null>(null)
  useFrame(() => {
    if (!ref.current) return
    const energy = 4 * storyState.mix * (1 - storyState.mix) // mix=0.5で最大
    const amount = energy * 0.0018
    ref.current.offset.set(amount, amount * 0.6)
  })
  return (
    <ChromaticAberration
      ref={ref as never}
      offset={new THREE.Vector2(0, 0)}
    />
  )
}

/**
 * WebGLシーン本体。スクロール購読・品質管理もここが持つ。
 * StageLoaderからdynamic importされる（default export）。
 */
export default function WebglScene() {
  const [quality, setQuality] = useState<Quality>(() => resolveQuality(detectEnv()))

  // スクロール→storyState更新（Lenis導入後もwindowスクロールイベントは発火する）
  useEffect(() => {
    let anchors = measureChapters()
    const update = () => {
      updateStoryFromScroll(
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
        anchors
      )
    }
    const remeasure = () => {
      anchors = measureChapters()
      update()
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", remeasure)
    // フォント読込等でレイアウトが動くため少し遅れて再計測
    const t = setTimeout(remeasure, 1200)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", remeasure)
      clearTimeout(t)
    }
  }, [])

  // マウスアクティブ（タッチ端末は常に0）
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const on = () => { storyState.mouseActive = 1 }
    const off = () => { storyState.mouseActive = 0 }
    window.addEventListener("pointermove", on, { passive: true })
    document.documentElement.addEventListener("mouseleave", off)
    return () => {
      window.removeEventListener("pointermove", on)
      document.documentElement.removeEventListener("mouseleave", off)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ fov: 50, position: [0, 0, 9], near: 0.1, far: 60 }}
        dpr={[1, quality.maxDpr]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <ParticleField key={quality.count} count={quality.count} />
        {quality.tier !== "low" && (
          <FpsWatchdog onDegrade={() => setQuality((q) => degrade(q))} />
        )}
        {quality.postfx && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <TransitionAberration />
            <Vignette eskil={false} offset={0.18} darkness={0.78} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: stage-loader.tsx を実装**

`components/webgl/stage-loader.tsx`:

```tsx
"use client"

import dynamic from "next/dynamic"
import { Component, useEffect, useState, type ReactNode } from "react"
import { GridBackground, Glow } from "@/components/corporate/backgrounds"
import { storyState } from "./story-state"

const WebglScene = dynamic(() => import("./scene"), { ssr: false })

/** WebGL不可・エラー・reduced-motion時の静的背景（現行デザインを踏襲） */
function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <GridBackground fade />
      <Glow className="-top-24 left-1/4 h-96 w-96" />
      <Glow className="-bottom-24 right-0 h-80 w-80 bg-violet-500/10" />
    </div>
  )
}

class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** intro-overlay等からも参照するためexport */
export function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    )
  } catch {
    return false
  }
}

/**
 * トップページ用WebGLステージの入口。
 * SSRでは何も描かず、クライアントで環境判定してからシーンを遅延マウントする。
 */
export function StageLoader() {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending")

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !webglSupported()) {
      // イントロ・収束演出も無効化しておく（粒子が存在しないため）
      storyState.intro = 1
      storyState.heroConverge = 1
      setMode("static")
      return
    }
    setMode("webgl")
  }, [])

  if (mode === "pending") return <StaticBackdrop />
  if (mode === "static") return <StaticBackdrop />
  return (
    <SceneErrorBoundary fallback={<StaticBackdrop />}>
      <WebglScene />
    </SceneErrorBoundary>
  )
}
```

- [ ] **Step 3: ビルド検証**

Run: `npm run build && npm test`
Expected: どちらも成功

- [ ] **Step 4: コミット**

```bash
git status
git add components/webgl/scene.tsx components/webgl/stage-loader.tsx
git commit -m "feat(webgl): Canvasシーン・品質劣化・フォールバックを実装

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: ページ統合 — Section透過・章ラベル・page.tsx

**Files:**
- Modify: `components/corporate/section.tsx`
- Modify: `components/corporate/service-page.tsx:196-205`（StepFlowのみ）
- Modify: `components/home/services.tsx:48-53`
- Modify: `components/home/how-we-build.tsx:47`
- Modify: `components/home/products.tsx:52-57`
- Modify: `components/home/track-record.tsx:82`
- Modify: `components/home/process.tsx:30-37`
- Modify: `components/home/faq.tsx:53`
- Modify: `components/home/contact.tsx:98-123`（`variant`のみ）
- Modify: `components/home/tech-marquee.tsx:30`
- Modify: `components/home/hero.tsx`（背景剥がしのみ。全面刷新はTask 9）
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `StageLoader`（Task 6）
- Produces:
  - `Section` の `variant` に `"transparent"` 追加＋ `chapter?: string` prop（章ラベル表示）
  - `StepFlow` に `variant?: "default" | "alt" | "transparent"`（default `"alt"`＝下層ページ挙動不変）と `chapter?: string` を追加
  - `[data-story-chapter="0".."6"]` がDOMに存在（Task 3の`measureChapters`が読む）

- [ ] **Step 1: Section に transparent variant と chapter prop を追加**

`components/corporate/section.tsx` の `SectionProps` と `Section` を以下に置き換え（`SectionHeading`は変更しない）:

```tsx
import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  /**
   * default = bg-[#030712] / alt = bg-[#070b14]（交互セクション用）
   * transparent = 背景なし（トップページのWebGLキャンバスを透かす）
   */
  variant?: "default" | "alt" | "transparent"
  className?: string
  /** セクション全幅に重ねる装飾（GridBackground / Glow 等の絶対配置要素） */
  decoration?: ReactNode
  /** 章ラベル（例: "01 設計"）。トップページのスクロール物語用 */
  chapter?: string
  children: ReactNode
}

const VARIANT_BG: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-[#030712]",
  alt: "bg-[#070b14]",
  transparent: "",
}

/**
 * ダークセクションの共通ラッパー。
 * py-24 md:py-32 + container + max-w-6xl をまとめて提供する。
 */
export function Section({
  id,
  variant = "default",
  className = "",
  decoration,
  chapter,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-32 ${VARIANT_BG[variant]} ${className}`}
    >
      {decoration}
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {chapter ? (
            <div className="mb-10 flex items-center gap-4 md:mb-14">
              <p className="font-mono text-xs tracking-[0.3em] text-sky-400/80">
                / {chapter}
              </p>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent"
              />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: StepFlow に variant / chapter を追加**

`components/corporate/service-page.tsx` の `StepFlowProps` 型に2フィールド追加し、`StepFlow` の `<Section variant="alt">` を propsで差し替える:

```tsx
// StepFlowProps に追加:
  /** セクション背景。トップページでは "transparent" を渡す */
  variant?: "default" | "alt" | "transparent"
  /** 章ラベル（トップページ用） */
  chapter?: string

// StepFlow のシグネチャと Section 呼び出しを変更:
export function StepFlow({
  label,
  title,
  lead,
  steps,
  variant = "alt",
  chapter,
}: StepFlowProps) {
  // ...既存実装のまま...
  return (
    <Section variant={variant} chapter={chapter}>
```

既存の呼び出し（サービス詳細ページ）は無指定なので挙動不変。

- [ ] **Step 3: 各homeセクションを透過＋章ラベルに切り替え**

テキスト・構造は一切変えず、`<Section`／`<StepFlow` の開きタグだけ変更する:

- `services.tsx`: `variant="alt"` → `variant="transparent" chapter="01 設計"`
- `how-we-build.tsx`: `<Section decoration={...}>` → `<Section variant="transparent" chapter="02 実装" decoration={...}>`
- `products.tsx`: `variant="alt"` → `variant="transparent" chapter="03 成果物"`
- `track-record.tsx`: `<Section id="works" className="scroll-mt-16">` → `<Section id="works" variant="transparent" chapter="04 実績" className="scroll-mt-16">`
- `process.tsx`: `<StepFlow` に `variant="transparent" chapter="05 進め方"` を追加
- `faq.tsx`: `<Section id="faq" className="scroll-mt-16">` → `<Section id="faq" variant="transparent" chapter="06 次はあなた" className="scroll-mt-16">`
- `contact.tsx`: 2箇所の `variant="alt"` → `variant="transparent"`（chapterは付けない。FAQと同章のため）
- `tech-marquee.tsx`: `className="border-y border-white/5 bg-[#030712] py-10"` → `className="border-y border-white/5 py-10"`

- [ ] **Step 4: hero.tsx の不透明背景を剥がす（暫定）**

`components/home/hero.tsx`:
- import から `GridBackground, Glow` を削除
- `<section className="relative overflow-hidden bg-[#030712] pb-20 pt-32 ...">` → `bg-[#030712]` を削除
- `<GridBackground fade />` と `<Glow ... />` 2行を削除

- [ ] **Step 5: page.tsx を統合レイアウトに変更**

`app/page.tsx` のimportに追加:

```tsx
import { StageLoader } from "@/components/webgl/stage-loader"
```

`Home` の return を以下に置き換え（メタデータは触らない）:

```tsx
  return (
    <div className="bg-[#030712] text-white">
      <StageLoader />
      <SiteHeader />
      <main className="relative z-10">
        <div data-story-chapter="0">
          <Hero />
        </div>
        <TechMarquee />
        <div data-story-chapter="1">
          <Services />
        </div>
        <div data-story-chapter="2">
          <HowWeBuild />
        </div>
        <div data-story-chapter="3">
          <Products />
        </div>
        <div data-story-chapter="4">
          <TrackRecord />
        </div>
        <div data-story-chapter="5">
          <Process />
        </div>
        <div data-story-chapter="6">
          <Faq />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
```

- [ ] **Step 6: ビルド＋ブラウザ検証**

```bash
npm run build && npm test
npm run dev
```

ブラウザで http://localhost:3000 を確認:
1. 全画面に粒子が漂い、マウスで避ける
2. スクロールすると 星座→パイプライン→ワイヤーフレーム→グラフ→道→格子 へモーフする
3. 各セクションに `/ 01 設計` 等の章ラベルが出る
4. DevToolsで `prefers-reduced-motion: reduce` をエミュレート→リロードで静的背景（グリッド＋グロー）になる
5. 下層ページ regression: http://localhost:3000/services/ai の背景・表示が従来通り

- [ ] **Step 7: コミット**

```bash
git status
git add app/page.tsx components/corporate/section.tsx components/corporate/service-page.tsx components/home/
git commit -m "feat(top): WebGLステージを統合、セクション透過と章ラベルを追加

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Lenis慣性スクロールと進捗バー

**Files:**
- Create: `components/webgl/smooth-scroll.tsx`
- Create: `components/webgl/scroll-progress.tsx`
- Modify: `app/globals.css`（末尾に追記）
- Modify: `app/page.tsx`（マウント2行）

**Interfaces:**
- Consumes: なし（独立）
- Produces: `<SmoothScroll />`（null描画・副作用のみ）、`<ScrollProgress />`

- [ ] **Step 1: smooth-scroll.tsx を実装**

```tsx
"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * Lenis慣性スクロール＋GSAP ScrollTrigger同期。
 * prefers-reduced-motion時は何もしない（ネイティブスクロールのまま）。
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
```

- [ ] **Step 2: scroll-progress.tsx を実装**

```tsx
"use client"

import { useEffect, useRef } from "react"

/** 画面上端のスクロール進捗バー（storyStateに依存せず単独で動く） */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const doc = document.documentElement
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable))
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
```

- [ ] **Step 3: globals.css 末尾にLenis推奨CSSを追記**

```css
/* === Lenis smooth scroll === */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
```

- [ ] **Step 4: page.tsx にマウント**

`app/page.tsx` のimportに追加:

```tsx
import { SmoothScroll } from "@/components/webgl/smooth-scroll"
import { ScrollProgress } from "@/components/webgl/scroll-progress"
```

`<StageLoader />` の直後に:

```tsx
      <SmoothScroll />
      <ScrollProgress />
```

- [ ] **Step 5: 検証**

```bash
npm run build && npm run dev
```

1. スクロールに慣性がつき、粒子モーフが滑らかに追従する
2. ヘッダーの「サービス」等のアンカーリンクがスムーズに着地する（`anchors: true`）
3. 進捗バーが上端で伸びる
4. reduced-motionエミュレート時はネイティブスクロールのまま

- [ ] **Step 6: コミット**

```bash
git status
git add components/webgl/smooth-scroll.tsx components/webgl/scroll-progress.tsx app/globals.css app/page.tsx
git commit -m "feat(top): Lenis慣性スクロールとスクロール進捗バーを追加

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: ヒーロー刷新・イントロ・ターミナル収束

**Files:**
- Create: `components/webgl/runtime-targets.ts`
- Create: `components/webgl/intro-overlay.tsx`
- Modify: `components/home/hero.tsx`（全面書き換え。テキストは不変）
- Modify: `app/globals.css`（末尾に追記）
- Modify: `app/page.tsx`（マウント1行）

**Interfaces:**
- Consumes: `visiblePlaneSize`/`rectPerimeterPositions`（Task 3）、`runtimeTargets`/`storyState`（Task 3）、`mulberry32`（Task 2）
- Produces:
  - `applyWordmarkTarget(): void` — 「miitaso」文字を粒子座標化して`runtimeTargets.wordmark`へ
  - `applyTerminalTarget(): void` — `[data-terminal-anchor]`のDOM矩形を粒子座標化して`runtimeTargets.terminal`へ
  - `<IntroOverlay />` — sessionStorage `miitaso-intro-seen` 制御のイントロ＋収束タイムライン
  - hero DOM: `data-terminal-anchor` 属性、`corp-mask-line` によるコピー出現

- [ ] **Step 1: runtime-targets.ts を実装**

```ts
import { mulberry32 } from "./morph-targets"
import { runtimeTargets } from "./story-state"
import { rectPerimeterPositions, visiblePlaneSize } from "./world-mapping"

const CAMERA_FOV = 50
const CAMERA_DIST = 9

/**
 * 「miitaso」の文字形状を2Dキャンバスにラスタライズして粒子座標に変換する。
 * ブラウザ専用（イントロ演出でのみ呼ばれる）。
 */
export function applyWordmarkTarget(count = 4000): void {
  const canvas = document.createElement("canvas")
  canvas.width = 600
  canvas.height = 160
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.font = "700 120px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#fff"
  ctx.fillText("miitaso", 300, 80)
  const img = ctx.getImageData(0, 0, 600, 160).data
  const pts: number[] = []
  for (let y = 0; y < 160; y += 2) {
    for (let x = 0; x < 600; x += 2) {
      if (img[(y * 600 + x) * 4 + 3] > 128) pts.push(x, y)
    }
  }
  if (pts.length < 20) return // ラスタライズ失敗時はワードマークなしで進む
  const out = new Float32Array(count * 3)
  const rand = mulberry32(11)
  const scale = 9 / 600 // 600px幅 → ワールド9ユニット幅
  for (let i = 0; i < count; i++) {
    const k = Math.floor(rand() * (pts.length / 2)) * 2
    out[i * 3] = (pts[k] - 300) * scale
    out[i * 3 + 1] = (80 - pts[k + 1]) * scale
    out[i * 3 + 2] = (rand() * 2 - 1) * 0.15
  }
  runtimeTargets.wordmark = out
  runtimeTargets.version += 1
}

/**
 * ヒーローのターミナルwindowのDOM矩形を粒子の収束目標に変換する。
 * ヒーローはページ先頭にあるため、絶対座標（rect + scrollY）を
 * 「スクロール0のビューポート座標」として扱える。
 */
export function applyTerminalTarget(count = 6000): void {
  const el = document.querySelector("[data-terminal-anchor]")
  if (!el) return
  const rect = el.getBoundingClientRect()
  const plane = visiblePlaneSize(
    CAMERA_FOV,
    CAMERA_DIST,
    window.innerWidth / window.innerHeight
  )
  runtimeTargets.terminal = rectPerimeterPositions(
    {
      x: rect.left,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    },
    window.innerWidth,
    window.innerHeight,
    plane,
    count
  )
  runtimeTargets.version += 1
}
```

- [ ] **Step 2: intro-overlay.tsx を実装**

イントロ中はDOMコンテンツを`body`クラスで隠し、粒子ワードマーク（canvas, z-0）だけを見せる。オーバーレイ要素は使わない（キャンバスまで隠れてしまうため）。

```tsx
"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { storyState } from "./story-state"
import { applyTerminalTarget, applyWordmarkTarget } from "./runtime-targets"
import { webglSupported } from "./stage-loader"

const SEEN_KEY = "miitaso-intro-seen"

/**
 * 初回訪問イントロ（合計1.5秒）: 粒子ワードマーク保持0.7s → 散開0.8s。
 * 完了後にターミナル収束（heroConverge 0→1）を発火する。
 * 2回目以降・reduced-motion・WebGL不可時は即スキップ。
 */
export function IntroOverlay() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen = sessionStorage.getItem(SEEN_KEY) === "1"

    const converge = () => {
      applyTerminalTarget()
      gsap.to(storyState, {
        heroConverge: 1,
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0.4,
      })
    }
    const onResize = () => applyTerminalTarget()
    window.addEventListener("resize", onResize)

    // WebGL不可時にイントロを走らせるとコンテンツを隠したまま
    // ワードマークが出ない（粒子が存在しない）ため、必ずスキップする。
    if (reduced || seen || !webglSupported()) {
      storyState.intro = 1
      converge()
      return () => window.removeEventListener("resize", onResize)
    }

    storyState.intro = 0
    applyWordmarkTarget()
    document.body.classList.add("intro-active")
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1")
        document.body.classList.remove("intro-active")
        document.body.classList.add("intro-done")
        converge()
      },
    })
    tl.to(storyState, { intro: 1, duration: 0.8, ease: "power2.inOut" }, 0.7)
    return () => {
      tl.kill()
      document.body.classList.remove("intro-active")
      window.removeEventListener("resize", onResize)
    }
  }, [])
  return null
}
```

- [ ] **Step 3: hero.tsx を全面書き換え**

テキスト（コピー・リード・CTAラベル・ターミナル行・注釈）は現行のまま。構造のみ変更:

```tsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Terminal, type TerminalLine } from "@/components/corporate/terminal"

const terminalLines: TerminalLine[] = [
  { prompt: "$", text: 'LINE: "research 食品ECに参入したい"', done: true },
  { text: "✓ webhook verified", instant: true, className: "text-emerald-400" },
  {
    text: "⠿ Claude agent: 市場規模・競合・参入障壁を調査中…",
    instant: true,
    className: "text-slate-500",
  },
  { text: "✓ レポート生成完了（数分）", instant: true, className: "text-emerald-400" },
  { text: "✓ 公開 → miitaso.com/research/****", instant: true, className: "text-sky-400" },
]

/**
 * トップページのヒーロー。背景はWebGL粒子（stage-loader）が担う。
 * コピーはマスクリビール、ターミナルは粒子収束の着地点（data-terminal-anchor）。
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pt-36">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* コピー */}
          <div>
            <span className="corp-mask-line">
              <span
                className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400"
                style={{ "--mask-delay": "150ms" } as React.CSSProperties}
              >
                CONSULTING × ENGINEERING
              </span>
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="corp-mask-line">
                <span style={{ "--mask-delay": "350ms" } as React.CSSProperties}>
                  考えるだけでも、
                </span>
              </span>
              <span className="corp-mask-line">
                <span
                  className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
                  style={{ "--mask-delay": "550ms" } as React.CSSProperties}
                >
                  作るだけでもない。
                </span>
              </span>
            </h1>
            <p
              className="corp-fade-in-up mt-6 max-w-xl leading-relaxed text-slate-400"
              style={{ animationDelay: "800ms" }}
            >
              提案書で終わるコンサルと、言われた通りに作る開発会社。その間を埋めるのが私たちです。経営課題の定義から、システムの実装・運用まで、エンジニア出身のコンサルタントが一貫して成果に伴走します。
            </p>
            <div
              className="corp-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "1000ms" }}
            >
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200"
              >
                無料相談する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-white transition hover:bg-white/10"
              >
                サービスを見る
              </Link>
            </div>
          </div>

          {/* research bot の実フロー再現ターミナル（粒子収束の着地点） */}
          <div
            className="corp-fade-in"
            style={{ animationDelay: "1600ms" }}
            data-terminal-anchor
          >
            <Terminal title="miitaso — research bot" lines={terminalLines} />
            <p className="mt-3 text-center text-xs text-slate-500">
              口だけにしない証拠に——自社で本番運用しているAIエージェント「research」の実際の処理フロー
            </p>
          </div>
        </div>
      </div>

      {/* スクロールキュー */}
      <div
        aria-hidden
        className="corp-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        style={{ animationDelay: "2200ms" }}
      >
        <p className="font-mono text-[10px] tracking-[0.35em] text-slate-500">SCROLL</p>
        <span className="corp-scroll-cue mx-auto mt-2 block h-8 w-px bg-gradient-to-b from-sky-400/80 to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: globals.css 末尾に追記**

```css
/* === トップページ演出 === */

/* コピーのライン単位マスクリビール */
@keyframes corp-mask-up {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}
.corp-mask-line {
  display: block;
  overflow: hidden;
}
.corp-mask-line > span {
  display: block;
  transform: translateY(110%);
  animation: corp-mask-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--mask-delay, 0ms);
}

/* イントロ中はDOMコンテンツを隠し、粒子ワードマークだけ見せる */
body.intro-active main,
body.intro-active header,
body.intro-active footer {
  opacity: 0;
}
body.intro-done main,
body.intro-done header,
body.intro-done footer {
  animation: corp-fade-in 0.8s ease-out both;
}

/* スクロールキューの明滅 */
@keyframes corp-cue {
  0%, 100% {
    opacity: 0.25;
    transform: scaleY(0.6);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}
.corp-scroll-cue {
  transform-origin: top;
  animation: corp-cue 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .corp-mask-line > span {
    transform: none;
    animation: none;
  }
  body.intro-active main,
  body.intro-active header,
  body.intro-active footer {
    opacity: 1;
  }
}
```

- [ ] **Step 5: page.tsx にマウント**

importに追加:

```tsx
import { IntroOverlay } from "@/components/webgl/intro-overlay"
```

`<ScrollProgress />` の直後に `<IntroOverlay />` を追加。

- [ ] **Step 6: 検証**

```bash
npm run build && npm run dev
```

1. シークレットウィンドウで初回アクセス→粒子が「miitaso」を形作り0.7秒保持→散開してカオスへ、コンテンツがフェードイン（計1.5秒）
2. その後、粒子の一部がターミナルウィンドウの枠へ収束する
3. リロード→イントロはスキップされるが収束演出は毎回動く
4. コピーが1行ずつ下からマスクリビールされる
5. reduced-motionエミュレート→イントロなし・コピー即表示

- [ ] **Step 7: コミット**

```bash
git status
git add components/webgl/runtime-targets.ts components/webgl/intro-overlay.tsx components/home/hero.tsx app/globals.css app/page.tsx
git commit -m "feat(top): 粒子ワードマークイントロとターミナル収束、ヒーロー刷新

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: カスタムカーソル・磁力ボタン・フィルムグレイン

**Files:**
- Create: `components/webgl/cursor-fx.tsx`
- Create: `components/webgl/magnetic.tsx`
- Modify: `components/home/hero.tsx`（CTA2つをMagneticで包む）
- Modify: `app/globals.css`（末尾に追記)
- Modify: `app/page.tsx`（マウント1行＋グレインクラス）

**Interfaces:**
- Consumes: なし（独立）
- Produces: `<CursorFx />`、`<Magnetic strength?: number>`

- [ ] **Step 1: cursor-fx.tsx を実装**

```tsx
"use client"

import { useEffect, useRef } from "react"

/**
 * カスタムカーソル（ドット＋追従リング）。
 * a / button / [data-magnetic] ホバーでリング拡大。
 * タッチ端末・reduced-motionでは何もしない。
 */
export function CursorFx() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    document.body.classList.add("corp-custom-cursor")
    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let scale = 1
    let hover = false
    let raf = 0
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      hover = Boolean(
        (e.target as Element | null)?.closest?.("a, button, [data-magnetic]")
      )
    }
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      scale += ((hover ? 1.8 : 1) - scale) * 0.2
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${scale})`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      document.body.classList.remove("corp-custom-cursor")
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-sky-300"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-sky-300/60"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </div>
  )
}
```

- [ ] **Step 2: magnetic.tsx を実装**

```tsx
"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

/** カーソルに吸い付くラッパー（CTAボタン用） */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)"
  }
  return (
    <div
      ref={ref}
      data-magnetic
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: hero.tsx のCTAをMagneticで包む**

importに `import { Magnetic } from "@/components/webgl/magnetic"` を追加し、CTA部分を:

```tsx
            <div
              className="corp-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "1000ms" }}
            >
              <Magnetic>
                <Link
                  href="#contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-gray-950 transition hover:bg-slate-200 sm:w-auto"
                >
                  無料相談する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="#services"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
                >
                  サービスを見る
                </Link>
              </Magnetic>
            </div>
```

- [ ] **Step 4: globals.css 末尾に追記**

```css
/* === カスタムカーソル・グレイン === */
@media (pointer: fine) {
  body.corp-custom-cursor,
  body.corp-custom-cursor a,
  body.corp-custom-cursor button {
    cursor: none;
  }
}

/* 微細フィルムグレイン（SVG feTurbulence） */
.corp-grain::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 55;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 5: page.tsx にマウント**

importに `import { CursorFx } from "@/components/webgl/cursor-fx"` を追加。
`<IntroOverlay />` の直後に `<CursorFx />`。
ルートdivを `<div className="corp-grain bg-[#030712] text-white">` に変更。

- [ ] **Step 6: 検証**

```bash
npm run build && npm run dev
```

1. デスクトップ: ネイティブカーソルが消え、ドット＋リングが追従。リンクホバーでリング拡大
2. CTAボタンがカーソルに吸い付き、離れると戻る
3. 画面全体に微細なグレインが乗る（拡大して確認）
4. DevToolsのデバイスエミュレーション（タッチ）: カスタムカーソルが出ない

- [ ] **Step 7: コミット**

```bash
git status
git add components/webgl/cursor-fx.tsx components/webgl/magnetic.tsx components/home/hero.tsx app/globals.css app/page.tsx
git commit -m "feat(top): カスタムカーソル・磁力CTA・フィルムグレインを追加

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: 総合検証（設計書の完了条件）

**Files:** なし（検証のみ。問題があれば該当タスクのファイルを修正）

- [ ] **Step 1: ビルド・テスト・未追跡ファイル確認**

```bash
npm run build && npm test
git status   # components/webgl/ 以下に未追跡ファイルが残っていないこと（Vercel事故防止）
```

- [ ] **Step 2: デスクトップ通し確認**

`npm run dev` → http://localhost:3000 で:
1. イントロ（シークレットウィンドウ）→ワードマーク→カオス→ターミナル収束
2. 最下部までスクロールし、7章すべての形状遷移を目視確認
3. 実績セクションで数字がカウントアップする（既存Stat）
4. FAQアコーディオン・Contactフォームの操作が正常（フォームは入力→バリデーションまで。送信はしない）
5. ヘッダーのアンカーリンク（サービス/実績/FAQ/お問い合わせ）が正しく着地
6. コンソールにエラーが出ていない

- [ ] **Step 3: モバイル・アクセシビリティ確認**

1. DevTools iPhoneエミュレーション: 粒子が少なく軽い・カーソルなし・レイアウト崩れなし
2. Rendering > prefers-reduced-motion: reduce → 静的背景＋即時表示＋ネイティブスクロール
3. Lighthouse（DevTools > Lighthouse > Desktop）: Performance / SEO / Accessibility を計測し、現状比で大幅劣化（特にSEO・Accessibility）がないこと。LCPが2.5s以内であること

- [ ] **Step 4: 下層ページregression確認**

/services/ai・/about・/research のいずれかを開き、背景色・レイアウトが従来通りであること（Section/StepFlowのデフォルト挙動が不変であること）。

- [ ] **Step 5: 問題がなければ完了報告**

検証結果（各項目のOK/NG）をユーザーに報告し、デプロイ判断を仰ぐ。

---

## Task 11 実施結果（2026-07-08、controller実施）

headless Chrome（SwiftShader software WebGL）で実プロダクションビルドを実レンダリングした結果、Critical不具合を2件発見・修正した。詳細は上部「Global Constraints」の訂正注記、および設計書 `docs/superpowers/specs/2026-07-07-top-page-webgl-redesign-design.md` の訂正注記を参照。

**発見1（Critical）**: WebGLシーンが`ReactCurrentBatchConfig`未定義エラーで実行時に常時クラッシュし、ErrorBoundaryの静的フォールバックに落ちて`<canvas>`が一切マウントされていなかった（全ブラウザでWebGL演出が非表示）。原因はNext.js 15がクライアントに実際にはReact 19をバンドルすること。React 18固定の前提を破棄し、React 19 + `@react-three/fiber` v9 + `@react-three/postprocessing` v3へ移行。

**発見2（Critical、同時発覚）**: 粒子ポイントサイズの数値バグ。`uSize=40`は1粒子あたり37〜150px相当となり、24,000粒子の加算合成＋Bloomで画面全体が白飛びしていた。`uSize=3.5`に補正（1粒子あたり約2〜10px、意図通りの微細粒子表現）。

両修正はcommit `fb60e47`にまとめ、独立レビュー（opus）でapproved。

**Step 1-4検証結果（headless Chrome代替で実施）**:
- ✅ 修正後: canvas mount確認、JSエラー0件、ヒーローの粒子がターミナルウィンドウ枠へ収束する演出を目視確認
- ✅ SSRコピー（見出し・CTA・ターミナル文言・章ラベル）全て確認、`<canvas>`はSSRに含まれずクライアントのみ（SEOガードレール健全）
- ✅ reduced-motion: canvas非表示、静的背景（GridBackground+Glow）へのフォールバック確認
- ✅ モバイル（iPhone UA・375幅相当）: JSエラー0、レイアウト崩れなし、低品質tierで粒子表示
- ✅ 下層ページregression: /services/ai /about /minecraft-english /lp/japan-property 全て200・レイアウト従来通り
- ✅ npm test 22/22、npm run build成功、homepage First Load 193kB（WebGLはdynamic importで分離）
- ⚠️ 章ごとの形状遷移（constellation/graph等）はheadlessのアンカースクロール手法に技術的制約があり目視未実施。Task 2の8ユニットテスト（形状幾何の検証）とTask 5/7レビューでのchapterPos順序独立検証により代替確認
- ⚠️ Lighthouseスコア計測は未実施（CLI未導入）。バンドルサイズ分析と実レンダリング確認で代替
- 未実施: Contactフォームの実送信（設計書の通りスコープ外）

進捗台帳: `.superpowers/sdd/progress.md` に完全な記録あり。
