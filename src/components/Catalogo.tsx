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
      <div className="eyebrow">Catálogo</div>
      <h2 className="h2">Encontre o Seu Perfume</h2>
      <p className="lead">
        Mais de 200 produtos Amakha Paris. Escolha o que gostou e me chame no WhatsApp: eu confirmo o estoque e o valor na hora.
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
          placeholder="Nome, nota ou perfume famoso: ex. Sauvage"
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
        <span className="cat-hint">Na dúvida? <a href="#descubra">Faça o teste do perfume</a></span>
      </div>
      <p className="cat-count" aria-live="polite">{lista.length} {lista.length === 1 ? "produto" : "produtos"}</p>
      <div className="cat-grid">
        {lista.length === 0 && <p className="cat-empty">Nenhum produto encontrado. Tente outro nome ou me chame no WhatsApp.</p>}
        {lista.slice(0, limite).map((p) => <CardProduto key={p.nome} produto={p} />)}
      </div>
      {lista.length > limite && (
        <button type="button" className="btn btn-outline" style={{ marginTop: 48, background: "#fff", cursor: "pointer" }} onClick={() => setLimite(limite + POR_PAGINA)}>
          Mostrar mais produtos
        </button>
      )}
      <p className="cat-legal">
        As referências &quot;inspirado em&quot; indicam apenas a família de cheiro, para você comparar com perfumes que já conhece. Os produtos
        são Amakha Paris, sem ligação com as marcas citadas.
      </p>
    </section>
  );
}
