"use client";
import { fichaDe, imagem, precoTexto, type Produto } from "@/lib/catalogo";
import { useLoja } from "./Loja";
import { GENERO } from "@/lib/produtos";
import BotaoComprar from "./BotaoComprar";

export default function CardProduto({ produto }: { produto: Produto }) {
  const { abrirFicha } = useLoja();
  const f = fichaDe(produto);
  const abrir = () => abrirFicha(produto);
  return (
    <article className="pcard">
      <div
        className="pimg"
        {...(f && {
          role: "button",
          tabIndex: 0,
          "aria-label": `Ver notas de ${produto.nome}`,
          onClick: abrir,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
          },
        })}
      >
        <img src={imagem(produto.imagem, produto.ext)} alt={`${produto.nome} Amakha Paris`} loading="lazy" width={400} height={400} />
        {f?.intensidade && <span className="tag">{f.intensidade}</span>}
      </div>
      <div className="pbody">
        <div className="pfam">{[GENERO[produto.grupo], f ? f.estilo : produto.familia].filter(Boolean).join(" · ")}</div>
        <h3>{produto.nome}</h3>
        {f && <div className="pinsp">Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>}
        <div className="pprice">{precoTexto(produto.preco)}</div>
        <div className="pactions">
          {f && <button type="button" className="pnotes" onClick={abrir}>Ver notas</button>}
          <BotaoComprar produto={produto} />
        </div>
      </div>
    </article>
  );
}
