"use client";
// Abertura da página inicial em slides: 1) foto do casal e catálogo, 2) convite para ser consultor(a).
// Troca sozinho a cada 8 segundos; pausa com o foco do teclado ou com a aba escondida.
// Setas, bolinhas, arrastar no celular e as setas do teclado também trocam.
// Com "reduzir movimento" ligado, não troca sozinho.
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Campanha from "./Campanha";
import ConviteConsultor from "./ConviteConsultor";

const TEMPO = 8000;

const SLIDES: { nome: string; claro: boolean; conteudo: () => ReactNode }[] = [
  { nome: "Fragrâncias", claro: false, conteudo: () => <Campanha /> },
  { nome: "Seja consultor(a)", claro: true, conteudo: () => <ConviteConsultor /> },
];

export default function Abertura() {
  const [atual, setAtual] = useState(0);
  const [visitas, setVisitas] = useState(SLIDES.map(() => 0));
  const [parado, setParado] = useState(false);
  const [semMovimento, setSemMovimento] = useState(false);
  const toque = useRef<number | null>(null);

  const ir = useCallback((n: number) => {
    const alvo = (n + SLIDES.length) % SLIDES.length;
    if (alvo === atual) return;
    setVisitas((v) => v.map((x, i) => (i === alvo ? x + 1 : x)));
    setAtual(alvo);
  }, [atual]);

  useEffect(() => {
    setSemMovimento(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const vis = () => setParado(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  const automatico = !parado && !semMovimento;
  useEffect(() => {
    if (!automatico) return;
    const t = window.setTimeout(() => ir(atual + 1), TEMPO);
    return () => window.clearTimeout(t);
  }, [atual, automatico, ir]);

  return (
    <section
      className={`carrossel${SLIDES[atual].claro ? " claro" : ""}${automatico ? " rodando" : ""}`}
      id="inicio"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onFocus={(e) => { if (e.target.matches(":focus-visible")) setParado(true); }}
      onBlur={() => setParado(document.hidden)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(atual + 1);
        if (e.key === "ArrowLeft") ir(atual - 1);
      }}
      onTouchStart={(e) => { toque.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (toque.current == null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        toque.current = null;
        if (Math.abs(dx) > 50) ir(atual + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="carrossel-slides">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`carrossel-slide${i === atual ? " on" : ""}${visitas[i] > 0 ? " volta" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${SLIDES.length}: ${s.nome}`}
            aria-hidden={i !== atual}
            inert={i !== atual}
          >
            {/* a chave muda a cada visita, para as animações de entrada recomeçarem */}
            <div key={visitas[i]} className="carrossel-conteudo">{s.conteudo()}</div>
          </div>
        ))}
      </div>

      <button type="button" className="carrossel-seta ant" onClick={() => ir(atual - 1)} aria-label="Slide anterior">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className="carrossel-seta prox" onClick={() => ir(atual + 1)} aria-label="Próximo slide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="carrossel-pontos">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            type="button"
            className={i === atual ? "on" : ""}
            onClick={() => ir(i)}
            aria-label={`Ir para o slide ${i + 1}: ${s.nome}`}
            aria-current={i === atual}
          >
            <span key={`${atual}-${visitas[i]}`} style={{ animationDuration: `${TEMPO}ms` }} />
          </button>
        ))}
      </div>
    </section>
  );
}
