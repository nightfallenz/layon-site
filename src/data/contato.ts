// Tudo que é contato do Layon fica aqui. Mudou o número? Muda só neste arquivo.
export const WHATSAPP = "556195177575";
export const EMAIL = "layonnew29@gmail.com";
export const CADASTRO_CONSULTOR = "https://escritorio.amakhaparis.com.br/join/2176396";
export const REGIAO = "Brasília e Entorno";

/** Link do WhatsApp com a mensagem já escrita. */
export function linkWhats(mensagem?: string): string {
  const base = `https://wa.me/${WHATSAPP}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

/** Mensagem padrão de "Pedir no WhatsApp" de um produto. */
export const mensagemPedido = (produto: string) => `Olá, Layon. Tenho interesse em ${produto}. Poderia confirmar a disponibilidade?`;
