// Imagem de prévia (a que aparece quando o link é enviado no WhatsApp/Instagram).
// Cada página tem um arquivo opengraph-image.tsx que chama esta função.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { imagem } from "./catalogo";

export const TAMANHO = { width: 1200, height: 630 };

type Opcoes = {
  sobre: string;          // linha pequena em cima (ex.: "Kits completos")
  titulo: string;         // parte normal do título
  destaque?: string;      // parte em itálico dourado
  texto: string;
  preco?: string;         // ex.: "R$ 45,00"
  rotuloPreco?: string;   // ex.: "Cada perfume"
  fotos: number[];        // ids das fotos da Amakha (até 3)
};

const fonte = (arq: string) => readFile(join(process.cwd(), "src/fontes", arq));

/** Baixa a foto; se a Amakha estiver fora do ar, a prévia sai só com texto (o site não quebra). */
async function foto(id: number): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const r = await fetch(process.env.OG_FOTO_TESTE ?? imagem(id, "jpg", 500), { signal: ctrl.signal }); // OG_FOTO_TESTE: só para testar sem internet
    clearTimeout(t);
    if (!r.ok) return null;
    const b = Buffer.from(await r.arrayBuffer());
    return `data:${r.headers.get("content-type") ?? "image/jpeg"};base64,${b.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function cartaz(o: Opcoes) {
  const [serif, serifItalico, sans, ...fotos] = await Promise.all([
    fonte("og-playfair.ttf"),
    fonte("og-playfair-italico.ttf"),
    fonte("og-inter.ttf"),
    ...o.fotos.slice(0, 3).map(foto),
  ]);
  const imgs = (fotos as (string | null)[]).filter(Boolean) as string[];
  const ouro = "#B8912A";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FAF9F6", fontFamily: "Inter" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 60px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 20, letterSpacing: 6, color: "#6B6B6B" }}>
            <div style={{ width: 40, height: 1, background: ouro }} />
            LAYON · AMAKHA PARIS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 5, color: ouro, textTransform: "uppercase", marginBottom: 18 }}>{o.sobre}</div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Playfair", fontSize: 72, lineHeight: 1.08, color: "#1A1A1A" }}>
              <span>{o.titulo}</span>
              {o.destaque && <span style={{ fontStyle: "italic", color: ouro }}>{o.destaque}</span>}
            </div>
            <div style={{ fontSize: 26, lineHeight: 1.5, color: "#6B6B6B", marginTop: 22, maxWidth: 600 }}>{o.texto}</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
            {o.preco && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 18, letterSpacing: 4, color: "#8E7A3E", textTransform: "uppercase" }}>{o.rotuloPreco ?? "Cada"}</div>
                <div style={{ fontFamily: "Playfair", fontSize: 60, lineHeight: 1.1, color: "#1A1A1A" }}>{o.preco}</div>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", fontSize: 20, color: "#6B6B6B", paddingBottom: 12 }}>
              <span>Entrega por aplicativo</span>
              <span>Brasília e Entorno</span>
            </div>
          </div>
        </div>
        {imgs.length > 0 && (
          <div style={{ width: 430, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderLeft: `2px solid ${ouro}`, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              {imgs.map((src, i) => {
                const meio = imgs.length === 3 ? i === 1 : i === 0;
                const s = imgs.length === 1 ? 380 : meio ? 230 : 170;
                return <img key={i} src={src} width={s} height={s} style={{ marginLeft: i ? -60 : 0, objectFit: "contain", position: "relative", zIndex: meio ? 2 : 1 }} />;
              })}
            </div>
          </div>
        )}
      </div>
    ),
    {
      ...TAMANHO,
      fonts: [
        { name: "Playfair", data: serif, style: "normal", weight: 400 },
        { name: "Playfair", data: serifItalico, style: "italic", weight: 400 },
        { name: "Inter", data: sans, style: "normal", weight: 500 },
      ],
    }
  );
}
