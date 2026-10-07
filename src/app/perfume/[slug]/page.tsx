// Página de cada produto (/perfume/nome-do-produto). É gerada para todos os itens de produtos.json.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Rodape from "@/components/Rodape";
import Loja from "@/components/Loja";
import CardProduto from "@/components/CardProduto";
import BotaoComprar from "@/components/BotaoComprar";
import { PRODUTOS, fotoDe, parecidos, precoTexto } from "@/lib/catalogo";
import { GENERO } from "@/lib/produtos";
import { nomeVitrine } from "@/lib/nomes";
import { conteudoDoKit, descricaoDe, fichaCompleta, fragranciaDoKit, familiaDaNota, linkDe, ml, produtoPorSlug, slugDe, tamanhosDe } from "@/lib/perfume";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: slugDe(p) }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = produtoPorSlug((await params).slug);
  if (!p) return {};
  const f = fichaCompleta(p);
  const titulo = `${nomeVitrine(p)} | Layon Alves Amakha Paris`;
  const desc = f ? descricaoDe(p, f) : `${nomeVitrine(p)} Amakha Paris, com entrega por Uber Flash ou 99Entrega em Brasília e Entorno.`;
  return { title: titulo, description: desc, openGraph: { title: titulo, description: desc, images: [fotoDe(p, 800)], locale: "pt_BR", type: "website" } };
}

const CATEGORIA: Record<string, [string, string]> = {
  F: ["Femininos", "/15ml/feminino"], M: ["Masculinos", "/15ml/masculino"], U: ["Unissex", "/catalogo"],
  K: ["Kits completos", "/kits"], B: ["Body splash", "/corpo#body-splash"], C: ["Corpo e cabelo", "/corpo#corpo-cabelo"],
};
const NIVEL = { Suave: 1, Moderado: 2, Intenso: 3 } as const;

export default async function PaginaPerfume({ params }: P) {
  const p = produtoPorSlug((await params).slug);
  if (!p) notFound();
  const f = fichaCompleta(p);
  const fragrancia = fragranciaDoKit(p);
  const conteudo = conteudoDoKit(p);
  const nome = nomeVitrine(p);
  const tamanhos = tamanhosDe(p);
  const [cat, catHref] = CATEGORIA[p.grupo] ?? ["Catálogo", "/catalogo"];
  const outros = parecidos(fragrancia ?? p, 4);
  const nivel = f?.intensidade ? NIVEL[f.intensidade] : 0;
  const notas = f ? [...f.topo, ...f.coracao, ...f.fundo] : [];
  const familias = notas.filter((n, i) => notas.findIndex((m) => familiaDaNota(m).id === familiaDaNota(n).id) === i).slice(0, 5);

  return (
    <>
      <Nav />
      <main>
        <Loja>
          <section className="pp">
            <div className="pp-foto">
              {tamanhos.length > 1 && (
                <div className="pp-miniaturas">
                  {tamanhos.map((t) => (
                    <a key={t.nome} href={linkDe(t)} className={t.nome === p.nome ? "on" : ""} aria-label={nomeVitrine(t)}>
                      <img src={fotoDe(t, 200)} alt="" />
                    </a>
                  ))}
                </div>
              )}
              <img className="pp-img" src={fotoDe(p, 1200)} alt={`${nome} ${p.original ?? "Amakha Paris"}`} width={1000} height={1000} fetchPriority="high" />
            </div>

            <div className="pp-info">
              <nav className="pp-trilha" aria-label="Você está em">
                <a href="/">Início</a><span>/</span><a href={catHref}>{cat}</a>
              </nav>
              <div className="eyebrow pp-anim" style={{ ["--d" as string]: "0ms" }}>
                {p.original ? `Original importado · ${p.original}` : `Amakha Paris${GENERO[p.grupo] ? ` · ${GENERO[p.grupo]}` : ""}`}
              </div>
              <h1 className="pp-nome pp-anim" style={{ ["--d" as string]: "60ms" }}>{nome}</h1>
              {f && !p.original && <div className="pp-insp pp-anim" style={{ ["--d" as string]: "120ms" }}>Inspirado em <b>{f.inspiradoEm}</b> · {f.marca}</div>}

              <div className="pp-preco pp-anim" style={{ ["--d" as string]: "160ms" }}>{precoTexto(p.preco)}</div>

              {f && (
                <>
                  <p className="pp-desc pp-anim" style={{ ["--d" as string]: "200ms" }}>{descricaoDe(p, f)}</p>
                  {conteudo.length > 0 && (
                    <div className="pp-kit pp-anim" style={{ ["--d" as string]: "220ms" }}>
                      <span className="pp-kit-tit">O que vem no kit</span>
                      <ul>
                        {conteudo.map(([item, qtd]) => <li key={item}><span>{item}</span>{qtd && <span className="pp-kit-ml">{qtd}</span>}</li>)}
                      </ul>
                      <small>Todos na mesma fragrância, para a perfumação durar do banho à noite.</small>
                    </div>
                  )}
                  <div className="meta pp-anim" style={{ ["--d" as string]: "240ms" }}>
                    <div>Estilo<strong>{f.estilo}</strong></div>
                    {nivel > 0 && (
                      <div>Intensidade<strong>{f.intensidade}</strong>
                        <span className="bars" aria-hidden="true">{[1, 2, 3].map((i) => <i key={i} className={i <= nivel ? "on" : ""} />)}</span>
                      </div>
                    )}
                  </div>
                  <ul className="pp-familias pp-anim" style={{ ["--d" as string]: "280ms" }} aria-label="Famílias olfativas">
                    {familias.map((n) => {
                      const fam = familiaDaNota(n);
                      return <li key={n}><i style={{ background: fam.cor }} aria-hidden="true" /><small>{fam.nome}</small></li>;
                    })}
                  </ul>
                  <div className="pyr pp-anim" style={{ ["--d" as string]: "320ms" }}>
                    <div><span>Topo</span>{f.topo.join(", ")}</div>
                    <div><span>Coração</span>{f.coracao.join(", ")}</div>
                    <div><span>Fundo</span>{f.fundo.join(", ")}</div>
                  </div>
                </>
              )}

              <div className="pp-compra pp-anim" style={{ ["--d" as string]: "360ms" }}>
                {tamanhos.length > 1 && (
                  <div className="pp-tam" role="group" aria-label="Tamanho">
                    <span>Tamanho</span>
                    {tamanhos.map((t) => (
                      <a key={t.nome} href={linkDe(t)} className={t.nome === p.nome ? "on" : ""} aria-current={t.nome === p.nome ? "page" : undefined}>{ml(t)}ml</a>
                    ))}
                  </div>
                )}
                <BotaoComprar produto={p} grande />
                {fragrancia && (
                  <a className="pp-sozinho" href={linkDe(fragrancia)}>Prefere só o perfume? Ver {nomeVitrine(fragrancia).replace(/ 15ml$/, "")} →</a>
                )}
              </div>
              {f && !p.original && (
                <p className="pp-legal">A referência indica apenas a família olfativa. Produto Amakha Paris, sem vínculo com a marca citada.</p>
              )}
            </div>
          </section>

          {outros.length > 0 && (
            <section className="section center pp-similares">
              <div className="eyebrow">{p.original ? "Versão Amakha e afins" : fragrancia ? "Se você gosta desta fragrância" : "Da mesma família olfativa"}</div>
              <h2 className="h2">Você Também <em>Vai Gostar</em></h2>
              <div className="cat-grid" style={{ marginTop: 40 }}>
                {outros.map((q) => <CardProduto key={q.nome} produto={q} />)}
              </div>
            </section>
          )}
        </Loja>
      </main>
      <Rodape />
    </>
  );
}
