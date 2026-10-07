import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { precoTexto } from "@/lib/catalogo";
import { PERFUMES_100 } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Perfumes 100ml | Layon Alves Amakha Paris",
  description: "As fragrâncias mais escolhidas no frasco de 100ml. Entrega por Uber Flash ou 99Entrega em Brasília e Entorno.",
  openGraph: { title: "Perfumes 100ml | Layon Alves Amakha Paris", description: "As fragrâncias mais escolhidas no frasco de 100ml. Entrega por Uber Flash ou 99Entrega em Brasília e Entorno.", locale: "pt_BR", type: "website" },
};

export default function Pagina100() {
  const fem = PERFUMES_100.filter((p) => p.grupo === "F");
  const masc = PERFUMES_100.filter((p) => p.grupo === "M");
  const preco = precoTexto(PERFUMES_100[0]?.preco ?? null);
  return (
    <Pagina
      sobretitulo="Perfumes 100ml"
      titulo={<>O Frasco <em>de Assinatura</em></>}
      texto="As fragrâncias mais escolhidas, no formato para uso diário. Toque em cada uma para conhecer a pirâmide olfativa."
    >
      <Bloco titulo="Femininos" preco={preco} rotuloPreco="Cada perfume"><Grade produtos={fem} /></Bloco>
      <Bloco titulo="Masculinos" preco={preco} rotuloPreco="Cada perfume"><Grade produtos={masc} /></Bloco>
    </Pagina>
  );
}
