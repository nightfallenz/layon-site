import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Carrinho from "@/components/Carrinho";
import Animacoes from "@/components/Animacoes";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://layonamakhaparis.com.br"),
  title: "Layon Alves | Perfumes Amakha Paris em Brasília",
  description: "Curadoria pessoal de fragrâncias Amakha Paris, kits completos e entrega por Uber Flash ou 99Entrega em Brasília e Entorno.",
  openGraph: {
    title: "Layon Alves | Perfumes Amakha Paris em Brasília",
    description: "Curadoria pessoal de fragrâncias, kits completos e entrega por Uber Flash ou 99Entrega em Brasília e Entorno.",
    locale: "pt_BR",
    type: "website",
  },
};

// Fontes servidas pelo próprio site (sem piscar a fonte errada ao abrir)
const playfair = localFont({
  src: [
    { path: "../fontes/playfair.woff2", style: "normal", weight: "400 900" },
    { path: "../fontes/playfair-italico.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--f-serif",
  display: "swap",
});
const cursiva = localFont({ src: "../fontes/cedarville.woff2", weight: "400", variable: "--f-logo", display: "swap" });
const inter = localFont({ src: "../fontes/inter.woff2", weight: "100 900", variable: "--f-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${cursiva.variable}`}>
      <body>
        <Animacoes />
        <Carrinho>{children}</Carrinho>
      </body>
    </html>
  );
}
