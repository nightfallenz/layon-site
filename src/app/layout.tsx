import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layon Alves | Perfumes Amakha Paris em Brasília",
  description: "Perfumes e kits Amakha Paris com entrega em mãos em Brasília e Entorno. Seja consultor e venda com a equipe do Layon.",
  openGraph: {
    title: "Layon Alves | Perfumes Amakha Paris em Brasília",
    description: "Kits prontos para presentear, entrega em mãos e equipe de consultores.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
