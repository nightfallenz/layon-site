import { CADASTRO_CONSULTOR, linkWhats } from "@/data/contato";
import { IconeCheck } from "./Icones";

const O_QUE_VOCE_RECEBE = [
  "Orientação do cadastro ao primeiro pedido",
  "Acompanhamento próximo nas primeiras vendas",
  "Método de apresentação e atendimento",
  "Apoio na construção do seu perfil de vendas",
];

export default function Consultor() {
  return (
    <section className="section split consultor">
      {/* o endereço /#consultor aponta para o texto (e não para a seção), para os botões aparecerem na tela */}
      <div className="body" id="consultor">
        <div className="eyebrow line">Seja consultor Amakha Paris</div>
        <h2 className="h2" style={{ marginBottom: 24 }}>Do gosto pela perfumaria<br /><em>a um negócio próprio.</em></h2>
        <p>
          Se você é quem os amigos consultam antes de escolher um perfume, esse olhar tem valor. Com o cadastro oficial Amakha Paris
          e o apoio da equipe, ele se transforma em atividade, com um produto que as pessoas já desejam.
        </p>
        <p style={{ marginBottom: 32 }}>O que a equipe oferece desde o início:</p>
        <ul className="perks">
          {O_QUE_VOCE_RECEBE.map((t) => <li key={t} style={{ color: "inherit" }}><span style={{ color: "#1A1A1A", display: "inline-flex" }}><IconeCheck /></span>{t}</li>)}
        </ul>
        <div className="actions">
          <a className="btn btn-primary" href={CADASTRO_CONSULTOR}>Fazer meu cadastro</a>
          <a className="btn btn-outline" href={linkWhats("Olá, Layon. Tenho interesse em fazer parte da equipe e gostaria de saber mais.")}>Conversar com o Layon</a>
        </div>
        <p className="note">Os resultados dependem de dedicação e estratégia; não há garantia de ganhos.</p>
      </div>
      <div className="photo-wrap" style={{ paddingLeft: 40 }}>
        {/* FOTO: Layon com a equipe ou com o kit de consultor */}
        <div className="photo ph" style={{ background: "#E4DDD3" }}><span className="mono">L</span></div>
        <div className="float-card glass" style={{ left: 0, bottom: 48 }}><div className="big">Equipe Layon</div><div className="small">Brasília e Entorno</div></div>
      </div>
    </section>
  );
}
