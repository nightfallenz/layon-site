import Nevoa from "./Nevoa";
import Vitrine from "./Vitrine";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <Nevoa />
      <Vitrine />
      <div className="hero-content">
        <div className="eyebrow line fu f1">Perfumaria · Brasília</div>
        <h1 className="fu f2">Perfumes que<br /><em>Deixam</em><br />Memória</h1>
        <p className="fu f3">
          Fragrâncias escolhidas uma a uma e apresentadas com a atenção que um perfume merece. Da primeira conversa à entrega em
          suas mãos, em Brasília e Entorno.
        </p>
        <div className="actions fu f4">
          <a className="btn btn-primary" href="#catalogo">Conhecer a coleção</a>
          <a className="btn btn-outline" href="/kits">Kits completos</a>
        </div>
        <div className="stats fu f5">
          <div><div className="stat-n">100+</div><div className="stat-l">Fragrâncias</div></div>
          <div><div className="stat-n">Curadoria</div><div className="stat-l">Pessoal</div></div>
          <div><div className="stat-n">Em mãos</div><div className="stat-l">Brasília e Entorno</div></div>
        </div>
      </div>
    </section>
  );
}
