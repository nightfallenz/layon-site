"use client";
// Grade de produtos das páginas internas, com abas Feminino/Masculino e busca opcionais.
import { useMemo, useState } from "react";
import { fichaDe, normalizar, type Produto } from "@/lib/catalogo";
import CardProduto from "./CardProduto";

type Props = { produtos: Produto[]; abasDeGenero?: boolean; busca?: boolean };

export default function Grade({ produtos, abasDeGenero = false, busca = false }: Props) {
  const [genero, setGenero] = useState<"" | "F" | "M">("");
  const [termo, setTermo] = useState("");
  const lista = useMemo(() => {
    const ws = normalizar(termo.trim()).split(/\s+/).filter(Boolean);
    return produtos.filter((p) => {
      if (genero && p.grupo !== genero && p.grupo !== "U") return false;
      if (!ws.length) return true;
      const f = fichaDe(p);
      const t = normalizar([p.nome, f?.inspiradoEm, f?.marca, f?.estilo, ...(f?.topo ?? []), ...(f?.coracao ?? []), ...(f?.fundo ?? [])].join(" "));
      return ws.every((w) => t.includes(w));
    });
  }, [produtos, genero, termo]);

  return (
    <>
      {(abasDeGenero || busca) && (
        <div className="grade-tools">
          {abasDeGenero ? (
            <div className="pills" role="group" aria-label="Filtrar por gênero">
              {([["", "Todos"], ["F", "Femininos"], ["M", "Masculinos"]] as const).map(([g, nome]) => (
                <button key={g} type="button" className="pill" aria-pressed={genero === g} onClick={() => setGenero(g)}>{nome}</button>
              ))}
            </div>
          ) : <span />}
          {busca && (
            <>
              <label className="sr-only" htmlFor="busca-grade">Buscar</label>
              <input id="busca-grade" className="search" type="search" placeholder="Nome, nota ou perfume famoso" autoComplete="off" value={termo} onChange={(e) => setTermo(e.target.value)} />
            </>
          )}
        </div>
      )}
      {(abasDeGenero || busca) && <p className="cat-count" aria-live="polite">{lista.length} {lista.length === 1 ? "perfume" : "perfumes"}</p>}
      <div className="cat-grid">
        {lista.length === 0 && <p className="cat-empty">Nenhum perfume encontrado. Me chame no WhatsApp que eu te ajudo.</p>}
        {lista.map((p) => <CardProduto key={p.nome} produto={p} />)}
      </div>
    </>
  );
}
