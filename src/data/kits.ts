// Quais kits aparecem na página /kits e na vitrine da página inicial.
// Aqui ficam só os NOMES (iguais aos de produtos.json). O preço fica em produtos.json.
export type GrupoDeKits = { id: string; titulo: string; oQueVem: string; produtos: string[] };

export const KITS_3EM1: GrupoDeKits = {
  id: "3em1",
  titulo: "Kit 3 em 1",
  oQueVem: "Perfume 15ml, body splash 100ml e hidratante 80ml, reunidos em nécessaire.",
  produtos: ["Kit D com Nécessaire", "Kit GD com Nécessaire", "Kit Escandalosa com Nécessaire"],
};

export const KITS_2EM1: GrupoDeKits = {
  id: "2em1",
  titulo: "Kit 2 em 1",
  oQueVem: "Perfume 15ml e body splash 100ml, em caixa de presente.",
  produtos: [
    "Duo Fragrâncias D by Denise Lemos",
    "Duo Fragrâncias GD",
    "Duo Fragrâncias 521 Vip Rosé",
    "Duo Fragrâncias Zaya",
    "Duo Fragrâncias Hasan Rosé",
    "Duo Fragrâncias Al Sabah",
    "Duo Fragrâncias Imortal",
  ],
};

export const KITS_PREMIUM: GrupoDeKits = {
  id: "premium",
  titulo: "Kit Premium",
  oQueVem: "Perfume 100ml, perfume 15ml, body splash e hidratante, na caixa de assinatura.",
  produtos: ["Kit Premium Imortal", "Kit Premium 521 Vip Rosé", "Kit Premium GD", "Kit Premium D by Denise Lemos"],
};

/** Etiqueta que aparece em cima da foto na vitrine da página inicial */
export const ETIQUETA_VITRINE: Record<string, { texto: string; escura: boolean }> = {
  "Kit Premium Imortal": { texto: "Kit completo", escura: true },
  "Kit Premium 521 Vip Rosé": { texto: "Presente", escura: false },
  "Kit Premium GD": { texto: "Kit completo", escura: true },
  "Kit Premium D by Denise Lemos": { texto: "Presente", escura: false },
};
