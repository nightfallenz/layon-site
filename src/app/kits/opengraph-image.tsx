import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Kits completos Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Kits completos",
    titulo: "A fragrância",
    destaque: "completa",
    texto: "Perfume, body splash e hidratante da mesma fragrância, num só kit.",
    preco: "R$ 99,00",
    rotuloPreco: "A partir de",
    fotos: [163873, 162556, 161869],
  });
}
