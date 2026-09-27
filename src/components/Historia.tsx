import { linkWhats } from "@/data/contato";
import { IconeCoracao, IconeEstrela, IconeRelogio } from "./Icones";

const DIFERENCIAIS = [
  { icone: <IconeEstrela />, titulo: "Originais", texto: "Produtos oficiais Amakha Paris" },
  { icone: <IconeCoracao />, titulo: "Direto comigo", texto: "Atendimento pelo WhatsApp" },
  { icone: <IconeRelogio />, titulo: "Em mãos", texto: "Entrega em Brasília e Entorno" },
];

export default function Historia() {
  return (
    <section id="historia" className="section split">
      <div className="photo-wrap">
        {/* FOTO: Layon em atendimento. Coloque em public/layon.jpg e troque o <span> por <img src="/layon.jpg" alt="Layon Alves" /> */}
        <div className="photo ph" style={{ background: "#D8CFC4" }}><span className="mono">L</span></div>
        <div className="float-card glass" style={{ right: -32, bottom: -32 }}><div className="big">Premium</div><div className="small">Consultor executivo</div></div>
      </div>
      <div className="body">
        <div className="eyebrow">Nossa história</div>
        <h2 className="h2" style={{ marginBottom: 32 }}>Não vendo frasco.<br /><em>Vendo presença.</em></h2>
        <p>
          Eu sou o Layon, consultor executivo Amakha Paris aqui em Brasília. Você me chama no WhatsApp, me conta para quem é e do que a
          pessoa gosta, e eu separo as opções que combinam. Confirmo o estoque, combino o pagamento e entrego em mãos.
        </p>
        <p>Muita gente que ama perfume nunca pensou em vender. Se esse é o seu caso, tem espaço na minha equipe.</p>
        <div className="hr"></div>
        <div className="features">
          {DIFERENCIAIS.map((d) => (
            <div className="feat" key={d.titulo}>
              <div className="feat-ic" style={{ color: "#1A1A1A" }}>{d.icone}</div>
              <div className="feat-t">{d.titulo}</div>
              <div className="feat-d">{d.texto}</div>
            </div>
          ))}
        </div>
        <a className="btn btn-outline" href={linkWhats("Olá, Layon! Vim pelo site e quero escolher um perfume.")}>Escolher meu perfume</a>
      </div>
    </section>
  );
}
