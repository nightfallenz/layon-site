// Logo "layon." em letra cursiva. Ao abrir a página, ela aparece como se fosse escrita.
export default function Logo({ comoTexto = false }: { comoTexto?: boolean }) {
  const letra = <span className="logo-escrita">layon.</span>;
  return comoTexto ? <div className="logo logo-l">{letra}</div> : <a className="logo logo-l" href="/" aria-label="Layon, página inicial">{letra}</a>;
}
