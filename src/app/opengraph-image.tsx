export const dynamic = "force-static";

import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Layon Alves, perfumes Amakha Paris em Brasília";

export default function Imagem() {
  return cartaz({
    sobre: "Perfumaria em Brasília",
    titulo: "Perfumes que",
    destaque: "Deixam Memória",
    texto: "Curadoria pessoal de fragrâncias, kits completos e entrega por aplicativo.",
    fotos: [163123, 163209, 163212],
  });
}
