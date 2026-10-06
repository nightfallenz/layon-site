"use client";
// Botão do cartão e da ficha: "Adicionar ao carrinho" se tem preço, senão "Consultar no WhatsApp".
import { linkWhats, mensagemPedido } from "@/data/contato";
import type { Produto } from "@/lib/catalogo";
import { podeComprar } from "@/lib/carrinho";
import { useCarrinho } from "./Carrinho";
import { nomeVitrine } from "@/lib/nomes";

export default function BotaoComprar({ produto, grande = false }: { produto: Produto; grande?: boolean }) {
  const { adicionar } = useCarrinho();
  if (podeComprar(produto)) {
    return (
      <button type="button" className={grande ? "btn btn-primary" : "padd"} onClick={() => adicionar(produto)}>
        {grande ? "Adicionar à sacola" : <span>Adicionar à sacola</span>}
      </button>
    );
  }
  const href = linkWhats(mensagemPedido(nomeVitrine(produto)));
  return grande ? (
    <a className="btn btn-primary" href={href} target="_blank" rel="noopener">Perguntar no WhatsApp</a>
  ) : (
    <a href={href} target="_blank" rel="noopener"><span>Perguntar no WhatsApp</span></a>
  );
}
