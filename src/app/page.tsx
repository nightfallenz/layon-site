// A página inteira é só a ordem das seções. Para mudar uma seção, abra o componente dela em src/components.
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Kits from "@/components/Kits";
import Loja from "@/components/Loja";
import Catalogo from "@/components/Catalogo";
import TesteDoPerfume from "@/components/TesteDoPerfume";
import Historia from "@/components/Historia";
import Linhas from "@/components/Linhas";
import Consultor from "@/components/Consultor";
import Rodape from "@/components/Rodape";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Kits />
        <Loja>
          <Catalogo />
          <TesteDoPerfume />
          <Historia />
          <Linhas />
        </Loja>
        <Consultor />
      </main>
      <Rodape />
    </>
  );
}
