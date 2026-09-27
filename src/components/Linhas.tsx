"use client";
import { FILTRO_INICIAL, imagem, type Filtro } from "@/lib/catalogo";
import { useLoja } from "./Loja";

const LINHAS: { titulo: string; texto: string; imagem: number; filtro: Partial<Filtro> }[] = [
  { titulo: "Perfumes 15ml", texto: "Cabe na bolsa e vai com você o dia todo", imagem: 163231, filtro: { tamanho: "15" } },
  { titulo: "Perfumes 100ml", texto: "Para quem quer ser lembrado", imagem: 163212, filtro: { tamanho: "100" } },
  { titulo: "Corpo e Cabelo", texto: "Body splash e capilar para o ritual pós-banho", imagem: 162527, filtro: { grupo: "B" } },
];

export default function Linhas() {
  const { setFiltro } = useLoja();
  return (
    <section id="linhas" className="section cream center">
      <div className="eyebrow">Explore</div>
      <h2 className="h2" style={{ marginBottom: 64 }}>Nossas Linhas</h2>
      <div className="grid3">
        {LINHAS.map((l) => (
          <a className="coll" href="#catalogo" key={l.titulo} onClick={() => setFiltro({ ...FILTRO_INICIAL, ...l.filtro })}>
            <div className="ph prod"><img src={imagem(l.imagem, "jpg", 600)} alt="" loading="lazy" /></div>
            <div className="coll-shade"></div>
            <div className="coll-txt"><h3>{l.titulo}</h3><div>{l.texto}</div><span>Explorar</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}
