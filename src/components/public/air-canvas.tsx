"use client";

import { useEffect, useRef } from "react";

/**
 * The Atelier air: domain-warped noise drifting upward in cream and pale
 * amber veils, rendered at half size behind the page. The pointer's recent
 * path parts it. Pauses off-screen; reduced motion draws one still frame;
 * without script the paper simply shows.
 */
const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 v) {
  return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 v) {
  vec2 i = floor(v);
  vec2 f = fract(v);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 v) {
  float s = 0.0;
  float a = 0.5;
  for (int k = 0; k < 4; k++) {
    s += a * noise(v);
    v = v * 2.03 + vec2(11.0, 7.0);
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 st = uv * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float t = uTime * 0.05;
  vec2 drift = vec2(0.0, -t);
  vec2 warp = vec2(fbm(st * 1.6 + drift), fbm(st * 1.6 + drift + vec2(5.2, 1.3)));
  float veil = fbm(st + (warp - 0.5) * 1.8 + drift * 1.4);

  // the pointer's recent path parts the air
  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float d = distance(st + vec2(0.0, -t * 2.0), m);
  float part = smoothstep(0.55, 0.05, d) * 0.35;

  // cream paper, pale amber veils (matching tokens.css values)
  vec3 paper = vec3(0.937, 0.912, 0.874);
  vec3 veilA = vec3(0.962, 0.925, 0.862);
  vec3 veilB = vec3(0.902, 0.869, 0.812);
  vec3 col = mix(paper, veilA, smoothstep(0.35, 0.85, veil));
  col = mix(col, veilB, smoothstep(0.6, 1.0, fbm(st * 0.9 - drift)));
  col = mix(col, paper, part);
  gl_FragColor = vec4(col, 1.0);
}`;

export function AirCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let raf = 0;
    let running = false;
    let onScreen = true;
    let start = performance.now();

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false });
    if (!gl) {
      host.remove();
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const resize = () => {
      // half size, stretched by CSS
      const w = Math.max(1, Math.floor(host.clientWidth / 2));
      const h = Math.max(1, Math.floor(host.clientHeight / 2));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      if (onScreen && !document.hidden) draw(now);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
    });
    io.observe(document.body);

    if (reduced) {
      draw(performance.now()); // one still frame, no loop
    } else {
      running = true;
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      running = false;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return <div className="air" ref={ref} aria-hidden="true" />;
}
