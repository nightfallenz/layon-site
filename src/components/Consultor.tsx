import { CADASTRO_CONSULTOR, linkWhats } from "@/data/contato";
import { IconeCheck } from "./Icones";

const O_QUE_VOCE_RECEBE = [
  "O passo a passo do cadastro ao primeiro pedido",
  "Acompanhamento direto comigo nas primeiras vendas",
  "Como apresentar os produtos e atender pelo WhatsApp",
  "Ajuda para montar o seu Instagram de vendas",
];

export default function Consultor() {
  return (
    <section id="consultor" className="section split consultor">
      <div className="body">
        <div className="eyebrow line">Seja consultor Amakha Paris</div>
        <h2 className="h2" style={{ marginBottom: 24 }}>Você já indica perfume.<br /><em>Que tal vender?</em></h2>
        <p>
          Toda vez que um amigo pergunta qual perfume você está usando, você está a um passo de vender. Faça o cadastro oficial na Amakha
          Paris, entre para a minha equipe e comece com um produto que as pessoas já querem.
        </p>
        <p style={{ marginBottom: 32 }}>Você não começa sozinho. Eu mostro o caminho que eu uso todo dia:</p>
        <ul className="perks">
          {O_QUE_VOCE_RECEBE.map((t) => <li key={t} style={{ color: "inherit" }}><span style={{ color: "#1A1A1A", display: "inline-flex" }}><IconeCheck /></span>{t}</li>)}
        </ul>
        <div className="actions">
          <a className="btn btn-primary" href={CADASTRO_CONSULTOR}>Quero entrar para a equipe</a>
          <a className="btn btn-outline" href={linkWhats("Olá, Layon! Tenho interesse em ser consultor e quero tirar dúvidas.")}>Tirar minhas dúvidas</a>
        </div>
        <p className="note">Os resultados variam conforme dedicação e estratégia. Não existe garantia de ganhos.</p>
      </div>
      <div className="photo-wrap" style={{ paddingLeft: 40 }}>
        {/* FOTO: Layon com a equipe ou com o kit de consultor */}
        <div className="photo ph" style={{ background: "#E4DDD3" }}><span className="mono">L</span></div>
        <div className="float-card glass" style={{ left: 0, bottom: 48 }}><div className="big">Equipe Layon</div><div className="small">Brasília e Entorno</div></div>
      </div>
    </section>
  );
}
