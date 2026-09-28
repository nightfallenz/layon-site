"use client";
// Janela com a ficha do perfume: inspiração, estilo, intensidade, notas e parecidos.
import { useEffect, useRef } from "react";
import BotaoComprar from "./BotaoComprar";
import { fichaDe, imagem, parecidos, type Produto } from "@/lib/catalogo";

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
            <img src={imagem(produto.imagem, produto.ext, 600)} alt={`${produto.nome} Amakha Paris`} width={600} height={600} />
          </div>
          <div className="ficha-body">
            <button type="button" className="ficha-x" aria-label="Fechar" onClick={() => ref.current?.close()}>×</button>
            <div className="eyebrow">Amakha Paris</div>
            <h3 id="ficha-t">{produto.nome}</h3>
            <div className="insp">Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>
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
                <div className="alike-t">Se gostou, experimente também</div>
                <div className="alike-l">
                  {outros.map((q) => (
                    <button type="button" key={q.nome} onClick={() => onTrocar(q)}>{q.nome.replace(/\s*15ml$/i, "")}</button>
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
