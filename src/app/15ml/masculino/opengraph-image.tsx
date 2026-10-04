export const dynamic = "force-static";

import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Perfumes 15ml masculinos Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumes 15ml",
    titulo: "Masculinos",
    destaque: "15ml",
    texto: "Mais de 40 fragrâncias, cada uma com sua pirâmide olfativa.",
    preco: "R$ 45,00",
    rotuloPreco: "Cada perfume",
    fotos: [163285, 162369, 163249],
  });
}
