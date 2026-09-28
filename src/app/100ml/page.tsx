import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { precoTexto } from "@/lib/catalogo";
import { PERFUMES_100 } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Perfumes 100ml | Layon Alves Amakha Paris",
  description: "Os 8 femininos e 8 masculinos mais pedidos por R$ 215. Entrega em mãos em Brasília e Entorno.",
  openGraph: { title: "Perfumes 100ml | Layon Alves Amakha Paris", description: "Os 8 femininos e 8 masculinos mais pedidos por R$ 215. Entrega em mãos em Brasília e Entorno.", locale: "pt_BR", type: "website" },
};

export default function Pagina100() {
  const fem = PERFUMES_100.filter((p) => p.grupo === "F");
  const masc = PERFUMES_100.filter((p) => p.grupo === "M");
  const preco = precoTexto(PERFUMES_100[0]?.preco ?? null);
  return (
    <Pagina
      sobretitulo="Perfumes 100ml"
      titulo={<>Para Quem Quer <em>Ser Lembrado</em></>}
      texto="Os mais pedidos no frasco grande. Clique na foto para ver com qual importado ele é parecido e as notas."
    >
      <Bloco titulo="Femininos" preco={preco} rotuloPreco="Cada perfume"><Grade produtos={fem} /></Bloco>
      <Bloco titulo="Masculinos" preco={preco} rotuloPreco="Cada perfume"><Grade produtos={masc} /></Bloco>
    </Pagina>
  );
}
