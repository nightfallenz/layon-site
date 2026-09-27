"use client";
// Seção "Descubra o Seu Perfume": 3 perguntas ou a busca por um perfume famoso.
import { useMemo, useState } from "react";
import { REFERENCIAS, porReferencia, recomendar, type Resposta } from "@/lib/catalogo";
import CardProduto from "./CardProduto";

type Opcao<T> = { valor: T; nome: string; dica?: string };

const PERGUNTAS = [
  {
    campo: "para", titulo: "É para quem?",
    opcoes: [{ valor: "F", nome: "Para ela" }, { valor: "M", nome: "Para ele" }],
  },
  {
    campo: "cheiro", titulo: "Que tipo de cheiro te conquista?",
    opcoes: [
      { valor: "Adocicado", nome: "Doce", dica: "baunilha, caramelo" },
      { valor: "Floral", nome: "Floral", dica: "jasmim, rosa" },
      { valor: "Frutal", nome: "Frutado", dica: "frutas vermelhas, pera" },
      { valor: "Refrescante", nome: "Fresco", dica: "cítrico, marinho" },
      { valor: "Amadeirado", nome: "Marcante", dica: "madeiras, couro" },
    ],
  },
  {
    campo: "intensidade", titulo: "Quanto você quer que ele apareça?",
    opcoes: [
      { valor: "Suave", nome: "Discreto", dica: "trabalho, dia a dia" },
      { valor: "Moderado", nome: "Na medida", dica: "vai bem em tudo" },
      { valor: "Intenso", nome: "Que todo mundo sinta", dica: "noite, festa" },
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
      <Resultado titulo={porNome.length === 1 ? "Achei o seu" : "Achei estes"} texto={`Perfumes Amakha Paris na mesma linha de cheiro de "${ref.trim()}".`} lista={porNome} />
    ) : (
      <p style={{ color: "var(--muted)" }}>Não achei esse na lista. Me chama no WhatsApp que eu te indico o mais parecido.</p>
    );
  } else if (completo) {
    resultado = <Resultado titulo="Seus 3 perfumes" texto="Clique na foto para ver as notas. Quer sentir antes? Me chama que eu te ajudo a escolher." lista={sugestoes} />;
  }

  return (
    <section id="descubra" className="section cream center">
      <div className="eyebrow">Teste rápido</div>
      <h2 className="h2">Descubra o Seu Perfume</h2>
      <p className="lead">Três perguntas e eu te mostro os perfumes que mais combinam com você. Leva 20 segundos.</p>
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
          <legend>Já tem um perfume famoso que você ama?</legend>
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
