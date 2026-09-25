'use client';

import { useEffect, useRef } from 'react';

/**
 * Iridescent fluid bands, WebGL1 port of the ColorBends + grain shader.
 * Bands accumulate additively on a transparent canvas so the page background
 * shows through wherever coverage is zero.
 */

const MAX_COLORS = 8;

const VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define MAX_COLORS ${MAX_COLORS}

uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandScale;
uniform float uSoft;
uniform float uCoreWhite;

varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;

  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  q += (uPointer - rp) * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec2 r = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
  float kBelow = clamp(uWarpStrength, 0.0, 1.0);
  float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
  vec2 warped = q + (r - q) * kBelow * gain;
  float m = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t) / 4.0);

  // Each iso-ring of the warped field becomes one band; the ring centre blows
  // out to white so only the shoulders carry hue.
  float x = m * uBandScale;
  float e = abs(2.0 * fract(x) - 1.0);
  float w = pow(max(1.0 - e, 0.0), uSoft);

  int k = int(mod(floor(x), float(uColorCount)));
  vec3 hue = uColors[0];
  for (int i = 0; i < MAX_COLORS; ++i) {
    if (i == k) hue = uColors[i];
  }

  vec3 col = clamp(mix(hue, vec3(1.0), pow(w, 2.0) * uCoreWhite) * uIntensity, 0.0, 1.0);

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col = clamp(col + (n - 0.5) * uNoise, 0.0, 1.0);
  }

  float a = w;
  gl_FragColor = vec4(col * a, a);
}
`;

export type BendConfig = {
  colors: string[];
  speed?: number;
  rotation?: number;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandScale?: number;
  soft?: number;
  coreWhite?: number;
};

function toRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function IridescentBackground({ config }: { config: BendConfig }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cfgRef = useRef(config);

  useEffect(() => {
    cfgRef.current = config;
  }, [config]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!gl) {
      host.style.background = 'linear-gradient(120deg,#e8f4ff,#fdf3d8,#f3e8ff)';
      return;
    }
    host.appendChild(canvas);

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return () => host.removeChild(canvas);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      canvas: U('uCanvas'), time: U('uTime'), speed: U('uSpeed'), rot: U('uRot'),
      count: U('uColorCount'), colors: U('uColors[0]'), scale: U('uScale'),
      frequency: U('uFrequency'), warp: U('uWarpStrength'), pointer: U('uPointer'),
      mouse: U('uMouseInfluence'), parallax: U('uParallax'), noise: U('uNoise'),
      iterations: U('uIterations'), intensity: U('uIntensity'),
      bandScale: U('uBandScale'), soft: U('uSoft'), coreWhite: U('uCoreWhite'),
    };

    const palette = new Float32Array(MAX_COLORS * 3);
    const writePalette = (colors: string[]) => {
      for (let i = 0; i < MAX_COLORS; i++) {
        const [r, g, b] = toRgb(colors[i % colors.length] ?? '#000000');
        palette.set([r, g, b], i * 3);
      }
      gl.uniform3fv(u.colors, palette);
      gl.uniform1i(u.count, Math.min(colors.length, MAX_COLORS));
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.canvas, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const target = [0, 0];
    const pointer = [0, 0];
    const onMove = (e: PointerEvent) => {
      target[0] = (e.clientX / window.innerWidth) * 2 - 1;
      target[1] = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();

    const frame = (now: number) => {
      const c = cfgRef.current;
      const t = (now - start) * 0.001;
      writePalette(c.colors);
      gl.uniform1f(u.time, reduced ? 12 : t);
      gl.uniform1f(u.speed, c.speed ?? 0.2);
      gl.uniform1f(u.scale, c.scale ?? 1);
      gl.uniform1f(u.frequency, c.frequency ?? 1);
      gl.uniform1f(u.warp, c.warpStrength ?? 1);
      gl.uniform1f(u.mouse, c.mouseInfluence ?? 1);
      gl.uniform1f(u.parallax, c.parallax ?? 0.5);
      gl.uniform1f(u.noise, c.noise ?? 0.15);
      gl.uniform1i(u.iterations, c.iterations ?? 1);
      gl.uniform1f(u.intensity, c.intensity ?? 1.5);
      gl.uniform1f(u.bandScale, c.bandScale ?? 2.2);
      gl.uniform1f(u.soft, c.soft ?? 1.1);
      gl.uniform1f(u.coreWhite, c.coreWhite ?? 0.85);

      const deg = ((c.rotation ?? 90) % 360) + (c.autoRotate ?? 0) * t;
      const rad = (deg * Math.PI) / 180;
      gl.uniform2f(u.rot, Math.cos(rad), Math.sin(rad));

      const k = Math.min(1, 0.016 * 8);
      pointer[0] += (target[0] - pointer[0]) * k;
      pointer[1] += (target[1] - pointer[1]) * k;
      gl.uniform2f(u.pointer, pointer[0], pointer[1]);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (raf === 0 && visible && !reduced) raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(host);
    const onVis = () => {
      visible = !document.hidden;
      if (visible) play();
      else pause();
    };
    document.addEventListener('visibilitychange', onVis);

    frame(0);
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className="fixed inset-0 -z-10 h-full w-full" />;
}
