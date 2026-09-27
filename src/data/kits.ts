// Os 4 kits da seção "Kits em Destaque". A imagem é o id da foto no site da Amakha.
// preco: null mostra "Consulte o valor". Para mostrar preço, troque por um número (ex.: 289.9).
export type Kit = { nome: string; imagem: number; etiqueta: string; escura: boolean; preco: number | null };

export const KITS: Kit[] = [
  { nome: "Kit Premium Imortal", imagem: 161374, etiqueta: "Kit completo", escura: true, preco: null },
  { nome: "Kit Premium 521 Vip Rosé", imagem: 161862, etiqueta: "Presente", escura: false, preco: null },
  { nome: "Kit Premium GD", imagem: 162167, etiqueta: "Kit completo", escura: true, preco: null },
  { nome: "Kit Premium D by Denise Lemos", imagem: 161869, etiqueta: "Presente", escura: false, preco: null },
];
