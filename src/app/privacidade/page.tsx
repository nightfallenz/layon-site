import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import { EMAIL, REGIAO, linkWhats } from "@/data/contato";
import { SENTRY_DSN, SENTRY_DESDE } from "@/data/monitoramento";

export const metadata: Metadata = {
  title: "Política de Privacidade | Layon Alves Amakha Paris",
  description: "Como o atendimento do Layon Alves (Amakha Paris) usa os dados de quem fala pelo WhatsApp ou pelo site.",
  openGraph: { title: "Política de Privacidade | Layon Alves Amakha Paris", description: "Como usamos os dados de quem fala com a gente pelo WhatsApp ou pelo site.", locale: "pt_BR", type: "website" },
};

// com o monitoramento de erros ligado, a política ganha um parágrafo e a data passa a ser a do dia em que ligou
const ATUALIZADO = SENTRY_DSN && SENTRY_DESDE ? SENTRY_DESDE : "6 de outubro de 2026";

export default function PaginaPrivacidade() {
  return (
    <Pagina
      sobretitulo="Privacidade"
      titulo={<>Política de <em>Privacidade</em></>}
      texto={`Atualizada em ${ATUALIZADO}. Vale para o site layonamakhaparis.com.br e para o atendimento pelo WhatsApp de Layon Alves, consultor independente Amakha Paris em ${REGIAO}.`}
    >
      <Bloco titulo="Quem é o responsável">
        <p>Layon Alves, consultor independente Amakha Paris, é o responsável pelos dados tratados neste atendimento. Contato: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou <a href={linkWhats()}>WhatsApp</a>.</p>
      </Bloco>
      <Bloco titulo="Quais dados recebemos">
        <p>Quando você chama no WhatsApp, recebemos o seu número de telefone, o nome do seu perfil e o conteúdo das mensagens que você envia (texto, e dados que você mesmo informar, como endereço de entrega). No site, o carrinho guarda os itens no seu aparelho para montar o pedido; ele não cobra nada nem coleta pagamento.</p>
        {SENTRY_DSN && <p>Para encontrar e corrigir falhas do site, quando uma página dá erro o navegador envia ao serviço de monitoramento Sentry o tipo do erro, o endereço da página e o modelo do navegador e do aparelho. Não enviamos nome, telefone, IP, cookies nem o que você digita. Esse serviço pode processar os dados fora do Brasil.</p>}
      </Bloco>
      <Bloco titulo="Para que usamos">
        <p>Responder suas dúvidas, informar produtos e preços, combinar pedido e entrega, e avisar sobre lançamentos e reposições se você pediu para entrar na lista. Parte das respostas pode ser feita por um assistente automático; quando preciso, o Layon assume a conversa pessoalmente.</p>
      </Bloco>
      <Bloco titulo="Com quem compartilhamos">
        <p>Não vendemos seus dados. As mensagens passam pela plataforma WhatsApp (Meta) e por ferramentas de atendimento e de inteligência artificial usadas para ler e responder a conversa. Esses serviços só recebem o necessário para o atendimento. Também podemos compartilhar dados quando a lei exigir.</p>
      </Bloco>
      <Bloco titulo="Quanto tempo guardamos">
        <p>Guardamos a conversa pelo tempo necessário para atender você e para o histórico do pedido. Depois disso, apagamos ou deixamos de usar.</p>
      </Bloco>
      <Bloco titulo="Seus direitos">
        <p>Você pode pedir acesso, correção ou exclusão dos seus dados, e pedir para sair da lista de avisos a qualquer momento, como prevê a Lei Geral de Proteção de Dados (LGPD). Basta escrever para <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou mandar uma mensagem pelo WhatsApp com o pedido de exclusão. Respondemos em até 15 dias.</p>
      </Bloco>
      <Bloco titulo="Mudanças">
        <p>Se esta política mudar, a data no topo desta página muda junto.</p>
      </Bloco>
    </Pagina>
  );
}
