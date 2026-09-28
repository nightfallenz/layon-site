// Tudo que a página de cada produto precisa: endereço (slug), tamanhos irmãos, descrição e notas.
import { PRODUTOS, fichaDe, normalizar, type Ficha, type Produto } from "./catalogo";

export const slugDe = (p: Produto | string) =>
  normalizar(typeof p === "string" ? p : p.nome).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const linkDe = (p: Produto) => `/perfume/${slugDe(p)}`;

const PORSLUG = new Map(PRODUTOS.map((p) => [slugDe(p), p]));
export const produtoPorSlug = (s: string) => PORSLUG.get(s) ?? null;

/** O mesmo perfume em outros tamanhos (15ml e 100ml da mesma ficha, sem body splash nem kit). */
export function tamanhosDe(p: Produto): Produto[] {
  if (!p.ficha || !"FMU".includes(p.grupo)) return [p];
  const lista = PRODUTOS.filter((q) => q.ficha === p.ficha && "FMU".includes(q.grupo) && !!q.original === !!p.original);
  return lista.sort((a, b) => ml(a) - ml(b));
}
export const ml = (p: Produto) => Number(p.nome.match(/(\d+)\s*ml/i)?.[1] ?? 0);

// ---- famílias de notas (para os ícones e a busca por notas) ----
export type Familia = { id: string; nome: string; cor: string; palavras: string[] };
export const FAMILIAS: Familia[] = [
  { id: "floral", nome: "Florais", cor: "#E8C9CF", palavras: ["jasmim", "rosa", "flor", "lirio", "tuberosa", "gardenia", "peonia", "orquidea", "violeta", "iris", "ylang", "magnolia", "fresia", "jacinto", "madressilva", "heliotropio", "mimosa", "narciso", "lotus", "camelia", "geranio", "champaca", "neroli", "lavanda", "orris", "campanula", "pelargonium", "espinheiro", "acacia", "cravo"] },
  { id: "frutado", nome: "Frutados", cor: "#F0D2B8", palavras: ["fruta", "maca", "pera", "pessego", "ameixa", "cassis", "framboesa", "lichia", "morango", "maracuja", "manga", "abacaxi", "coco", "melao", "kiwi", "roma", "groselha", "damasco", "amora", "oxicoco", "caqui", "marmelo", "bagas", "champanhe", "rum", "whiskey", "vodka", "gin"] },
  { id: "citrico", nome: "Cítricos", cor: "#F3E6B3", palavras: ["bergamota", "limao", "laranja", "tangerina", "mandarina", "toranja", "lima", "pomelo", "citric", "mexerica", "petitgrain"] },
  { id: "especiado", nome: "Especiarias", cor: "#E2C4A8", palavras: ["pimenta", "canela", "cardamomo", "noz-moscada", "gengibre", "acafrao", "anis", "coentro", "especia", "alcaravia", "tomilho"] },
  { id: "gourmand", nome: "Gourmand", cor: "#E9D9C3", palavras: ["baunilha", "caramelo", "praline", "chocolate", "cacau", "cafe", "mel", "acucar", "amendoa", "algodao", "tonka", "doce de leite", "leite", "castanha", "avela", "cupcake", "cera de abelha", "gourmand", "alcacuz"] },
  { id: "amadeirado", nome: "Madeiras", cor: "#D6C8B8", palavras: ["cedro", "sandalo", "vetiver", "patchouli", "madeira", "oud", "guaiac", "mogno", "ebano", "jacaranda", "teca", "sequoia", "vidoeiro", "pau-brasil", "musgo", "amadeirad", "cashmere", "oliveira", "agarwood", "rastejador"] },
  { id: "ambarado", nome: "Âmbar e resinas", cor: "#E4CFA9", palavras: ["ambar", "almiscar", "incenso", "benjoim", "ladano", "opoponax", "ambroxan", "couro", "tabaco", "olibano", "elemi", "balsamo", "resina", "civeta", "camurca", "cumarina", "ambreta", "iso e super"] },
  { id: "verde", nome: "Verdes e aromáticos", cor: "#CFDCC6", palavras: ["hortela", "salvia", "manjericao", "alecrim", "zimbro", "junipero", "artemisia", "verde", "grama", "folha", "pinheiro", "erva", "absinto", "tagetes", "bambu", "pepino", "hera", "ruibarbo", "camomila", "louro", "cactus"] },
  { id: "aquatico", nome: "Aquáticos e frescos", cor: "#CFDDE6", palavras: ["aquatic", "oceanic", "marinh", "sal", "ozonic", "calone", "aldeido", "metalic", "terrosa"] },
];
const OUTRAS: Familia = { id: "outras", nome: "Outras", cor: "#E6E6E6", palavras: [] };

export function familiaDaNota(nota: string): Familia {
  const n = normalizar(nota);
  return FAMILIAS.find((f) => f.palavras.some((w) => n.includes(w))) ?? OUTRAS;
}

/** Descrição curta, escrita a partir da ficha. */
export function descricaoDe(p: Produto, f: Ficha): string {
  const intens = { Suave: "de presença sutil", Moderado: "de presença equilibrada", Intenso: "de presença marcante" }[f.intensidade ?? "Moderado"];
  const lista = (xs: string[], n: number) => {
    const a = xs.slice(0, n).map((x) => x.toLowerCase());
    return a.length > 1 ? `${a.slice(0, -1).join(", ")} e ${a[a.length - 1]}` : a[0] ?? "";
  };
  const abre = p.original ? "Perfume original" : "Fragrância";
  return `${abre} ${f.estilo.toLowerCase()} ${intens}. Abre com ${lista(f.topo, 2)}, revela ${lista(f.coracao, 2)} no coração e assenta em ${lista(f.fundo, 2)}.`;
}

// ---- kits: a fragrância que vem dentro e o conteúdo da caixa ----
const TIPOS_DE_KIT: { re: RegExp; tipo: string; itens: [string, string][] }[] = [
  { re: /^Kit Premium (.+)$/, tipo: "Kit Premium", itens: [["Perfume", "100ml"], ["Perfume de bolsa", "15ml"], ["Body splash", "100ml"], ["Hidratante corporal", "80ml"]] },
  { re: /^Kit (.+) com Nécessaire$/, tipo: "Kit 3 em 1", itens: [["Perfume de bolsa", "15ml"], ["Body splash", "100ml"], ["Hidratante corporal", "80ml"], ["Nécessaire", ""]] },
  { re: /^Duo Fragrâncias (.+)$/, tipo: "Kit 2 em 1", itens: [["Perfume de bolsa", "15ml"], ["Body splash", "100ml"]] },
  { re: /^Kit Perfumad[oa] (.+)$/, tipo: "Kit Perfumado", itens: [] },
];

function tipoDoKit(p: Produto) {
  for (const t of TIPOS_DE_KIT) {
    const m = p.nome.match(t.re);
    if (m) return { ...t, base: m[1] === "D" ? "D by Denise Lemos" : m[1] };
  }
  return null;
}

/** Perfume que dá a fragrância do kit ("Kit Premium GD" → "GD 15ml"), para mostrar as notas. */
export function fragranciaDoKit(p: Produto): Produto | null {
  if (p.grupo !== "K") return null;
  const t = tipoDoKit(p);
  if (!t) return null;
  const base = normalizar(t.base);
  const achados = PRODUTOS.filter((q) => q.ficha && "FMU".includes(q.grupo) && !q.original && new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} (15|100)ml$`).test(normalizar(q.nome)));
  return achados.find((q) => ml(q) === 15) ?? achados[0] ?? null;
}

/** O que vem na caixa do kit (vazio quando não sabemos ao certo). */
export const conteudoDoKit = (p: Produto): [string, string][] => tipoDoKit(p)?.itens ?? [];

/** Ficha olfativa do produto; no kit, a do perfume que vem dentro. */
export const fichaCompleta = (p: Produto): Ficha | null => {
  const f = fichaDe(p);
  if (f) return f;
  const q = fragranciaDoKit(p);
  return q ? fichaDe(q) : null;
};
