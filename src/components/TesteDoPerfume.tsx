"use client";
// Seção "Descubra o Seu Perfume": 3 perguntas ou a busca por um perfume famoso.
import { useMemo, useState } from "react";
import { REFERENCIAS, porReferencia, recomendar, type Resposta } from "@/lib/catalogo";
import CardProduto from "./CardProduto";

type Opcao<T> = { valor: T; nome: string; dica?: string };

const PERGUNTAS = [
  {
    campo: "para", titulo: "Para quem é a fragrância?",
    opcoes: [{ valor: "F", nome: "Para ela" }, { valor: "M", nome: "Para ele" }],
  },
  {
    campo: "cheiro", titulo: "Qual acorde mais agrada?",
    opcoes: [
      { valor: "Adocicado", nome: "Gourmand", dica: "baunilha, caramelo, praliné" },
      { valor: "Floral", nome: "Floral", dica: "jasmim, rosa, flor de laranjeira" },
      { valor: "Frutal", nome: "Frutado", dica: "frutas vermelhas, pera, lichia" },
      { valor: "Refrescante", nome: "Fresco", dica: "cítricos, notas aquáticas" },
      { valor: "Amadeirado", nome: "Amadeirado", dica: "madeiras, couro, âmbar" },
    ],
  },
  {
    campo: "intensidade", titulo: "Que presença você deseja?",
    opcoes: [
      { valor: "Suave", nome: "Sutil", dica: "próximo à pele, para o dia" },
      { valor: "Moderado", nome: "Equilibrada", dica: "versátil, do dia à noite" },
      { valor: "Intenso", nome: "Marcante", dica: "rastro presente, para a noite" },
    ],
  },
] as const satisfies readonly { campo: keyof Resposta; titulo: string; opcoes: readonly Opcao<string>[] }[];

export default function TesteDoPerfume() {
  const [resp, setResp] = useState<Partial<Resposta>>({});
  const [ref, setRef] = useState("");

  const completo = resp.para && resp.cheiro && resp.intensidade;
  const porNome = useMemo(() => porReferencia(ref), [ref]);
  const sugestoes = useMemo(() => (completo ? recomendar(resp as Resposta) : []), [completo, resp]);

  let resultado = null;
  if (ref.trim().length >= 3) {
    resultado = porNome.length ? (
      <Resultado titulo="Na mesma família olfativa" texto={`Fragrâncias Amakha Paris que dialogam com ${ref.trim()}.`} lista={porNome} />
    ) : (
      <p style={{ color: "var(--muted)" }}>Esse clássico ainda não está no nosso guia. Fale com o Layon: ele indica a fragrância mais próxima.</p>
    );
  } else if (completo) {
    resultado = <Resultado titulo="Nossa seleção para você" texto="Toque na fragrância para conhecer a pirâmide olfativa. Se preferir, o Layon orienta a escolha pessoalmente." lista={sugestoes} />;
  }

  return (
    <section id="descubra" className="section cream center">
      <div className="eyebrow">Consultoria olfativa</div>
      <h2 className="h2">Descubra o Seu Perfume</h2>
      <p className="lead">Três perguntas para chegarmos às fragrâncias que combinam com você.</p>
      <form className="quiz" onSubmit={(e) => e.preventDefault()}>
        {PERGUNTAS.map((q, i) => (
          <fieldset className="q" key={q.campo}>
            <legend><small>{i + 1} de 3</small>{q.titulo}</legend>
            <div className="opts">
              {q.opcoes.map((o: Opcao<string>) => {
                const id = `q-${q.campo}-${o.valor}`;
                return (
                  <div className="opt" key={o.valor}>
                    <input
                      type="radio" name={q.campo} id={id} value={o.valor}
                      checked={resp[q.campo] === o.valor}
                      onChange={() => { setRef(""); setResp({ ...resp, [q.campo]: o.valor }); }}
                    />
                    <label htmlFor={id}>{o.nome}{o.dica && <small>{o.dica}</small>}</label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        ))}
        <div className="quiz-or">ou</div>
        <fieldset className="q" style={{ marginBottom: 0 }}>
          <legend>Ou parta de um clássico que você já ama</legend>
          <div className="ref-row">
            <label className="sr-only" htmlFor="q-ref">Perfume famoso</label>
            <input id="q-ref" className="search" type="search" placeholder="Ex.: La Vie Est Belle, Invictus, 212 VIP" autoComplete="off" list="refs" value={ref} onChange={(e) => setRef(e.target.value)} />
            <datalist id="refs">{REFERENCIAS.map((r) => <option key={r} value={r} />)}</datalist>
          </div>
        </fieldset>
        <div className="quiz-res" aria-live="polite">{resultado}</div>
      </form>
    </section>
  );
}

function Resultado({ titulo, texto, lista }: { titulo: string; texto: string; lista: ReturnType<typeof recomendar> }) {
  return (
    <>
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <div className="res-grid">{lista.map((p) => <CardProduto key={p.nome} produto={p} />)}</div>
    </>
  );
}
