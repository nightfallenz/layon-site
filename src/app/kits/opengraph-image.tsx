import { cartaz, TAMANHO } from "@/lib/cartaz";

export const size = TAMANHO;
export const contentType = "image/png";
export const alt = "Kits de presente Amakha Paris";

export default function Imagem() {
  return cartaz({
    sobre: "Kits de presente",
    titulo: "Presente pronto,",
    destaque: "sem erro",
    texto: "Kit 3 em 1, Kit 2 em 1 e Kit Premium. Tudo da mesma fragrância, já na caixa.",
    preco: "R$ 99,00",
    rotuloPreco: "A partir de",
    fotos: [163873, 162556, 161869],
  });
}
