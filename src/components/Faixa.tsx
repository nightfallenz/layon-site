// Faixa que desliza devagar logo abaixo do topo, com os diferenciais do Layon.
const FRASES = [
  "Entrega por Uber Flash ou 99Entrega · Brasília e Entorno",
  "Curadoria pessoal",
  "Kits completos da mesma fragrância",
  "Pirâmide olfativa de cada fragrância",
  "Atendimento reservado",
  "Linha Árabe e originais importados",
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
