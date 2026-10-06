// Vitrine de kits na página inicial: os 6 Kits Premium, compactos. O cartão completo (com o que vem no kit e a conta) fica em /kits.
import { KITS_PREMIUM } from "@/data/kits";
import { fichaDe, fotoDe, precoTexto } from "@/lib/catalogo";
import { linkDe } from "@/lib/perfume";
import { GENERO, pegar } from "@/lib/produtos";
import { PRODUTOS } from "@/lib/catalogo";

export default function Kits() {
  return (
    <section id="kits" className="section cream center">
      <div className="eyebrow">Kits completos</div>
      <h2 className="h2">A Fragrância <em>Completa</em></h2>
      <p className="lead">Uma mesma fragrância em todas as suas formas, reunida num só kit.</p>
      <p className="kv-nota">Em cada kit: perfume 100ml, perfume 15ml, body splash 100ml e hidratante 80ml.</p>
      <ul className="kv-lista" aria-label="Kits Premium" tabIndex={0}>
        {pegar(KITS_PREMIUM.produtos).map((k) => {
          const base = k.nome.replace(/^Kit Premium /, "");
          const p100 = PRODUTOS.find((p) => p.nome === `${base} 100ml`);
          const ficha = p100 ? fichaDe(p100) : null;
          return (
            <li key={k.nome}>
              <a className="kv-card" href={linkDe(k)}>
                <div className="kv-foto"><img src={fotoDe(k, 600)} alt="" loading="lazy" width={600} height={600} /></div>
                <div className="kv-corpo">
                  {ficha && <span className="kv-genero">{GENERO[ficha.genero]}</span>}
                  <h3 className="kv-nome">{base}</h3>
                  {ficha && <p className="kv-insp">Inspirado em {ficha.inspiradoEm}</p>}
                  <span className="kv-preco">{precoTexto(k.preco)}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      <a className="btn btn-outline" style={{ marginTop: 40 }} href="/kits">Ver todos os kits</a>
    </section>
  );
}
