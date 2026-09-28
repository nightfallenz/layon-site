// Nome de vitrine: o nome que o cliente vê. O nome original da Amakha continua em produtos.json
// (é ele que liga preço, ficha e carrinho); aqui só deixamos a apresentação mais limpa.
import type { Produto } from "./catalogo";

const REGRAS: [RegExp, string][] = [
  [/^Duo Fragrâncias (.+)$/, "Kit 2 em 1 · $1"],
  [/^Kit (.+) com Nécessaire$/, "Kit 3 em 1 · $1"],
  [/^Duo Layering (.+)$/, "Duo Layering · $1"],
  [/^Kit Premium (.+)$/, "Kit Premium · $1"],
  [/^Kit Perfumad[oa] (.+)$/, "Kit Perfumado · $1"],
  [/^Body Splash (.+?) 100ml$/, "Body Splash $1"],
  [/Hasan Rosé/g, "Hasan Rose"],
  [/^Kit D\b/, "Kit D by Denise Lemos"],
  [/· D$/, "· D by Denise Lemos"],
];

export function nomeVitrine(p: Produto | string): string {
  const nome = typeof p === "string" ? p : p.nome;
  const grupo = typeof p === "string" ? "" : p.grupo;
  let n = nome;
  for (const [re, troca] of REGRAS) n = n.replace(re, troca);
  // em perfume, "Feminino/Masculino" já aparece na etiqueta do card
  if ("FMU".includes(grupo) && grupo) n = n.replace(/\s(Feminino|Masculino)(?=\s|$)/, "");
  return n;
}
