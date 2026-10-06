import type { Metadata } from "next";
import Pagina, { Bloco } from "@/components/Pagina";
import Grade from "@/components/Grade";
import { PRODUTOS } from "@/lib/catalogo";

const descricao = "Body splash e cuidados para corpo e cabelo Amakha Paris: o ritual pós-banho com a mesma assinatura do seu perfume.";

export const metadata: Metadata = {
  title: "Corpo e cabelo | Layon Alves Amakha Paris",
  description: descricao,
  openGraph: { title: "Corpo e cabelo | Layon Alves Amakha Paris", description: descricao, locale: "pt_BR", type: "website" },
};

export default function PaginaCorpo() {
  return (
    <Pagina
      sobretitulo="Corpo e cabelo"
      titulo={<>O Ritual <em>Pós-Banho</em></>}
      atalhos={[{ href: "#body-splash", txt: "Body splash" }, { href: "#corpo-cabelo", txt: "Corpo e cabelo" }]}
      texto="Body splash, hidratantes e cuidados para o ritual pós-banho."
    >
      <Bloco id="body-splash" titulo="Body splash" texto="Névoa perfumada para refrescar o corpo ao longo do dia.">
        <Grade produtos={PRODUTOS.filter((p) => p.grupo === "B")} />
      </Bloco>
      <Bloco id="corpo-cabelo" titulo="Corpo e cabelo" texto="Hidratantes e cuidados para o ritual completo.">
        <Grade produtos={PRODUTOS.filter((p) => p.grupo === "C")} />
      </Bloco>
    </Pagina>
  );
}
