"use client";
import { FILTRO_INICIAL, imagem, type Filtro } from "@/lib/catalogo";
import { useLoja } from "./Loja";

// Com "pagina", o cartão abre a página da linha. Com "filtro", filtra o catálogo desta página.
const LINHAS: { titulo: string; texto: string; imagem: number; pagina?: string; filtro?: Partial<Filtro> }[] = [
  { titulo: "Perfumes 15ml", texto: "O formato que acompanha você o dia inteiro", imagem: 163231, pagina: "/15ml" },
  { titulo: "Perfumes 100ml", texto: "O frasco de assinatura", imagem: 163212, pagina: "/100ml" },
  { titulo: "Linha Árabe", texto: "Oud, âmbar e rosas de rastro prolongado", imagem: 162175, pagina: "/arabes" },
  { titulo: "Corpo e Cabelo", texto: "Body splash e cuidados para o ritual pós-banho", imagem: 162527, filtro: { grupo: "B" } },
];

export default function Linhas() {
  const { setFiltro } = useLoja();
  return (
    <section id="linhas" className="section cream center">
      <div className="eyebrow">Coleções</div>
      <h2 className="h2" style={{ marginBottom: 64 }}>As <em>Coleções</em></h2>
      <div className="grid-linhas">
        {LINHAS.map((l) => (
          <a
            className="coll"
            href={l.pagina ?? "#catalogo"}
            key={l.titulo}
            onClick={l.filtro ? () => setFiltro({ ...FILTRO_INICIAL, ...l.filtro }) : undefined}
          >
            <div className="ph prod"><img src={imagem(l.imagem, "jpg", 600)} alt="" loading="lazy" /></div>
            <div className="coll-shade"></div>
            <div className="coll-txt"><h3>{l.titulo}</h3><div>{l.texto}</div><span>Explorar</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}
