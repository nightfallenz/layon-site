"use client";
import { useRef } from "react";
import { EMAIL, linkWhats } from "@/data/contato";
import { IconeEmail, IconeMenu, IconeSacola, IconeWhats } from "./Icones";

const LINKS = [
  ["#kits", "Kits"],
  ["#catalogo", "Catálogo"],
  ["#descubra", "Descubra"],
  ["#linhas", "Linhas"],
  ["#historia", "Nossa história"],
  ["#consultor", "Seja consultor"],
] as const;

export default function Nav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const fechar = () => menu.current?.removeAttribute("open");
  return (
    <nav className="nav" aria-label="Principal">
      <a className="logo" href="#inicio">LAYON</a>
      <div className="nav-links">
        {LINKS.map(([href, txt]) => <a key={href} href={href}>{txt}</a>)}
      </div>
      <div className="nav-icons">
        <a href={linkWhats()} aria-label="Falar no WhatsApp"><IconeWhats /></a>
        <a href={`mailto:${EMAIL}`} aria-label="Enviar e-mail"><IconeEmail /></a>
        <details className="menu" ref={menu}>
          <summary aria-label="Abrir menu"><IconeMenu /></summary>
          <div className="menu-panel">
            {LINKS.map(([href, txt]) => (
              <a key={href} href={href} onClick={fechar}>{txt === "Descubra" ? "Descubra seu perfume" : txt}</a>
            ))}
          </div>
        </details>
        <a href="#kits" aria-label="Ver os kits"><IconeSacola /></a>
      </div>
    </nav>
  );
}
