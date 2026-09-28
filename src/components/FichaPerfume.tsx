"use client";
// Janela com a ficha do perfume: inspiração, estilo, intensidade, notas e parecidos.
import { useEffect, useRef } from "react";
import BotaoComprar from "./BotaoComprar";
import { nomeVitrine } from "@/lib/nomes";
import { fichaDe, fotoDe, parecidos, type Produto } from "@/lib/catalogo";

const NIVEL = { Suave: 1, Moderado: 2, Intenso: 3 } as const;

type Props = { produto: Produto | null; onTrocar: (p: Produto) => void; onFechar: () => void };

export default function FichaPerfume({ produto, onTrocar, onFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const f = produto ? fichaDe(produto) : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (f && !d.open) d.showModal();
    if (!f && d.open) d.close();
    if (f) d.scrollTop = 0;
  }, [f, produto]);

  const nivel = f?.intensidade ? NIVEL[f.intensidade] : 0;
  const outros = produto ? parecidos(produto) : [];

  return (
    <dialog
      className="ficha"
      ref={ref}
      aria-labelledby="ficha-t"
      onClose={onFechar}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      {produto && f && (
        <div className="ficha-in">
          <div className="ficha-img">
            <img src={fotoDe(produto, 600)} alt={`${nomeVitrine(produto)} ${produto.original ?? "Amakha Paris"}`} width={600} height={600} />
          </div>
          <div className="ficha-body">
            <button type="button" className="ficha-x" aria-label="Fechar" onClick={() => ref.current?.close()}>×</button>
            <div className="eyebrow">{produto.original ? `Original · ${produto.original}` : "Amakha Paris"}</div>
            <h3 id="ficha-t">{nomeVitrine(produto)}</h3>
            {produto.original ? (
              <div className="insp">Perfume <b>original importado</b>, 100ml. Quer o mesmo cheiro por menos? Veja a versão Amakha abaixo.</div>
            ) : (
              <div className="insp">Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>
            )}
            <div className="meta">
              <div>Estilo<strong>{f.estilo}</strong></div>
              {nivel > 0 && (
                <div>
                  Intensidade<strong>{f.intensidade}</strong>
                  <span className="bars" aria-hidden="true">{[1, 2, 3].map((i) => <i key={i} className={i <= nivel ? "on" : ""} />)}</span>
                </div>
              )}
            </div>
            <div className="pyr">
              <div><span>Topo</span>{f.topo.join(", ")}</div>
              <div><span>Coração</span>{f.coracao.join(", ")}</div>
              <div><span>Fundo</span>{f.fundo.join(", ")}</div>
            </div>
            {outros.length > 0 && (
              <div className="alike">
                <div className="alike-t">{produto.original ? "Versão Amakha e parecidos" : "Se gostou, experimente também"}</div>
                <div className="alike-l">
                  {outros.map((q) => (
                    <button type="button" key={q.nome} onClick={() => onTrocar(q)}>{nomeVitrine(q).replace(/\s*15ml$/i, "")}</button>
                  ))}
                </div>
              </div>
            )}
            <BotaoComprar produto={produto} grande />
          </div>
        </div>
      )}
    </dialog>
  );
}
