"use client";
import { useEffect, useMemo, useState } from "react";
import { ESTILOS, FILTRO_INICIAL, INTENSIDADES, filtrar, type Estilo, type Filtro, type Intensidade } from "@/lib/catalogo";
import CardProduto from "./CardProduto";
import { useLoja } from "./Loja";

const GRUPOS = ["F", "M", "K", "B", "C"];

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
  const [porPagina, setPorPagina] = useState(24);
  const [limite, setLimite] = useState(24);
  const [pronto, setPronto] = useState(false);
  const lista = useMemo(() => filtrar(filtro), [filtro]);
  const muda = (parte: Partial<Filtro>) => setFiltro({ ...filtro, ...parte });

  // 12 por vez no celular, 24 no computador
  useEffect(() => {
    const n = window.matchMedia("(max-width:760px)").matches ? 12 : 24;
    setPorPagina(n);
    setLimite(n);
  }, []);

  // o filtro vem do endereço (/catalogo?grupo=K&q=sauvage) e volta para ele, para o link poder ser compartilhado
  useEffect(() => {
    const u = new URLSearchParams(window.location.search);
    const g = u.get("grupo") ?? "";
    setFiltro({ ...FILTRO_INICIAL, grupo: GRUPOS.includes(g) ? (g as Filtro["grupo"]) : "all", termo: (u.get("q") ?? "").slice(0, 80) });
    setPronto(true);
    // só na abertura da página
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLimite(porPagina);
    if (!pronto) return;
    const u = new URLSearchParams();
    if (filtro.grupo !== "all") u.set("grupo", filtro.grupo);
    if (filtro.termo.trim()) u.set("q", filtro.termo.trim());
    const qs = u.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
  }, [filtro, porPagina, pronto]);

  return (
    <section id="catalogo" className="section center cat-pagina">
      <div className="cat-tools">
        <label className="sr-only" htmlFor="busca">Buscar produto</label>
        <input
          id="busca"
          className="search search-grande"
          type="search"
          placeholder="Buscar por nome, nota ou clássico: Sauvage, baunilha…"
          autoComplete="off"
          value={filtro.termo}
          onChange={(e) => muda({ termo: e.target.value })}
        />
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
      </div>
      <details className="cat-mais" open={!!(filtro.estilo || filtro.intensidade) || undefined}>
        <summary>Mais filtros</summary>
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
          <span className="cat-hint">Precisa de orientação? <a href="/#descubra">Descubra o seu perfume</a></span>
        </div>
      </details>
      <p className="cat-count" aria-live="polite" hidden={!pronto}>{lista.length} {lista.length === 1 ? "item" : "itens"}</p>
      <div className="cat-grid" hidden={!pronto}>
        {lista.length === 0 && <p className="cat-empty">Nenhuma fragrância encontrada. Fale com o Layon: ele indica a mais próxima do que você procura.</p>}
        {lista.slice(0, limite).map((p) => <CardProduto key={p.nome} produto={p} />)}
      </div>
      {lista.length > limite && (
        <button type="button" className="btn btn-outline btn-mais" onClick={() => setLimite(limite + porPagina)}>
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
