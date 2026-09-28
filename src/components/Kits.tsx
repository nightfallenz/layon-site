// Vitrine de kits na página inicial. A lista completa fica em /kits.
import { ETIQUETA_VITRINE, KITS_PREMIUM } from "@/data/kits";
import { linkWhats, mensagemPedido } from "@/data/contato";
import { imagem, precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";
import { nomeVitrine } from "@/lib/nomes";

export default function Kits() {
  return (
    <section id="kits" className="section cream center">
      <div className="eyebrow">A arte de presentear</div>
      <h2 className="h2">Presentes de <em>Assinatura</em></h2>
      <p className="lead">
        Uma mesma fragrância em todas as suas formas, do perfume ao hidratante, reunida numa caixa pronta para ser entregue. O
        gesto já chega completo.
      </p>
      <div className="grid4">
        {pegar(KITS_PREMIUM.produtos).map((k) => {
          const etiqueta = ETIQUETA_VITRINE[k.nome] ?? { texto: "Kit", escura: true };
          return (
            <article className="card" key={k.nome}>
              <div className="card-img">
                <div className="ph prod"><img src={imagem(k.imagem, k.ext, 600)} alt={`${nomeVitrine(k)} Amakha Paris`} loading="lazy" /></div>
                <span className={`tag ${etiqueta.escura ? "dark" : "light"}`}>{etiqueta.texto}</span>
                <div className="qv"><a href={linkWhats(mensagemPedido(nomeVitrine(k)))}>Solicitar</a></div>
              </div>
              <h3>{nomeVitrine(k)}</h3>
              <div className="price">{precoTexto(k.preco)}</div>
            </article>
          );
        })}
      </div>
      <a className="btn btn-outline" style={{ marginTop: 64 }} href="/kits">Todos os presentes</a>
    </section>
  );
}
