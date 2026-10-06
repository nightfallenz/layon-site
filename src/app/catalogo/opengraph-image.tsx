export const dynamic = "force-static";

import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Catálogo completo Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Catálogo completo",
    titulo: "Encontre a sua",
    destaque: "assinatura",
    texto: "Perfumes, kits, body splash e cuidados Amakha Paris, com busca por nome, nota e clássico.",
    fotos: [163209, 163483, 161862],
  });
}
