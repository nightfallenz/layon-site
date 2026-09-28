import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Linha Árabe Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Linha Árabe",
    titulo: "A opulência",
    destaque: "do Oriente",
    texto: "Oud, âmbar e rosas, com projeção generosa. Inclui originais importados.",
    preco: "R$ 45,00",
    rotuloPreco: "Perfume 15ml",
    fotos: [163483, 162175, 162236],
  });
}
