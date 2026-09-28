import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Carrinho from "@/components/Carrinho";
import Animacoes from "@/components/Animacoes";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://layon-site.vercel.app"),
  title: "Layon Alves | Perfumes Amakha Paris em Brasília",
  description: "Perfumes e kits Amakha Paris com entrega em mãos em Brasília e Entorno. Seja consultor e venda com a equipe do Layon.",
  openGraph: {
    title: "Layon Alves | Perfumes Amakha Paris em Brasília",
    description: "Kits prontos para presentear, entrega em mãos e equipe de consultores.",
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
const inter = localFont({ src: "../fontes/inter.woff2", weight: "100 900", variable: "--f-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Animacoes />
        <Carrinho>{children}</Carrinho>
      </body>
    </html>
  );
}
