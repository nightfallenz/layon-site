"use client";
import { useState } from "react";
import { EMAIL, linkWhats } from "@/data/contato";
import { IconeBusca, IconeEmail, IconeMenu, IconeSacola, IconeWhats } from "./Icones";
import { useCarrinho } from "./Carrinho";
import Logo from "./Logo";
import MenuTela from "./MenuTela";

// Links do topo (no computador). No celular e no botão de menu, abre o menu em tela cheia.
const LINKS = [
  ["/catalogo", "Catálogo", "Catálogo completo"],
  ["/kits", "Kits", "Kits completos"],
  ["/corpo", "Corpo", "Corpo e cabelo"],
  ["/#descubra", "Descubra", "Descubra seu perfume"],
  ["/#consultor", "Seja consultor", "Seja consultor"],
] as const;

export default function Nav() {
  const [menu, setMenu] = useState(false);
  const { quantidade, abrir } = useCarrinho();
  return (
    <>
    <nav className="nav" aria-label="Principal">
      <Logo />
      <div className="nav-links">
        {LINKS.map(([href, txt]) => <a key={href} href={href}>{txt}</a>)}
      </div>
      <div className="nav-icons">
        <a href="/catalogo#busca" aria-label="Buscar no catálogo"><IconeBusca /></a>
        <a href={linkWhats()} aria-label="Falar no WhatsApp"><IconeWhats /></a>
        <a href={`mailto:${EMAIL}`} aria-label="Enviar e-mail"><IconeEmail /></a>
        <button type="button" className="sacola" onClick={abrir} aria-label={`Abrir sacola, ${quantidade} ${quantidade === 1 ? "item" : "itens"}`}>
          <IconeSacola />
          {quantidade > 0 && <span className="badge" key={quantidade} aria-hidden="true">{quantidade}</span>}
        </button>
        <button type="button" className="abre-menu" onClick={() => setMenu(true)} aria-label="Abrir menu" aria-expanded={menu}><IconeMenu /></button>
      </div>
    </nav>
    <MenuTela aberto={menu} fechar={() => setMenu(false)} />
    </>
  );
}
