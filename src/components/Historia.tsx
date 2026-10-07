import { linkWhats } from "@/data/contato";
import { IconeCoracao, IconeEstrela, IconeRelogio } from "./Icones";

const DIFERENCIAIS = [
  { icone: <IconeEstrela />, titulo: "Autênticos", texto: "Produtos oficiais Amakha Paris" },
  { icone: <IconeCoracao />, titulo: "Atendimento pessoal", texto: "Direto com o Layon, sem intermediários" },
  { icone: <IconeRelogio />, titulo: "Entrega por aplicativo", texto: "Brasília e Entorno, frete por conta do cliente" },
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
        <div className="eyebrow">O consultor</div>
        <h2 className="h2" style={{ marginBottom: 32 }}>Mais que um frasco.<br /><em>Uma presença.</em></h2>
        <p>
          Sou Layon Alves, consultor executivo Amakha Paris em Brasília. Meu trabalho começa antes da venda: entender para quem é a
          fragrância, em que momento será usada e que lembrança deve deixar. A partir daí, apresento poucas opções, bem escolhidas,
          e combino a entrega com você (Uber Flash ou 99Entrega, com frete por sua conta, ou retirada comigo).
        </p>
        <p>Para quem aprecia perfumaria e deseja transformar esse gosto em negócio, há espaço na equipe.</p>
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
        <a className="btn btn-outline" href={linkWhats("Olá, Layon. Gostaria de uma orientação para escolher um perfume.")}>Pedir uma orientação</a>
      </div>
    </section>
  );
}
