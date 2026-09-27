"use client";
import { useRef } from "react";
import { EMAIL, linkWhats } from "@/data/contato";
import { IconeEmail, IconeMenu, IconeSacola, IconeWhats } from "./Icones";

// [endereço, nome no menu do computador, nome no menu do celular]
const LINKS = [
  ["/kits", "Kits", "Kits de presente"],
  ["/15ml", "15ml", "Perfumes 15ml"],
  ["/100ml", "100ml", "Perfumes 100ml"],
  ["/#catalogo", "Catálogo", "Catálogo completo"],
  ["/#descubra", "Descubra", "Descubra seu perfume"],
  ["/#consultor", "Seja consultor", "Seja consultor"],
] as const;

export default function Nav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const fechar = () => menu.current?.removeAttribute("open");
  return (
    <nav className="nav" aria-label="Principal">
      <a className="logo" href="/">LAYON</a>
      <div className="nav-links">
        {LINKS.map(([href, txt]) => <a key={href} href={href}>{txt}</a>)}
      </div>
      <div className="nav-icons">
        <a href={linkWhats()} aria-label="Falar no WhatsApp"><IconeWhats /></a>
        <a href={`mailto:${EMAIL}`} aria-label="Enviar e-mail"><IconeEmail /></a>
        <details className="menu" ref={menu}>
          <summary aria-label="Abrir menu"><IconeMenu /></summary>
          <div className="menu-panel">
            {LINKS.map(([href, , longo]) => (
              <a key={href} href={href} onClick={fechar}>{longo}</a>
            ))}
          </div>
        </details>
        <a href="/kits" aria-label="Ver os kits"><IconeSacola /></a>
      </div>
    </nav>
  );
}
