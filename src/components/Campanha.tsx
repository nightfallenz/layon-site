// Apresentação: foto grande em largura total com chamada para o catálogo.
// Para trocar a foto, substitua public/campanha.jpg (e a versão menor campanha-1200.jpg).
export default function Campanha() {
  return (
    <section className="campanha" aria-label="Apresentação">
      <div className="campanha-foto">
        <img
          src="/campanha.jpg"
          srcSet="/campanha-1200.jpg 1200w, /campanha.jpg 2200w"
          sizes="100vw"
          alt="Casal sentindo fragrâncias Amakha Paris"
          width={2200}
          height={1228}
          loading="lazy"
        />
      </div>
      <div className="campanha-txt">
        <div className="eyebrow line">Amakha Paris · Brasília</div>
        <h2 className="h2">Uma Fragrância para <em>Cada Presença</em></h2>
        <p>Mais de cem fragrâncias Amakha Paris, cada uma com a sua pirâmide olfativa e o clássico que a inspira. Escolha a sua.</p>
        <div className="campanha-acoes">
          <a className="btn btn-primary" href="#catalogo">Conhecer o catálogo</a>
        </div>
      </div>
    </section>
  );
}
