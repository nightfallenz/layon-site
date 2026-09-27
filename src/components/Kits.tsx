import { KITS } from "@/data/kits";
import { linkWhats, mensagemPedido } from "@/data/contato";
import { imagem, precoTexto } from "@/lib/catalogo";

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
        {KITS.map((k) => (
          <article className="card" key={k.nome}>
            <div className="card-img">
              <div className="ph prod"><img src={imagem(k.imagem, "jpg", 600)} alt={`${k.nome} Amakha Paris`} loading="lazy" /></div>
              <span className={`tag ${k.escura ? "dark" : "light"}`}>{k.etiqueta}</span>
              <div className="qv"><a href={linkWhats(mensagemPedido(k.nome))}>Quero este kit</a></div>
            </div>
            <h3>{k.nome}</h3>
            <div className="price">{precoTexto(k.preco)}</div>
          </article>
        ))}
      </div>
      <a className="btn btn-outline" style={{ marginTop: 64 }} href="#catalogo">Ver o catálogo completo</a>
    </section>
  );
}
