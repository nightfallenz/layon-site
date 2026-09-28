import type { Metadata } from "next";
import Pagina from "@/components/Pagina";
import { imagem, precoTexto } from "@/lib/catalogo";
import { pegar, perfumes15De } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Perfumes 15ml | Layon Alves Amakha Paris",
  description: "Fragrâncias femininas e masculinas em 15ml, com a pirâmide olfativa e o clássico que inspira cada uma.",
  openGraph: { title: "Perfumes 15ml | Layon Alves Amakha Paris", description: "Fragrâncias femininas e masculinas em 15ml, com a pirâmide olfativa e o clássico que inspira cada uma.", locale: "pt_BR", type: "website" },
};

// Os 3 frascos que aparecem na foto de cada cartão
const OPCOES = [
  { g: "F" as const, titulo: "Femininos", href: "/15ml/feminino", fotos: ["GD 15ml", "521 Vip Rosé 15ml", "D by Denise Lemos 15ml"], cta: "Explorar femininos" },
  { g: "M" as const, titulo: "Masculinos", href: "/15ml/masculino", fotos: ["AMK 15ml", "Imortal 15ml", "521 Vip Black 15ml"], cta: "Explorar masculinos" },
];

export default function Pagina15() {
  return (
    <Pagina
      sobretitulo="Perfumes 15ml"
      titulo={<>A Fragrância <em>que Acompanha</em></>}
      texto="O formato ideal para levar consigo e para conhecer novas assinaturas. Escolha a linha."
    >
      <section className="section center bloco">
        <div className="escolha-grid">
          {OPCOES.map((o) => {
            const lista = perfumes15De(o.g);
            return (
              <a className="escolha" href={o.href} key={o.g}>
                <div className="escolha-fotos">
                  {pegar(o.fotos).map((p) => <img key={p.nome} src={imagem(p.imagem, p.ext, 400)} alt="" loading="lazy" />)}
                </div>
                <div className="escolha-txt">
                  <div>
                    <h2>{o.titulo} 15ml</h2>
                    <p>{lista.length} fragrâncias</p>
                  </div>
                  <div className="preco-grande"><small>Cada</small>{precoTexto(lista[0]?.preco ?? null)}</div>
                  <div className="escolha-cta"><span>{o.cta}</span></div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Pagina>
  );
}
