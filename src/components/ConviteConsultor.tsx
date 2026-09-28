// Slide 2 da abertura: convite para ser consultor(a). O botão leva à seção #consultor da página.
// Para trocar a foto, substitua public/consultor.jpg (e a versão menor consultor-1200.jpg).
// Cuidado: o texto não pode prometer ganho. O aviso no fim fica.

export default function ConviteConsultor() {
  return (
    <div className="convite">
      <div className="convite-foto">
        <img
          src="/consultor.jpg"
          srcSet="/consultor-1200.jpg 1200w, /consultor-1920.jpg 1920w, /consultor.jpg 2752w"
          sizes="100vw"
          alt="Consultor Amakha Paris segurando perfumes de bolso"
          width={2752}
          height={1536}
          decoding="async"
        />
      </div>
      <div className="convite-txt">
        <div className="eyebrow line ab-1">Seja consultor(a) Amakha Paris</div>
        <h2 className="h2 ab-titulo">
          <span className="ab-linha"><span>Transforme Sua Paixão</span></span>
          <span className="ab-linha"><span><em>em Negócio</em></span></span>
        </h2>
        <blockquote className="convite-frase ab-2">
          <p>
            “Eu não vendo perfume. Apresento a cada pessoa a fragrância pela qual ela será lembrada. Se isso também
            desperta algo em você, há um lugar reservado na minha equipe.”
          </p>
          <cite>Layon Alves, consultor executivo Amakha Paris</cite>
        </blockquote>
        <p className="convite-apoio ab-2">
          Os perfumes de bolso mais desejados do Brasil, uma marca que se apresenta sozinha e alguém ao seu lado desde
          o primeiro pedido.
        </p>
        <div className="campanha-acoes ab-3">
          <a className="btn btn-descubra" href="#consultor">
            <span>Cadastre-se agora</span>
            <svg className="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <small className="convite-legal ab-3">Cadastro sujeito às regras da Amakha Paris. Resultados variam de pessoa para pessoa.</small>
      </div>
    </div>
  );
}
