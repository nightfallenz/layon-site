import { imagem } from "@/lib/catalogo";

// Atalhos da página inicial: cada cartão leva para uma página ou para o catálogo já filtrado.
const LINHAS: { titulo: string; texto: string; imagem: number; href: string }[] = [
  { titulo: "Perfumes 15ml", texto: "O formato que acompanha você o dia inteiro", imagem: 163231, href: "/15ml" },
  { titulo: "Perfumes 100ml", texto: "O frasco de assinatura", imagem: 163209, href: "/100ml" },
  { titulo: "Linha Árabe", texto: "Oud, âmbar e rosas de rastro prolongado", imagem: 162175, href: "/arabes" },
  { titulo: "Corpo e Cabelo", texto: "Body splash e cuidados para o ritual pós-banho", imagem: 162527, href: "/corpo" },
];

export default function CompraPor() {
  return (
    <section id="linhas" className="section cream center">
      <div className="eyebrow">Compre por</div>
      <h2 className="h2" style={{ marginBottom: 64 }}>Escolha a Sua <em>Coleção</em></h2>
      <div className="grid-linhas">
        {LINHAS.map((l) => (
          <a className="coll" href={l.href} key={l.titulo}>
            <div className="ph prod"><img src={imagem(l.imagem, "jpg", 900)} alt="" loading="lazy" /></div>
            <div className="coll-shade"></div>
            <div className="coll-txt"><h3>{l.titulo}</h3><div>{l.texto}</div><span>Explorar</span></div>
          </a>
        ))}
      </div>
      <a className="btn btn-outline" style={{ marginTop: 64 }} href="/catalogo">Ver o catálogo completo</a>
    </section>
  );
}
