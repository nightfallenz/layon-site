import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Kits de presente Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Presentes",
    titulo: "O presente,",
    destaque: "já completo",
    texto: "Uma mesma fragrância em diferentes formas, apresentada em caixa.",
    preco: "R$ 99,00",
    rotuloPreco: "A partir de",
    fotos: [163873, 162556, 161869],
  });
}
