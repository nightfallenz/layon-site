// Faixa que desliza devagar logo abaixo do topo, com os diferenciais do Layon.
const FRASES = [
  "Entrega em mãos em Brasília e Entorno",
  "Perfumes 15ml por R$ 45,00",
  "Kits prontos para presentear",
  "Veja o importado parecido e as notas",
  "Peça pelo WhatsApp",
  "Seja consultor Amakha Paris",
];

export default function Faixa() {
  const itens = [...FRASES, ...FRASES];
  return (
    <div className="faixa" aria-label={FRASES.join(". ")}>
      <div className="faixa-trilho" aria-hidden="true">
        {itens.map((f, i) => (
          <span key={i}>{f}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
