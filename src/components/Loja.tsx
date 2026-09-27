"use client";
// Estado compartilhado entre catálogo, ficha, teste e "Nossas Linhas":
// qual filtro está ativo e qual ficha de perfume está aberta.
import { createContext, useContext, useState, type ReactNode } from "react";
import { FILTRO_INICIAL, type Filtro, type Produto } from "@/lib/catalogo";
import FichaPerfume from "./FichaPerfume";

type Loja = {
  filtro: Filtro;
  setFiltro: (f: Filtro) => void;
  abrirFicha: (p: Produto) => void;
};

const Contexto = createContext<Loja | null>(null);

export function useLoja(): Loja {
  const c = useContext(Contexto);
  if (!c) throw new Error("useLoja precisa estar dentro de <Loja>");
  return c;
}

export default function Loja({ children }: { children: ReactNode }) {
  const [filtro, setFiltro] = useState<Filtro>(FILTRO_INICIAL);
  const [aberto, setAberto] = useState<Produto | null>(null);
  return (
    <Contexto.Provider value={{ filtro, setFiltro, abrirFicha: setAberto }}>
      {children}
      <FichaPerfume produto={aberto} onTrocar={setAberto} onFechar={() => setAberto(null)} />
    </Contexto.Provider>
  );
}
