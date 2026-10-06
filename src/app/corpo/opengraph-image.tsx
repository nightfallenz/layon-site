export const dynamic = "force-static";

import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Corpo e cabelo Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Corpo e cabelo",
    titulo: "O ritual",
    destaque: "pós-banho",
    texto: "Body splash e cuidados que prolongam a fragrância na pele.",
    fotos: [162527, 162445, 156632],
  });
}
