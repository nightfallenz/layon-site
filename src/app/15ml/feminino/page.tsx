import type { Metadata } from "next";
import Lista15 from "@/components/Lista15";

export const metadata: Metadata = {
  title: "Perfumes 15ml Femininos | Layon Alves Amakha Paris",
  description: "Fragrâncias femininas em 15ml, com a pirâmide olfativa e o clássico que inspira cada uma.",
  openGraph: { title: "Perfumes 15ml Femininos | Layon Alves Amakha Paris", description: "Fragrâncias femininas em 15ml, com a pirâmide olfativa e o clássico que inspira cada uma.", locale: "pt_BR", type: "website" },
};

export default function Page() {
  return <Lista15 genero="F" />;
}
