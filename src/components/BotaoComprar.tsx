"use client";
// Botão do cartão e da ficha: "Adicionar ao carrinho" se tem preço, senão "Consultar no WhatsApp".
import { linkWhats, mensagemPedido } from "@/data/contato";
import type { Produto } from "@/lib/catalogo";
import { podeComprar } from "@/lib/carrinho";
import { useCarrinho } from "./Carrinho";

export default function BotaoComprar({ produto, grande = false }: { produto: Produto; grande?: boolean }) {
  const { adicionar } = useCarrinho();
  if (podeComprar(produto)) {
    return (
      <button type="button" className={grande ? "btn btn-primary" : "padd"} onClick={() => adicionar(produto)}>
        {grande ? "Adicionar ao carrinho" : <span>Adicionar ao carrinho</span>}
      </button>
    );
  }
  const href = linkWhats(mensagemPedido(produto.nome));
  return grande ? (
    <a className="btn btn-primary" href={href} target="_blank" rel="noopener">Consultar no WhatsApp</a>
  ) : (
    <a href={href} target="_blank" rel="noopener"><span>Consultar no WhatsApp</span></a>
  );
}
