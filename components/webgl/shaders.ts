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
