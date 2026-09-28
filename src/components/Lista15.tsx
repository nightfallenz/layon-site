// Página de lista dos 15ml de um gênero (usada em /15ml/feminino e /15ml/masculino).
import Pagina, { Bloco } from "./Pagina";
import Grade from "./Grade";
import { precoTexto } from "@/lib/catalogo";
import { perfumes15De } from "@/lib/produtos";

export default function Lista15({ genero }: { genero: "F" | "M" }) {
  const lista = perfumes15De(genero);
  const nome = genero === "F" ? "Femininos" : "Masculinos";
  const outro = genero === "F" ? { href: "/15ml/masculino", txt: "Explorar os masculinos" } : { href: "/15ml/feminino", txt: "Explorar os femininos" };
  return (
    <Pagina
      sobretitulo="Perfumes 15ml"
      voltar={{ href: "/15ml", txt: "Perfumes 15ml" }}
      titulo={<>{nome} <em>15ml</em></>}
      texto="Toque na fragrância para conhecer a pirâmide olfativa e o clássico que a inspira."
    >
      <Bloco titulo={`${lista.length} fragrâncias`} texto={`Procura outra linha? ${outro.txt}.`} preco={precoTexto(lista[0]?.preco ?? null)} rotuloPreco="Cada perfume">
        <Grade produtos={lista} busca />
        <a className="btn btn-outline" style={{ marginTop: 48 }} href={outro.href}>{outro.txt}</a>
      </Bloco>
    </Pagina>
  );
}
