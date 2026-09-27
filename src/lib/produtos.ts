import { PRODUTOS, type Produto } from "./catalogo";

/** Busca produtos pelo nome exato; avisa no build se algum nome não existir em produtos.json. */
export function pegar(nomes: string[]): Produto[] {
  return nomes.map((n) => {
    const p = PRODUTOS.find((x) => x.nome === n);
    if (!p) throw new Error(`Produto "${n}" não existe em src/data/produtos.json`);
    return p;
  });
}

export const GENERO: Record<string, string> = { F: "Feminino", M: "Masculino", U: "Unissex" };

const tamanho = (ml: string) => (p: Produto) => new RegExp(`\\s${ml}ml$`, "i").test(p.nome) && "FMU".includes(p.grupo);
export const PERFUMES_15 = PRODUTOS.filter(tamanho("15"));
/** Na página de 100ml só entram os que têm preço (os que o Layon trabalha). */
export const PERFUMES_100 = PRODUTOS.filter((p) => tamanho("100")(p) && p.preco != null);

/** Perfumes 15ml de um gênero (os unissex aparecem nos dois). */
export const perfumes15De = (g: "F" | "M") => PERFUMES_15.filter((p) => p.grupo === g || p.grupo === "U");
