import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Layon Alves, perfumes Amakha Paris em Brasília";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumaria em Brasília",
    titulo: "Perfumes que",
    destaque: "Deixam Memória",
    texto: "Kits para presente, perfumes 15ml e 100ml, Linha Árabe e entrega em mãos.",
    fotos: [161862],
  });
}
