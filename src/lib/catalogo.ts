// Regras do catálogo: tipos, busca, filtros, perfumes parecidos e o teste.
// A parte visual fica em src/components; aqui só tem lógica.
import produtosJson from "@/data/produtos.json";
import fichasJson from "@/data/fichas.json";

/** F feminino, M masculino, U unissex, K kits, B body splash, C corpo e cabelo */
export type Grupo = "F" | "M" | "U" | "K" | "B" | "C";
export type Intensidade = "Suave" | "Moderado" | "Intenso";
export type Estilo = "Floral" | "Adocicado" | "Frutal" | "Refrescante" | "Amadeirado" | "Oriental" | "Fougère";

export type Produto = {
  nome: string;
  grupo: Grupo;
  familia: string | null;
  imagem: number;
  ext: string;
  preco: number | null;
  ficha?: string;
  /** foto própria em /public (usada no lugar da foto da Amakha) */
  foto?: string;
  /** perfume importado original (não Amakha): nome da marca */
  original?: string;
};

export type Ficha = {
  nome: string;
  genero: "F" | "M" | "U";
  inspiradoEm: string;
  marca: string;
  estilo: string;
  grupo: Estilo;
  intensidade: Intensidade | null;
  topo: string[];
  coracao: string[];
  fundo: string[];
};

export const PRODUTOS = produtosJson as Produto[];
export const FICHAS = fichasJson as Record<string, Ficha>;

export const ESTILOS: Estilo[] = ["Floral", "Adocicado", "Frutal", "Refrescante", "Amadeirado", "Oriental", "Fougère"];
export const INTENSIDADES: Intensidade[] = ["Suave", "Moderado", "Intenso"];

export const fichaDe = (p: Produto): Ficha | null => (p.ficha ? FICHAS[p.ficha] ?? null : null);

export const imagem = (id: number, ext = "jpg", tamanho = 400) =>
  `https://amakha.vteximg.com.br/arquivos/ids/${id}-${tamanho}-${tamanho}/p.${ext}`;

/** Foto do produto: a própria (public/) se houver, senão a da Amakha. */
export const fotoDe = (p: Produto, tamanho = 400) => p.foto ?? imagem(p.imagem, p.ext, tamanho);

export const precoTexto = (preco: number | null) =>
  preco == null ? "Consulte o valor" : preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** minúsculo e sem acento, para a busca achar "fougere" e "Fougère" */
export const normalizar = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const textoDeBusca = new Map<Produto, string>(
  PRODUTOS.map((p) => {
    const f = fichaDe(p);
    const extra = f ? [f.inspiradoEm, f.marca, f.estilo, ...f.topo, ...f.coracao, ...f.fundo].join(" ") : "";
    return [p, normalizar(`${p.nome} ${extra}`)];
  })
);

export type Filtro = {
  grupo: "all" | Grupo;
  tamanho: "" | "15" | "100";
  termo: string;
  estilo: "" | Estilo;
  intensidade: "" | Intensidade;
};

export const FILTRO_INICIAL: Filtro = { grupo: "all", tamanho: "", termo: "", estilo: "", intensidade: "" };

export function filtrar(f: Filtro): Produto[] {
  const palavras = normalizar(f.termo.trim()).split(/\s+/).filter(Boolean);
  return PRODUTOS.filter((p) => {
    const g = p.grupo;
    if (f.grupo === "F" && g !== "F" && g !== "U") return false;
    if (f.grupo === "M" && g !== "M" && g !== "U") return false;
    if (f.grupo !== "all" && f.grupo !== "F" && f.grupo !== "M" && g !== f.grupo) return false;
    if (f.tamanho === "15" && !/15ml/i.test(p.nome)) return false;
    if (f.tamanho === "100" && !/100ml/i.test(p.nome)) return false;
    if (f.estilo || f.intensidade) {
      const ficha = fichaDe(p);
      if (!ficha) return false;
      if (f.estilo && ficha.grupo !== f.estilo) return false;
      if (f.intensidade && ficha.intensidade !== f.intensidade) return false;
    }
    const texto = textoDeBusca.get(p) ?? "";
    return palavras.every((w) => texto.includes(w));
  });
}

/** Um produto por perfume (prefere o de 15ml), sem body splash nem kit. Usado no teste e nos parecidos. */
export const UM_POR_PERFUME: Produto[] = (() => {
  const m = new Map<string, Produto>();
  for (const p of PRODUTOS) {
    if (!p.ficha || p.grupo === "B") continue;
    const atual = m.get(p.ficha);
    if (!atual || (/15ml/i.test(p.nome) && !/15ml/i.test(atual.nome))) m.set(p.ficha, p);
  }
  return [...m.values()];
})();

/** "Se gostou, experimente também": mesmo gênero e mesmo estilo, priorizando a mesma intensidade. */
export function parecidos(p: Produto, quantos = 4): Produto[] {
  const f = fichaDe(p);
  if (!f) return [];
  // no original importado, a primeira sugestão é a versão Amakha do mesmo cheiro
  const versaoAmakha = p.original ? UM_POR_PERFUME.filter((q) => q.ficha === p.ficha) : [];
  return versaoAmakha.concat(UM_POR_PERFUME.filter((q) => q.ficha !== p.ficha)
    .map((q) => ({ q, g: fichaDe(q)! }))
    .filter(({ g }) => g.genero === f.genero && g.grupo === f.grupo)
    .map(({ q, g }) => ({ q, nota: (g.intensidade === f.intensidade ? 0 : 1) + (g.estilo === f.estilo ? 0 : 0.5) }))
    .sort((a, b) => a.nota - b.nota)
    .map((x) => x.q)
  ).slice(0, quantos);
}

// ---- Teste "Descubra seu perfume" ----
export type Resposta = { para: "F" | "M"; cheiro: "Adocicado" | "Floral" | "Frutal" | "Refrescante" | "Amadeirado"; intensidade: Intensidade };

/** Estilos aceitos para cada resposta, do mais parecido para o menos. */
const ESTILOS_DA_RESPOSTA: Record<Resposta["cheiro"], Estilo[]> = {
  Adocicado: ["Adocicado", "Oriental"],
  Floral: ["Floral"],
  Frutal: ["Frutal", "Floral"],
  Refrescante: ["Refrescante", "Fougère"],
  Amadeirado: ["Amadeirado", "Oriental", "Fougère"],
};
const NIVEL: Record<Intensidade, number> = { Suave: 1, Moderado: 2, Intenso: 3 };

export function recomendar(r: Resposta, quantos = 3): Produto[] {
  const aceitos = ESTILOS_DA_RESPOSTA[r.cheiro];
  return UM_POR_PERFUME.map((p) => ({ p, f: fichaDe(p)! }))
    .filter(({ f }) => (f.genero === r.para || f.genero === "U") && aceitos.includes(f.grupo))
    .map(({ p, f }) => ({
      p,
      nota: aceitos.indexOf(f.grupo) * 2 + Math.abs(NIVEL[f.intensidade ?? "Moderado"] - NIVEL[r.intensidade]) * 1.5,
    }))
    .sort((a, b) => a.nota - b.nota)
    .slice(0, quantos)
    .map((x) => x.p);
}

/** Perfumes famosos citados na enciclopédia, para o campo "já tem um perfume que você ama?" */
export const REFERENCIAS = [...new Set(Object.values(FICHAS).map((f) => f.inspiradoEm))].sort((a, b) => a.localeCompare(b));

export function porReferencia(texto: string, quantos = 6): Produto[] {
  const t = normalizar(texto.trim());
  if (t.length < 3) return [];
  return UM_POR_PERFUME.filter((p) => {
    const f = fichaDe(p)!;
    return normalizar(f.inspiradoEm).includes(t) || normalizar(f.marca).includes(t);
  }).slice(0, quantos);
}
