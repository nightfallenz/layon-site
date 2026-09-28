import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Perfumes 15ml femininos Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumes 15ml",
    titulo: "Femininos",
    destaque: "15ml",
    texto: "Mais de 50 fragrâncias, cada uma com sua pirâmide olfativa.",
    preco: "R$ 45,00",
    rotuloPreco: "Cada perfume",
    fotos: [162355, 163231, 162295],
  });
}
