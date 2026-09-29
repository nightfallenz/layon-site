"use client";
// Efeitos de movimento do site todo, num lugar só:
// - elementos aparecem suavemente ao rolar a página (inclusive cards que surgem depois, como no catálogo);
// - barra de progresso da leitura no topo;
// - menu ganha sombra depois que a página rola;
// - leve parallax na foto do topo.
// Quem pediu "reduzir movimento" no celular/computador não vê nenhum desses efeitos.
import { useEffect } from "react";

// O que aparece ao rolar. Para animar algo novo, basta acrescentar o seletor aqui.
const REVELAR = [
  ".section .eyebrow", ".section .h2", ".section .lead", ".card", ".kp", ".pcard", ".coll", ".escolha",
  ".feat", ".perks li", ".bloco-head", ".q", ".quiz-or", ".photo", ".float-card", ".news", ".fcol",
  ".cat-tools", ".cat-sub", ".section .actions", ".section .btn-outline", ".hr",
].join(",");

/** Rola até o convite de consultor deixando os botões "Fazer meu cadastro" e "Conversar" à vista:
 *  se o bloco inteiro cabe na tela, mostra do título aos botões; se não cabe, os botões ficam no pé da tela. */
function irParaConsultor(suave: boolean) {
  const bloco = document.getElementById("consultor");
  const fim = bloco?.querySelector(".note") ?? bloco?.querySelector(".actions");
  if (!bloco || !fim) return false;
  const menu = window.innerWidth <= 760 ? 64 : 81;
  const y = window.scrollY;
  const topo = y + bloco.getBoundingClientRect().top - menu - 24;
  const botoes = y + fim.getBoundingClientRect().bottom - window.innerHeight + 40;
  window.scrollTo({ top: Math.max(topo, botoes), behavior: suave ? "smooth" : "auto" });
  return true;
}

export default function Animacoes() {
  useEffect(() => {
    const clique = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.pathname !== location.pathname || a.hash !== "#consultor") return;
      if (irParaConsultor(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        e.preventDefault();
        history.replaceState(null, "", "#consultor");
      }
    };
    document.addEventListener("click", clique);
    // chegando de outra página já com /#consultor no endereço
    let t = 0;
    if (location.hash === "#consultor") t = window.setTimeout(() => irParaConsultor(false), 300);
    return () => { document.removeEventListener("click", clique); window.clearTimeout(t); };
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    raiz.classList.add("anim");

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.classList.contains("h2")) el.classList.add("brilha");
          io.unobserve(el);
          // terminada a entrada, devolve o elemento ao normal (assim o efeito de passar o mouse não herda o atraso)
          const limpar = () => { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); };
          setTimeout(limpar, 1400 + (parseInt(el.style.getPropertyValue("--d")) || 0));
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const preparar = (el: Element) => {
      if (!(el instanceof HTMLElement) || el.classList.contains("rv") || el.dataset.visto) return;
      el.dataset.visto = "1";
      // itens lado a lado entram em sequência (efeito cascata)
      const irmaos = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(REVELAR)) : [];
      const i = Math.max(0, irmaos.indexOf(el));
      el.style.setProperty("--d", `${(i % 8) * 70}ms`);
      el.classList.add("rv");
      io.observe(el);
    };
    const varrer = (base: ParentNode) => {
      if (base instanceof Element && base.matches(REVELAR)) preparar(base);
      base.querySelectorAll(REVELAR).forEach(preparar);
    };
    varrer(document);

    const mo = new MutationObserver((mudancas) => {
      for (const m of mudancas) m.addedNodes.forEach((n) => { if (n instanceof Element) varrer(n); });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // rolagem: progresso, menu e parallax
    const barra = document.querySelector<HTMLElement>(".progresso");
    const heroImg = document.querySelector<HTMLElement>(".vitrine-palco");
    let pedido = 0;
    const aoRolar = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barra) barra.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        raiz.classList.toggle("rolou", y > 12);
        const camp = document.querySelector<HTMLElement>(".campanha-foto img");
        if (camp && window.innerWidth > 760) {
          const r = camp.parentElement!.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) camp.style.transform = `translate3d(0, ${(r.top / window.innerHeight) * 60 - 60}px, 0)`;
        }
        if (heroImg && y < window.innerHeight * 1.2) heroImg.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", aoRolar);
      raiz.classList.remove("anim");
    };
  }, []);

  return <div className="progresso" aria-hidden="true" />;
}
