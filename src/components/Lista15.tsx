// Página de lista dos 15ml de um gênero (usada em /15ml/feminino e /15ml/masculino).
import Pagina, { Bloco } from "./Pagina";
import Grade from "./Grade";
import { precoTexto } from "@/lib/catalogo";
import { perfumes15De } from "@/lib/produtos";

export default function Lista15({ genero }: { genero: "F" | "M" }) {
  const lista = perfumes15De(genero);
  const nome = genero === "F" ? "Femininos" : "Masculinos";
  const outro = genero === "F" ? { href: "/15ml/masculino", txt: "Ver os masculinos" } : { href: "/15ml/feminino", txt: "Ver os femininos" };
  return (
    <Pagina
      sobretitulo="Perfumes 15ml"
      voltar={{ href: "/15ml", txt: "Perfumes 15ml" }}
      titulo={<>{nome} <em>15ml</em></>}
      texto="Clique na foto para ver com qual importado ele é parecido e as notas. Achou o seu? Peça direto no WhatsApp."
    >
      <Bloco titulo={`${lista.length} perfumes disponíveis`} texto={`Não é esse? ${outro.txt}.`} preco={precoTexto(lista[0]?.preco ?? null)} rotuloPreco="Cada perfume">
        <Grade produtos={lista} busca />
        <a className="btn btn-outline" style={{ marginTop: 48 }} href={outro.href}>{outro.txt}</a>
      </Bloco>
    </Pagina>
  );
}
