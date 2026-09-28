import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Perfumes 100ml Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumes 100ml",
    titulo: "Para quem quer",
    destaque: "ser lembrado",
    texto: "Os 8 femininos e 8 masculinos mais pedidos, no frasco grande.",
    preco: "R$ 215,00",
    rotuloPreco: "Cada perfume",
    fotos: [163209, 163212, 163123],
  });
}
