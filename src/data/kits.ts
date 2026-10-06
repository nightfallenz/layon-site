// Quais kits aparecem na página /kits e na vitrine da página inicial (os Premium).
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
  oQueVem: "Perfume 15ml e body splash 100ml, na caixa.",
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
  oQueVem: "Perfume 100ml, perfume 15ml, body splash 100ml e hidratante corporal 80ml, na caixa de assinatura.",
  produtos: ["Kit Premium Athena", "Kit Premium Imortal", "Kit Premium 521 Vip Rosé", "Kit Premium D by Denise Lemos", "Kit Premium Escandalosa", "Kit Premium GD"],
};
