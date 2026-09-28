"use client";
import { useEffect, useMemo, useState } from "react";
import { ESTILOS, INTENSIDADES, filtrar, type Estilo, type Filtro, type Intensidade } from "@/lib/catalogo";
import CardProduto from "./CardProduto";
import { useLoja } from "./Loja";

const POR_PAGINA = 24;

const ABAS: { grupo: Filtro["grupo"]; nome: string }[] = [
  { grupo: "all", nome: "Todos" },
  { grupo: "F", nome: "Femininos" },
  { grupo: "M", nome: "Masculinos" },
  { grupo: "K", nome: "Kits" },
  { grupo: "B", nome: "Body splash" },
  { grupo: "C", nome: "Corpo e cabelo" },
];

export default function Catalogo() {
  const { filtro, setFiltro } = useLoja();
  const [limite, setLimite] = useState(POR_PAGINA);
  const lista = useMemo(() => filtrar(filtro), [filtro]);
  useEffect(() => setLimite(POR_PAGINA), [filtro]);
  const muda = (parte: Partial<Filtro>) => setFiltro({ ...filtro, ...parte });

  return (
    <section id="catalogo" className="section center">
      <div className="eyebrow">A coleção</div>
      <h2 className="h2">Encontre a Sua <em>Assinatura</em></h2>
      <p className="lead">
        Cada fragrância acompanhada da sua pirâmide olfativa e do clássico que a inspira. Explore com calma: quando decidir, o
        pedido segue direto para o Layon.
      </p>
      <div className="cat-tools">
        <div className="pills" role="group" aria-label="Filtrar catálogo">
          {ABAS.map((a) => (
            <button
              key={a.grupo}
              type="button"
              className="pill"
              aria-pressed={filtro.grupo === a.grupo}
              onClick={() => muda({ grupo: a.grupo, tamanho: "" })}
            >
              {a.nome}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="busca">Buscar produto</label>
        <input
          id="busca"
          className="search"
          type="search"
          placeholder="Nome, nota ou clássico: Sauvage, baunilha…"
          autoComplete="off"
          value={filtro.termo}
          onChange={(e) => muda({ termo: e.target.value })}
        />
      </div>
      <div className="cat-sub">
        <label className="sr-only" htmlFor="f-estilo">Estilo</label>
        <select id="f-estilo" className="sel" value={filtro.estilo} onChange={(e) => muda({ estilo: e.target.value as Estilo | "" })}>
          <option value="">Todos os estilos</option>
          {ESTILOS.map((e) => <option key={e}>{e}</option>)}
        </select>
        <label className="sr-only" htmlFor="f-int">Intensidade</label>
        <select id="f-int" className="sel" value={filtro.intensidade} onChange={(e) => muda({ intensidade: e.target.value as Intensidade | "" })}>
          <option value="">Qualquer intensidade</option>
          {INTENSIDADES.map((i) => <option key={i}>{i}</option>)}
        </select>
        <span className="cat-hint">Precisa de orientação? <a href="#descubra">Descubra o seu perfume</a></span>
      </div>
      <p className="cat-count" aria-live="polite">{lista.length} {lista.length === 1 ? "item" : "itens"}</p>
      <div className="cat-grid">
        {lista.length === 0 && <p className="cat-empty">Nenhuma fragrância encontrada. Fale com o Layon: ele indica a mais próxima do que você procura.</p>}
        {lista.slice(0, limite).map((p) => <CardProduto key={p.nome} produto={p} />)}
      </div>
      {lista.length > limite && (
        <button type="button" className="btn btn-outline" style={{ marginTop: 48, background: "#fff", cursor: "pointer" }} onClick={() => setLimite(limite + POR_PAGINA)}>
          Ver mais fragrâncias
        </button>
      )}
      <p className="cat-legal">
        As referências indicam apenas a família olfativa, como guia de comparação. As fragrâncias são Amakha Paris e não têm vínculo
        com as marcas citadas.
      </p>
    </section>
  );
}
