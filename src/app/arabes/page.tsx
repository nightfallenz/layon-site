import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { ARABES } from "@/data/arabes";
import { precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Linha Árabe | Layon Alves Amakha Paris",
  description: "Perfumes intensos inspirados na perfumaria árabe: Zaya, Al Sabah, Hasan Rose, Asadiyy, Malik Nuit e Hasan Black.",
  openGraph: { title: "Linha Árabe | Layon Alves Amakha Paris", description: "Perfumes intensos inspirados na perfumaria árabe: Zaya, Al Sabah, Hasan Rose, Asadiyy, Malik Nuit e Hasan Black.", locale: "pt_BR", type: "website" },
};

export default function PaginaArabes() {
  const perfumes = pegar(ARABES.perfumes);
  return (
    <Pagina
      sobretitulo="Linha Árabe"
      titulo={<>Intensos, Doces e <em>Inesquecíveis</em></>}
      texto="Inspirados na perfumaria árabe: oud, âmbar, baunilha e rosas que ficam na pele e no ambiente. Para quem gosta de ser notado de longe."
    >
      <Bloco titulo="Perfumes 15ml" texto="Clique na foto para ver o original árabe parecido e as notas." preco={precoTexto(perfumes[0]?.preco ?? null)} rotuloPreco="Cada perfume">
        <Grade produtos={perfumes} />
      </Bloco>
      <Bloco titulo="Originais importados" texto="Os árabes originais, 100ml, lacrados. Clique na foto para ver as notas e a versão Amakha do mesmo cheiro." rotuloPreco="100ml">
        <Grade produtos={pegar(ARABES.originais)} />
      </Bloco>
      <Bloco titulo="Kits e combinações" texto="Kit 2 em 1 (perfume 15ml + body splash) e duos para usar em camadas.">
        <Grade produtos={pegar(ARABES.kits)} />
      </Bloco>
      <Bloco titulo="Body splash" texto="O mesmo cheiro, mais leve, para o dia a dia e o pós-banho.">
        <Grade produtos={pegar(ARABES.corpo)} />
      </Bloco>
    </Pagina>
  );
}
