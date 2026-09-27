// Vitrine de kits na página inicial. A lista completa fica em /kits.
import { ETIQUETA_VITRINE, KITS_PREMIUM } from "@/data/kits";
import { linkWhats, mensagemPedido } from "@/data/contato";
import { imagem, precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";

export default function Kits() {
  return (
    <section id="kits" className="section cream center">
      <div className="eyebrow">O presente certo</div>
      <h2 className="h2">Kits em Destaque</h2>
      <p className="lead">
        Perfume 100ml, perfume 15ml, body splash e hidratante da mesma fragrância, numa caixa só. Você não precisa montar nada: é só
        entregar e ver a reação.
      </p>
      <div className="grid4">
        {pegar(KITS_PREMIUM.produtos).map((k) => {
          const etiqueta = ETIQUETA_VITRINE[k.nome] ?? { texto: "Kit", escura: true };
          return (
            <article className="card" key={k.nome}>
              <div className="card-img">
                <div className="ph prod"><img src={imagem(k.imagem, k.ext, 600)} alt={`${k.nome} Amakha Paris`} loading="lazy" /></div>
                <span className={`tag ${etiqueta.escura ? "dark" : "light"}`}>{etiqueta.texto}</span>
                <div className="qv"><a href={linkWhats(mensagemPedido(k.nome))}>Quero este kit</a></div>
              </div>
              <h3>{k.nome}</h3>
              <div className="price">{precoTexto(k.preco)}</div>
            </article>
          );
        })}
      </div>
      <a className="btn btn-outline" style={{ marginTop: 64 }} href="/kits">Ver todos os kits</a>
    </section>
  );
}
