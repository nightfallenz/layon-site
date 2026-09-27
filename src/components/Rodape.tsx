import { CADASTRO_CONSULTOR, EMAIL, linkWhats } from "@/data/contato";
import { IconeWhats } from "./Icones";

export default function Rodape() {
  return (
    <>
      <footer className="footer">
        <div className="news center">
          <h3>Seja o Primeiro a Saber</h3>
          <p>Lançamentos e reposições chegam primeiro para quem está na lista. Poucas mensagens, só o que vale a pena.</p>
          <a className="btn btn-primary" href={linkWhats("Olá, Layon! Quero entrar na lista de novidades.")}>Entrar na lista</a>
        </div>
        <div className="fcols">
          <div className="fcol">
            <div className="logo">LAYON</div>
            <span style={{ lineHeight: 1.7, maxWidth: 300 }}>Perfumaria com atendimento pessoal. Consultor independente Amakha Paris em Brasília e Entorno.</span>
          </div>
          <div className="fcol"><div className="ttl">Comprar</div><a href="/kits">Kits completos</a><a href="/15ml">Perfumes 15ml</a><a href="/100ml">Perfumes 100ml</a><a href="/#catalogo">Catálogo completo</a></div>
          <div className="fcol"><div className="ttl">Presentes</div><a href="/kits">Kits em caixa</a><a href={linkWhats("Olá, Layon! Quero ajuda para escolher um presente.")}>Ajuda para escolher</a></div>
          <div className="fcol"><div className="ttl">Seja consultor</div><a href={CADASTRO_CONSULTOR}>Cadastro oficial</a><a href="/#consultor">Entrar para a equipe</a><a href={linkWhats("Olá, Layon! Quero tirar dúvidas sobre ser consultor.")}>Tirar dúvidas</a></div>
          <div className="fcol"><div className="ttl">Contato</div><a href={linkWhats()}>WhatsApp</a><a href={`mailto:${EMAIL}`}>E-mail</a><span>Entrega em Brasília e Entorno</span></div>
        </div>
        <div className="fbottom">
          <div>© {new Date().getFullYear()} Layon Alves. Consultor independente Amakha Paris.</div>
          <div>Revenda: resultados variam, sem garantia de ganhos.</div>
        </div>
      </footer>
      <a className="wa-float" href={linkWhats("Olá, Layon! Vim pelo site.")} aria-label="Falar com o Layon no WhatsApp"><IconeWhats tamanho={26} /></a>
    </>
  );
}
