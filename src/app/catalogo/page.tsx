import type { Metadata } from "next";
import Pagina from "@/components/Pagina";
import Catalogo from "@/components/Catalogo";

const descricao = "Todas as fragrâncias, kits, body splash e cuidados Amakha Paris. Busque por nome, nota ou perfume clássico e peça direto pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Catálogo completo | Layon Alves Amakha Paris",
  description: descricao,
  openGraph: { title: "Catálogo completo | Layon Alves Amakha Paris", description: descricao, locale: "pt_BR", type: "website" },
};

export default function PaginaCatalogo() {
  return (
    <Pagina
      sobretitulo="A coleção"
      titulo={<>Encontre a Sua <em>Assinatura</em></>}
      texto="Cada fragrância com a sua pirâmide olfativa e o clássico que a inspira. Quando decidir, o pedido segue direto para o Layon."
    >
      <Catalogo />
    </Pagina>
  );
}
