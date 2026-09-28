"use client";
// Abertura da página inicial: foto em tela cheia com chamada para o catálogo.
// Animações: a foto entra com um zoom lento, um feixe de luz atravessa a imagem,
// partículas douradas sobem e o texto aparece linha a linha.
// Para trocar a foto, substitua public/campanha.jpg (e a versão menor campanha-1200.jpg).
import Nevoa from "./Nevoa";

export default function Campanha() {
  return (
    <section className="campanha abertura" id="inicio" aria-label="Apresentação">
      <div className="campanha-foto">
        <img
          src="/campanha.jpg"
          srcSet="/campanha-1200.jpg 1200w, /campanha.jpg 2200w"
          sizes="100vw"
          alt="Casal sentindo fragrâncias Amakha Paris"
          width={2200}
          height={1228}
          fetchPriority="high"
        />
        <span className="campanha-luz" aria-hidden="true" />
        <Nevoa />
      </div>
      <div className="campanha-txt">
        <div className="eyebrow line ab-1">Amakha Paris · Brasília</div>
        <h1 className="h2 ab-titulo">
          <span className="ab-linha"><span>Uma Fragrância para</span></span>
          <span className="ab-linha"><span><em>Cada Presença</em></span></span>
        </h1>
        <p className="ab-2">Mais de cem fragrâncias Amakha Paris, cada uma com a sua pirâmide olfativa e o clássico que a inspira. Escolha a sua.</p>
        <div className="campanha-acoes ab-3">
          <a className="btn btn-primary" href="#catalogo">Conhecer o catálogo</a>
          <a className="btn btn-descubra" href="#descubra">
            <svg className="brilho" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z" /><path className="mini" d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>
            <span>Descubra sua fragrância</span>
          </a>
        </div>
      </div>
      <a className="ab-rolar" href="#kits" aria-label="Rolar para baixo"><span /></a>
    </section>
  );
}
