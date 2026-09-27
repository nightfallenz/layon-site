// Moldura das páginas internas (/kits, /15ml, /100ml): menu, título, conteúdo e rodapé.
import type { ReactNode } from "react";
import Nav from "./Nav";
import Rodape from "./Rodape";
import Loja from "./Loja";

type Props = { sobretitulo: string; titulo: ReactNode; texto: string; voltar?: { href: string; txt: string }; children: ReactNode };

export default function Pagina({ sobretitulo, titulo, texto, voltar = { href: "/", txt: "Início" }, children }: Props) {
  return (
    <>
      <Nav />
      <main>
        <section className="section center page-head">
          <a className="crumb" href={voltar.href}>← {voltar.txt}</a>
          <div className="eyebrow">{sobretitulo}</div>
          <h1 className="h2">{titulo}</h1>
          <p className="lead">{texto}</p>
        </section>
        <Loja>{children}</Loja>
      </main>
      <Rodape />
    </>
  );
}

export function Bloco({ titulo, texto, preco, rotuloPreco, children }: { titulo: string; texto?: string; preco?: string; rotuloPreco?: string; children: ReactNode }) {
  return (
    <section className="section center bloco">
      <div className="bloco-head">
        <div>
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
        </div>
        {preco && <div className="preco-grande"><small>{rotuloPreco ?? "Cada"}</small>{preco}</div>}
      </div>
      {children}
    </section>
  );
}
