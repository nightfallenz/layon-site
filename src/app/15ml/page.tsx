import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { PERFUMES_15 } from "@/lib/produtos";

export const metadata: Metadata = { title: "Perfumes 15ml | Layon Alves Amakha Paris" };

export default function Pagina15() {
  return (
    <Pagina
      sobretitulo="Perfumes 15ml"
      titulo={<>Cabe na Bolsa, <em>Dura o Dia</em></>}
      texto="Todos os perfumes de 15ml por R$ 45,00. Clique na foto para ver com qual importado ele é parecido e as notas."
    >
      <Bloco titulo="Escolha o seu" preco="R$ 45,00" rotuloPreco="Cada perfume">
        <Grade produtos={PERFUMES_15} abasDeGenero busca />
      </Bloco>
    </Pagina>
  );
}
