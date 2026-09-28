"use client";
// Vitrine do topo da página inicial: um arco em tom pedra com três frascos que se alternam
// entre Femininas, Masculinas e Árabes. Cada frasco abre a ficha do perfume.
// Para trocar os frascos, edite CENAS (nomes iguais aos de produtos.json; o do meio fica em destaque).
// Cada frasco aparece com a sua caixa (foto oficial da Amakha); o do meio fica no alto, sobre o plinto.
import { useEffect, useRef, useState } from "react";
import { fotoDe } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";
import { nomeVitrine } from "@/lib/nomes";
import { useLoja } from "./Loja";

const CENAS = [
  { nome: "Femininas", link: "/100ml", produtos: ["521 Vip Rosé 100ml", "GD 100ml", "Elegance Blue 100ml"] },
  { nome: "Masculinas", link: "/100ml", produtos: ["Fortune 100ml", "AMK 100ml", "Imortal 100ml"] },
  { nome: "Árabes", link: "/arabes", produtos: ["Zaya 15ml", "Asadiyy 15ml", "Hasan Rose 15ml"] },
];
const TEMPO = 5500;

export default function Vitrine() {
  const { abrirFicha } = useLoja();
  const [ativa, setAtiva] = useState(0);
  const [pausa, setPausa] = useState(false);
  const semMovimento = useRef(false);

  useEffect(() => {
    semMovimento.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    if (pausa || semMovimento.current) return;
    const t = setTimeout(() => setAtiva((a) => (a + 1) % CENAS.length), TEMPO);
    return () => clearTimeout(t);
  }, [ativa, pausa]);

  return (
    <div className="vitrine" onMouseEnter={() => setPausa(true)} onMouseLeave={() => setPausa(false)} onFocus={() => setPausa(true)} onBlur={() => setPausa(false)}>
      <div className="vitrine-palco">
        <div className="arco" aria-hidden="true" />
        <div className="pedestal" aria-hidden="true" />
        <div className="plinto" aria-hidden="true" />
        {CENAS.map((c, i) => (
          <div className={`cena${i === ativa ? " ativa" : ""}`} key={c.nome} aria-hidden={i !== ativa}>
            {pegar(c.produtos).map((p, j) => (
              <button
                type="button"
                key={p.nome}
                className={`frasco f${j}`}
                tabIndex={i === ativa ? 0 : -1}
                onClick={() => abrirFicha(p)}
                aria-label={`Ver ${nomeVitrine(p)}`}
              >
                <img src={fotoDe(p, 500)} alt="" width={500} height={500} fetchPriority={i === 0 && j === 1 ? "high" : undefined} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="vitrine-abas" role="tablist" aria-label="Coleções em destaque">
        {CENAS.map((c, i) => (
          <button key={c.nome} type="button" role="tab" aria-selected={i === ativa} className={i === ativa ? "on" : ""} onClick={() => setAtiva(i)}>
            {c.nome}
          </button>
        ))}
        <a href={CENAS[ativa].link} className="vitrine-ver">Explorar →</a>
      </div>
    </div>
  );
}
