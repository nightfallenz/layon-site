import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Perfumes 15ml Amakha Paris por R$ 45";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumes 15ml",
    titulo: "Cabe na bolsa,",
    destaque: "dura o dia",
    texto: "Femininos e masculinos, com o importado parecido e as notas de cada um.",
    preco: "R$ 45,00",
    rotuloPreco: "Cada perfume",
    fotos: [162355, 163231, 162369],
  });
}
