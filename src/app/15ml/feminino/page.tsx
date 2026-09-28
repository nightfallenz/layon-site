import type { Metadata } from "next";
import Lista15 from "@/components/Lista15";

export const metadata: Metadata = {
  title: "Perfumes 15ml Femininos | Layon Alves Amakha Paris",
  description: "Mais de 50 perfumes femininos 15ml por R$ 45, com o importado parecido e as notas.",
  openGraph: { title: "Perfumes 15ml Femininos | Layon Alves Amakha Paris", description: "Mais de 50 perfumes femininos 15ml por R$ 45, com o importado parecido e as notas.", locale: "pt_BR", type: "website" },
};

export default function Page() {
  return <Lista15 genero="F" />;
}
