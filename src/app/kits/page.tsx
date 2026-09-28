import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { KITS_2EM1, KITS_3EM1, KITS_PREMIUM } from "@/data/kits";
import { precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Kits de presente | Layon Alves Amakha Paris",
  description: "Kits 3 em 1, 2 em 1 e Premium: uma mesma fragrância em diferentes formas, apresentada em caixa. Entrega em mãos em Brasília.",
  openGraph: { title: "Kits de presente | Layon Alves Amakha Paris", description: "Kits 3 em 1, 2 em 1 e Premium: uma mesma fragrância em diferentes formas, apresentada em caixa. Entrega em mãos em Brasília.", locale: "pt_BR", type: "website" },
};

function precoDoGrupo(nomes: string[]) {
  const precos = [...new Set(pegar(nomes).map((p) => p.preco))];
  return precos.length === 1 && precos[0] != null ? precoTexto(precos[0]) : undefined;
}

export default function PaginaKits() {
  return (
    <Pagina
      sobretitulo="Presentes"
      titulo={<>O Presente, <em>Já Completo</em></>}
      texto="Cada kit reúne uma mesma fragrância em diferentes formas, apresentada em caixa. Escolha, e o Layon entrega em mãos em Brasília e Entorno."
    >
      {[KITS_3EM1, KITS_2EM1, KITS_PREMIUM].map((g) => (
        <Bloco key={g.id} titulo={g.titulo} texto={g.oQueVem} preco={precoDoGrupo(g.produtos)} rotuloPreco="Cada kit">
          <Grade produtos={pegar(g.produtos)} />
        </Bloco>
      ))}
    </Pagina>
  );
}
