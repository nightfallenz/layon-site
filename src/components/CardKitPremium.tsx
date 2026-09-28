// Cartão do Kit Premium (o kit mais caro): moldura, o que vem no kit, a referência do cheiro
// e a conta honesta de quanto os dois perfumes custam avulsos no próprio site.
import type { Produto } from "@/lib/catalogo";
import { fichaDe, fotoDe, precoTexto, PRODUTOS } from "@/lib/catalogo";
import { GENERO } from "@/lib/produtos";
import { linkDe } from "@/lib/perfume";
import BotaoComprar from "./BotaoComprar";

const ITENS = [
  ["Perfume", "100ml"],
  ["Perfume de bolsa", "15ml"],
  ["Body splash", "100ml"],
  ["Hidratante corporal", "80ml"],
];

const achar = (nome: string) => PRODUTOS.find((p) => p.nome === nome);

export default function CardKitPremium({ kit }: { kit: Produto }) {
  const base = kit.nome.replace(/^Kit Premium /, "");
  const p100 = achar(`${base} 100ml`);
  const p15 = achar(`${base} 15ml`);
  const ficha = p100 ? fichaDe(p100) : null;
  const avulso = p100?.preco != null && p15?.preco != null ? p100.preco + p15.preco : null;
  const link = linkDe(kit);

  return (
    <article className="kp">
      <a className="kp-foto" href={link} tabIndex={-1} aria-hidden="true">
        <img src={fotoDe(kit, 600)} alt="" loading="lazy" />
        <span className="kp-selo">Kit completo</span>
        {ficha && <span className="kp-genero">{GENERO[ficha.genero]}</span>}
      </a>
      <div className="kp-corpo">
        <div className="kp-sobre">Kit Premium</div>
        <h3><a href={link}>{base}</a></h3>
        {ficha && <p className="kp-insp">Inspirado em {ficha.inspiradoEm}, {ficha.marca}</p>}
        <ul className="kp-itens" aria-label="O que vem no kit">
          {ITENS.map(([item, ml]) => (
            <li key={item}><span>{item}</span><span className="kp-ml">{ml}</span></li>
          ))}
        </ul>
        <div className="kp-preco">
          <span className="kp-valor">{precoTexto(kit.preco)}</span>
          {avulso && <span className="kp-conta">Só os dois perfumes, avulsos, somam {precoTexto(avulso)}</span>}
        </div>
        <BotaoComprar produto={kit} grande />
        <a className="kp-ver" href={link}>Ver detalhes do kit</a>
      </div>
    </article>
  );
}
