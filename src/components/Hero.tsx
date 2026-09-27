import { imagem } from "@/lib/catalogo";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg ph has-img">
        {/* Para usar uma foto própria: coloque em public/hero.jpg e troque o src por "/hero.jpg" */}
        <img src={imagem(161862, "jpg", 900)} alt="Kit Premium 521 Vip Rosé Amakha Paris" fetchPriority="high" />
      </div>
      <div className="hero-fade"></div>
      <div className="hero-content">
        <div className="eyebrow line fu f1">Coleção 2026</div>
        <h1 className="fu f2">Perfumes que<br /><em>Deixam</em><br />Memória</h1>
        <p className="fu f3">
          Sabe quando alguém passa e você pergunta &quot;que perfume é esse?&quot;. É isso que eu vendo. Fragrâncias Amakha Paris de boa
          fixação, kits prontos para presentear e entrega em mãos em Brasília e Entorno.
        </p>
        <div className="actions fu f4">
          <a className="btn btn-primary" href="#kits">Ver os kits</a>
          <a className="btn btn-outline" href="#consultor">Quero ser consultor</a>
        </div>
        <div className="stats fu f5">
          <div><div className="stat-n">4</div><div className="stat-l">Kits completos</div></div>
          <div><div className="stat-n">15–100</div><div className="stat-l">Mililitros</div></div>
          <div><div className="stat-n">DF</div><div className="stat-l">Brasília e Entorno</div></div>
        </div>
      </div>
    </section>
  );
}
