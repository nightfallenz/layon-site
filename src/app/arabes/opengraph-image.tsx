import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Linha Árabe Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Linha Árabe",
    titulo: "Intensos e",
    destaque: "inesquecíveis",
    texto: "Zaya, Al Sabah, Hasan Rose, Asadiyy, Malik Nuit e Hasan Black.",
    preco: "R$ 45,00",
    rotuloPreco: "Perfume 15ml",
    fotos: [163483, 162175, 162236],
  });
}
