// A página inteira é só a ordem das seções. Para mudar uma seção, abra o componente dela em src/components.
import Nav from "@/components/Nav";
import Kits from "@/components/Kits";
import Loja from "@/components/Loja";
import Catalogo from "@/components/Catalogo";
import TesteDoPerfume from "@/components/TesteDoPerfume";
import Historia from "@/components/Historia";
import Linhas from "@/components/Linhas";
import Consultor from "@/components/Consultor";
import Rodape from "@/components/Rodape";
import Faixa from "@/components/Faixa";
import Abertura from "@/components/Abertura";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Loja>
          <Abertura />
          <Faixa />
          <Kits />
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
