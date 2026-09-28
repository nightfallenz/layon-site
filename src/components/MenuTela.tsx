"use client";
// Menu em tela cheia: lista grande à esquerda; ao passar o mouse num item,
// a faixa de frascos embaixo troca para os produtos daquela linha e desliza.
import { useEffect, useMemo, useState } from "react";
import { fotoDe, PRODUTOS } from "@/lib/catalogo";
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
      { nome: "Kits completos", href: "/kits", produtos: pegar([...KITS_3EM1.produtos, ...KITS_2EM1.produtos, ...KITS_PREMIUM.produtos]) },
      { nome: "Linha Árabe", href: "/arabes", produtos: pegar([...ARABES.originais, ...ARABES.perfumes, ...ARABES.kits]) },
      { nome: "Catálogo", href: "/#catalogo", produtos: PRODUTOS.filter((p) => p.preco != null) },
      { nome: "Descubra seu perfume", href: "/#descubra", produtos: PERFUMES_100 },
      { nome: "Seja consultor", href: "/#consultor", produtos: PERFUMES_100.slice(0, 12) },
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

  const faixa = itens[ativo].produtos.slice(0, 14);

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
      <div className="mt-faixa" key={ativo} aria-hidden="true">
        <div className="mt-trilho">
          {[...faixa, ...faixa].map((p, i) => (
            <a key={i} href={linkDe(p)} tabIndex={-1} onClick={fechar} title={nomeVitrine(p)}>
              <img src={fotoDe(p, 300)} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
