"use client";
import { fichaDe, fotoDe, precoTexto, type Produto } from "@/lib/catalogo";
import { useLoja } from "./Loja";
import { GENERO } from "@/lib/produtos";
import BotaoComprar from "./BotaoComprar";
import { nomeVitrine } from "@/lib/nomes";
import { linkDe } from "@/lib/perfume";

export default function CardProduto({ produto }: { produto: Produto }) {
  const { abrirFicha } = useLoja();
  const f = fichaDe(produto);
  const abrir = () => abrirFicha(produto);
  const nome = nomeVitrine(produto);
  return (
    <article className="pcard">
      <a className="pimg" href={linkDe(produto)} aria-label={nome}>
        <img src={fotoDe(produto, 600)} srcSet={produto.foto ? undefined : `${fotoDe(produto, 400)} 400w, ${fotoDe(produto, 600)} 600w, ${fotoDe(produto, 900)} 900w, ${fotoDe(produto, 1200)} 1200w`} sizes="(max-width:760px) 46vw, (max-width:1100px) 31vw, 300px" alt={produto.original ? `${nome} ${produto.original}` : `${nome} Amakha Paris`} loading="lazy" onLoad={(e) => e.currentTarget.parentElement?.classList.add("carregou")} onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} width={400} height={400} />
        {produto.original ? <span className="tag tag-ouro">Original</span> : f?.intensidade && <span className="tag">{f.intensidade}</span>}
      </a>
      <div className="pbody">
        <div className="pfam">{[GENERO[produto.grupo], f ? f.estilo : produto.familia].filter(Boolean).join(" · ")}</div>
        <h3><a href={linkDe(produto)}>{nome}</a></h3>
        {produto.original ? (
          <div className="pinsp"><b>Original importado</b> · {produto.original}</div>
        ) : f && <div className="pinsp">Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>}
        <div className={produto.preco == null ? "pprice sem-preco" : "pprice"}>{precoTexto(produto.preco)}</div>
        <div className="pactions">
          {f && <button type="button" className="pnotes" onClick={abrir}>Ver notas</button>}
          <BotaoComprar produto={produto} />
        </div>
      </div>
    </article>
  );
}
