"use client";
import { fichaDe, fotoDe, precoTexto, type Produto } from "@/lib/catalogo";
import { useLoja } from "./Loja";
import { GENERO } from "@/lib/produtos";
import BotaoComprar from "./BotaoComprar";
import { nomeVitrine } from "@/lib/nomes";

export default function CardProduto({ produto }: { produto: Produto }) {
  const { abrirFicha } = useLoja();
  const f = fichaDe(produto);
  const abrir = () => abrirFicha(produto);
  const nome = nomeVitrine(produto);
  return (
    <article className="pcard">
      <div
        className="pimg"
        {...(f && {
          role: "button",
          tabIndex: 0,
          "aria-label": `Ver notas de ${nome}`,
          onClick: abrir,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
          },
        })}
      >
        <img src={fotoDe(produto)} alt={produto.original ? `${nome} ${produto.original}` : `${nome} Amakha Paris`} loading="lazy" width={400} height={400} />
        {produto.original ? <span className="tag tag-ouro">Original</span> : f?.intensidade && <span className="tag">{f.intensidade}</span>}
      </div>
      <div className="pbody">
        <div className="pfam">{[GENERO[produto.grupo], f ? f.estilo : produto.familia].filter(Boolean).join(" · ")}</div>
        <h3>{nome}</h3>
        {produto.original ? (
          <div className="pinsp"><b>Original importado</b> · {produto.original}</div>
        ) : f && <div className="pinsp">Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>}
        <div className="pprice">{precoTexto(produto.preco)}</div>
        <div className="pactions">
          {f && <button type="button" className="pnotes" onClick={abrir}>Ver notas</button>}
          <BotaoComprar produto={produto} />
        </div>
      </div>
    </article>
  );
}
