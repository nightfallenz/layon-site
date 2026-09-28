import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { ARABES } from "@/data/arabes";
import { precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Linha Árabe | Layon Alves Amakha Paris",
  description: "Oud, âmbar e rosas da perfumaria árabe: Zaya, Al Sabah, Hasan Rose, Asadiyy, Malik Nuit, Hasan Black e originais importados.",
  openGraph: { title: "Linha Árabe | Layon Alves Amakha Paris", description: "Oud, âmbar e rosas da perfumaria árabe: Zaya, Al Sabah, Hasan Rose, Asadiyy, Malik Nuit, Hasan Black e originais importados.", locale: "pt_BR", type: "website" },
};

export default function PaginaArabes() {
  const perfumes = pegar(ARABES.perfumes);
  return (
    <Pagina
      sobretitulo="Linha Árabe"
      titulo={<>A Opulência <em>do Oriente</em></>}
      texto="Oud, âmbar, baunilha e rosas: a tradição da perfumaria árabe, com projeção generosa e um rastro que permanece."
    >
      <Bloco titulo="Perfumes 15ml" texto="Toque na fragrância para conhecer as notas e o original que a inspira." preco={precoTexto(perfumes[0]?.preco ?? null)} rotuloPreco="Cada perfume">
        <Grade produtos={perfumes} />
      </Bloco>
      <Bloco titulo="Originais importados" texto="Os originais árabes, 100ml, lacrados. Na ficha, a versão Amakha da mesma família olfativa." rotuloPreco="100ml">
        <Grade produtos={pegar(ARABES.originais)} />
      </Bloco>
      <Bloco titulo="Kits e combinações" texto="Kit 2 em 1 e duos pensados para uso em camadas.">
        <Grade produtos={pegar(ARABES.kits)} />
      </Bloco>
      <Bloco titulo="Body splash" texto="A mesma assinatura, mais leve, para o dia e o pós-banho.">
        <Grade produtos={pegar(ARABES.corpo)} />
      </Bloco>
    </Pagina>
  );
}
