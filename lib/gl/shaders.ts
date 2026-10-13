// The Loom: every particle is a short horizontal thread. Threads sit on
// fixed rows like strip-woven cloth. The "mosaic" shape is a set of woven
// tiles that stays put; the "africa" shape morphs between four shapes:
//   0 → Africa   (collect: voices ripple out from language hubs)
//   1 → waveform (curate: a clip being transcribed left to right)
//   2 → matrix   (train: an attention map learning its diagonal)
//   3 → Africa   (deploy: the continent lit up)

export const MAX_HUBS = 12

export const VERT = /* glsl */ `#version 300 es
precision highp float;

in vec2 aMap;
in vec2 aWave;
in vec2 aGrid;
in vec2 aCell;   // grid cell (i, j) normalised 0..1
in float aSeed;
in float aRow;   // 0..1 top→bottom on the map
in float aFade;  // per-thread opacity
in float aGlow;  // resting brightness: 0 ink, ~0.75 signal, 2 live

uniform float uTime;
uniform float uMorph;
uniform float uIntro;
uniform float uIntroSides; // 1: threads enter from their own side (mosaic), 0: from the left
uniform float uHalfW;      // half the world width
uniform float uLit;
uniform float uCursor;
uniform vec2 uScale;
uniform vec2 uOffset;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform float uCell;     // thread spacing in px
uniform float uDpr;
uniform vec4 uHubs[${MAX_HUBS}]; // xy pos, z phase, w live flag
uniform int uHubCount;

out float vIntensity;
out float vLive;
out float vAlpha;
out float vLen;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

// Staggered 0..1 progress through one morph segment.
float seg(float m, float s, float seed) {
  float t = clamp((m - s) * 1.7 - seed * 0.7, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  float s1 = seg(uMorph, 0.0, aSeed);
  float s2 = seg(uMorph, 1.0, aSeed);
  float s3 = seg(uMorph, 2.0, aSeed);

  vec2 p = mix(aMap, aWave, s1);
  p = mix(p, aGrid, s2);
  p = mix(p, aMap, s3);

  // Threads lift off the loom while travelling between shapes.
  float travel = sin(3.14159 * s1) + sin(3.14159 * s2) + sin(3.14159 * s3);
  float a = aSeed * 6.2831 + uTime * 0.6;
  p += vec2(cos(a), sin(a * 1.3)) * 0.18 * travel;

  // Idle weave: rows slide a little against each other.
  p.x += sin(uTime * 0.5 + aRow * 40.0) * 0.004;

  // Intro: rows are woven in top to bottom. The map slides in from the left;
  // mosaic tiles are pulled in from the nearest screen edge, outer columns first.
  float side = uIntroSides > 0.5 ? sign(aMap.x) : -1.0;
  float inward = uIntroSides * (1.0 - abs(aMap.x) / max(uHalfW, 0.001));
  float rowIn = clamp(uIntro * 1.6 - aRow * 0.45 - inward * 0.5, 0.0, 1.0);
  rowIn = 1.0 - pow(1.0 - rowIn, 3.0);
  float travelIn = mix(0.6, 1.2, uIntroSides);
  p.x += side * (1.0 - rowIn) * travelIn;

  float wMap = (1.0 - s1) + s3;
  float wWave = s1 * (1.0 - s2);
  float wGrid = s2 * (1.0 - s3);

  // Collect: rings travel out from each hub.
  float ring = 0.0;
  float live = 0.0;
  for (int i = 0; i < ${MAX_HUBS}; i++) {
    if (i >= uHubCount) break;
    vec4 h = uHubs[i];
    float d = distance(aMap, h.xy);
    float weight = mix(0.32, 0.42, h.w);
    float r = fract(uTime * 0.12 + h.z) * 1.6;
    float band = exp(-pow((d - r) * 22.0, 2.0)) * (1.0 - r / 1.6);
    float core = exp(-d * d * 900.0);
    float amt = (band * mix(0.55, 1.0, h.w) + core) * weight * 2.6;
    ring += amt;
    live += amt * h.w;
  }

  // Curate: a transcription cursor sweeps the waveform.
  float done = step(aWave.x, uCursor);
  float cursorGlow = exp(-pow((aWave.x - uCursor) * 18.0, 2.0));

  // Train: attention concentrates on the diagonal as training runs.
  float learn = 0.62 + 0.38 * sin(uTime * 0.35);
  float diag = exp(-pow((aCell.x - aCell.y) * mix(4.0, 16.0, learn), 2.0));
  // Off-diagonal blocks: phrases attending to nearby phrases.
  float block = step(0.86, hash(floor(aCell.x * 9.0) * 13.0 + floor(aCell.y * 9.0) * 7.0)) * 0.55;
  float noise = hash(floor(aCell.x * 76.0) + floor(aCell.y * 76.0) * 91.0 + floor(uTime * 2.0));
  float heat = mix(noise * 0.3, max(diag, block * (1.0 - learn * 0.5)), learn);

  // Deploy: threads light up as the model ships.
  float lit = step(aSeed, uLit * 0.85) * s3;

  float intensity = wMap * ring + wWave * (done * 0.65 + cursorGlow) + wGrid * heat + lit * 0.8 + min(aGlow, 1.0);

  // Pointer: threads part around the cursor and brighten.
  vec2 toP = p - uPointer;
  float pd = length(toP);
  float push = exp(-pd * pd * 40.0) * uPointerOn;
  p += normalize(toP + 1e-4) * push * 0.05;
  intensity += push * 0.9;

  vIntensity = clamp(intensity, 0.0, 1.0);
  vLive = clamp(live * (1.0 - s1) * 1.6 + step(1.5, aGlow), 0.0, 1.0);
  vAlpha = rowIn * aFade * mix(0.42, 1.0, vIntensity);
  vLen = mix(0.55, 0.92, hash(aSeed * 91.0)) + vIntensity * 0.12;

  gl_Position = vec4(p * uScale + uOffset, 0.0, 1.0);
  gl_PointSize = uCell * uDpr;
}
`

export const FRAG = /* glsl */ `#version 300 es
precision highp float;

in float vIntensity;
in float vLive;
in float vAlpha;
in float vLen;

uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uLiveColor;
uniform float uThread; // thread thickness as a fraction of the cell

out vec4 outColor;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float hx = vLen * 0.5;
  float hy = uThread * 0.5;
  // Soft-edged rectangle so threads stay crisp but never alias.
  float ex = 1.0 - smoothstep(hx - 0.04, hx, abs(pc.x));
  float ey = 1.0 - smoothstep(hy - 0.03, hy + 0.01, abs(pc.y));
  float shape = ex * ey;
  if (shape < 0.01) discard;

  vec3 col = mix(uInk, uAccent, smoothstep(0.08, 0.6, vIntensity));
  col = mix(col, uLiveColor, vLive);
  float a = shape * vAlpha;
  outColor = vec4(col * a, a);
}
`
