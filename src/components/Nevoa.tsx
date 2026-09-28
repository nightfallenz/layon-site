"use client";
// Partículas douradas subindo devagar no topo da página, como o perfume no ar.
// Leve de propósito: poucas partículas, para quando a área sai da tela e some com "reduzir movimento".
import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; fase: number };

export default function Nevoa() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, rodando = true, quadro = 0;
    let ps: P[] = [];
    const novo = (inicio = false): P => ({
      x: Math.random() * w,
      y: inicio ? Math.random() * h : h + 10,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.15,
      a: 0.15 + Math.random() * 0.45,
      fase: Math.random() * Math.PI * 2,
    });
    const medir = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, (w * h) / 16000));
      ps = Array.from({ length: n }, () => novo(true));
    };
    const passo = (t: number) => {
      if (!rodando) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(t / 1800 + p.fase) * 0.2;
        if (p.y < -10) Object.assign(p, novo());
        const brilho = p.a * (0.6 + 0.4 * Math.sin(t / 700 + p.fase));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, `rgba(201,162,39,${brilho})`);
        g.addColorStop(1, "rgba(201,162,39,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      quadro = requestAnimationFrame(passo);
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      const ver = e.isIntersecting && !document.hidden;
      if (ver && !rodando) { rodando = true; quadro = requestAnimationFrame(passo); }
      if (!ver) { rodando = false; cancelAnimationFrame(quadro); }
    });
    io.observe(c);
    quadro = requestAnimationFrame(passo);

    return () => { rodando = false; cancelAnimationFrame(quadro); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className="nevoa" aria-hidden="true" />;
}
