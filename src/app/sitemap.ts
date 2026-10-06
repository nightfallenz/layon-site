import type { MetadataRoute } from "next";
import { PRODUTOS } from "@/lib/catalogo";
import { slugDe } from "@/lib/perfume";

export const dynamic = "force-static";

const SITE = "https://layonamakhaparis.com.br";
const PAGINAS = ["", "/catalogo", "/kits", "/15ml", "/15ml/feminino", "/15ml/masculino", "/100ml", "/arabes", "/corpo", "/privacidade"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...PAGINAS, ...PRODUTOS.map((p) => `/perfume/${slugDe(p)}`)].map((caminho) => ({ url: `${SITE}${caminho}/`.replace(/\/\/$/, "/") }));
}
