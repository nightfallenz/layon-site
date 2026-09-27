import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { KITS_2EM1, KITS_3EM1, KITS_PREMIUM } from "@/data/kits";
import { precoTexto } from "@/lib/catalogo";
import { pegar } from "@/lib/produtos";

export const metadata: Metadata = { title: "Kits de presente | Layon Alves Amakha Paris" };

function precoDoGrupo(nomes: string[]) {
  const precos = [...new Set(pegar(nomes).map((p) => p.preco))];
  return precos.length === 1 && precos[0] != null ? precoTexto(precos[0]) : undefined;
}

export default function PaginaKits() {
  return (
    <Pagina
      sobretitulo="Kits"
      titulo={<>Presente Pronto, <em>Sem Erro</em></>}
      texto="Tudo da mesma fragrância, já na caixa. Escolha o kit, me chame no WhatsApp e eu entrego em mãos em Brasília e Entorno."
    >
      {[KITS_3EM1, KITS_2EM1, KITS_PREMIUM].map((g) => (
        <Bloco key={g.id} titulo={g.titulo} texto={g.oQueVem} preco={precoDoGrupo(g.produtos)} rotuloPreco="Cada kit">
          <Grade produtos={pegar(g.produtos)} />
        </Bloco>
      ))}
    </Pagina>
  );
}
