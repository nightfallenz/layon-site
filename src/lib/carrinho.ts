// Regras do carrinho: o que fica guardado, total e a mensagem que vai para o WhatsApp.
// O carrinho guarda só NOME e QUANTIDADE. O preço vem sempre de produtos.json,
// então se o Layon mudar um preço, quem já tinha o item no carrinho vê o valor novo.
import { PRODUTOS, precoTexto, type Produto } from "./catalogo";
import { nomeVitrine } from "./nomes";

export type ItemGuardado = { nome: string; qtd: number };
export type Item = { produto: Produto; qtd: number; subtotal: number };
export type DadosPedido = {
  nome: string;
  entrega: "entrega" | "retirada";
  local: string;
  pagamento: string;
  obs: string;
  presente: boolean;
  cartaoDe: string;
  cartaoPara: string;
  cartaoMsg: string;
};

export const QTD_MAX = 20;
export const PAGAMENTOS = ["Pix", "Cartão", "Dinheiro"] as const;

/** Só entra no carrinho produto com preço. */
export const podeComprar = (p: Produto) => p.preco != null;

export function montarItens(guardados: ItemGuardado[]): Item[] {
  const itens: Item[] = [];
  for (const g of guardados) {
    const produto = PRODUTOS.find((p) => p.nome === g.nome);
    if (!produto || !podeComprar(produto)) continue;
    const qtd = Math.min(Math.max(1, Math.floor(g.qtd)), QTD_MAX);
    itens.push({ produto, qtd, subtotal: qtd * (produto.preco as number) });
  }
  return itens;
}

export const totalDe = (itens: Item[]) => itens.reduce((s, i) => s + i.subtotal, 0);
export const quantidadeDe = (itens: Item[]) => itens.reduce((s, i) => s + i.qtd, 0);

export function mensagemDoPedido(itens: Item[], d: DadosPedido): string {
  const linhas = [
    "Olá, Layon! Quero fazer este pedido pelo site:",
    "",
    ...itens.map((i) => `• ${i.qtd}x ${nomeVitrine(i.produto)} — ${precoTexto(i.subtotal)}`),
    "",
    `*Total: ${precoTexto(totalDe(itens))}*`,
    "",
  ];
  if (d.nome.trim()) linhas.push(`Nome: ${d.nome.trim()}`);
  linhas.push(d.entrega === "entrega" ? `Entrega em: ${d.local.trim() || "(vou informar)"}` : "Vou retirar com você");
  if (d.pagamento) linhas.push(`Pagamento: ${d.pagamento}`);
  if (d.obs.trim()) linhas.push(`Observação: ${d.obs.trim()}`);
  if (d.presente) {
    linhas.push("", "*É para presente* (quero embalado)");
    const cartao = [
      d.cartaoPara.trim() && `Para: ${d.cartaoPara.trim()}`,
      d.cartaoDe.trim() && `De: ${d.cartaoDe.trim()}`,
      d.cartaoMsg.trim() && `Mensagem do cartão: "${d.cartaoMsg.trim()}"`,
    ].filter(Boolean) as string[];
    linhas.push(...cartao);
  }
  linhas.push("", "Pode confirmar se tem tudo disponível?");
  return linhas.join("\n");
}
