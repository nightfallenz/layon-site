export const dynamic = "force-static";

import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Perfumes 100ml Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumes 100ml",
    titulo: "O frasco",
    destaque: "de assinatura",
    texto: "As fragrâncias mais escolhidas, no formato para uso diário.",
    preco: "R$ 215,00",
    rotuloPreco: "Cada perfume",
    fotos: [163209, 163212, 163123],
  });
}
