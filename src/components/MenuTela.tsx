"use client";
// Menu em tela cheia: lista grande à esquerda; ao passar o mouse num item,
// a faixa de frascos embaixo troca para os produtos daquela linha e desliza.
import { useEffect, useMemo, useState } from "react";
import { fotoDe, precoTexto, PRODUTOS } from "@/lib/catalogo";
import { PERFUMES_100, perfumes15De, pegar } from "@/lib/produtos";
import { ARABES } from "@/data/arabes";
import { KITS_2EM1, KITS_3EM1, KITS_PREMIUM } from "@/data/kits";
import { linkDe } from "@/lib/perfume";
import { nomeVitrine } from "@/lib/nomes";
import Logo from "./Logo";

export default function MenuTela({ aberto, fechar }: { aberto: boolean; fechar: () => void }) {
  const itens = useMemo(
    () => [
      { nome: "Femininos", href: "/15ml/feminino", produtos: perfumes15De("F") },
      { nome: "Masculinos", href: "/15ml/masculino", produtos: perfumes15De("M") },
      { nome: "Perfumes 100ml", href: "/100ml", produtos: PERFUMES_100 },
      { nome: "Kits", href: "/kits", produtos: pegar([...KITS_PREMIUM.produtos, ...KITS_3EM1.produtos, ...KITS_2EM1.produtos]) },
      { nome: "Linha Árabe", href: "/arabes", produtos: pegar([...ARABES.originais, ...ARABES.perfumes, ...ARABES.kits]) },
      { nome: "Corpo e cabelo", href: "/corpo", produtos: PRODUTOS.filter((p) => p.grupo === "B" || p.grupo === "C") },
      { nome: "Catálogo completo", href: "/catalogo", produtos: PRODUTOS.filter((p) => p.preco != null) },
    ],
    []
  );
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    document.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [aberto, fechar]);

  // a faixa precisa de pelo menos 12 frascos para deslizar sem buraco; linhas curtas (kits) se repetem
  const base = itens[ativo].produtos.slice(0, 14);
  const faixa = base.length ? Array.from({ length: Math.max(base.length, 12) }, (_, i) => base[i % base.length]) : [];

  return (
    <div className={`menu-tela${aberto ? " aberto" : ""}`} aria-hidden={!aberto} role="dialog" aria-label="Menu">
      <div className="mt-topo">
        <Logo />
        <button type="button" className="mt-fechar" onClick={fechar} tabIndex={aberto ? 0 : -1}>Fechar</button>
      </div>
      <ul className="mt-lista">
        {itens.map((it, i) => (
          <li key={it.nome} style={{ ["--i" as string]: i }}>
            <a
              href={it.href}
              tabIndex={aberto ? 0 : -1}
              className={i === ativo ? "on" : ""}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              onClick={fechar}
            >
              {it.nome}<sup>{it.produtos.length}</sup>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-extra"><a href="/#descubra" tabIndex={aberto ? 0 : -1} onClick={fechar}>Descubra seu perfume</a><a href="/#consultor" tabIndex={aberto ? 0 : -1} onClick={fechar}>Seja consultor</a></p>
      <div className="mt-faixa" key={ativo} aria-hidden="true">
        <div className="mt-trilho">
          {[...faixa, ...faixa].map((p, i) => (
            <a key={i} href={linkDe(p)} tabIndex={-1} onClick={fechar} title={nomeVitrine(p)}>
              <span className="mt-foto"><img src={fotoDe(p, 300)} alt="" loading="lazy" /></span>
              <span className="mt-nome">{nomeVitrine(p)}</span>
              {p.preco != null && <span className="mt-preco">{precoTexto(p.preco)}</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
