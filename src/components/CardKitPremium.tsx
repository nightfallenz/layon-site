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
  const splash = achar(`Body Splash ${base} 100ml`);
  const creme = achar(`Creme Hidratante ${base} 80ml`);
  const ficha = p100 ? fichaDe(p100) : null;
  const itens = [p100, p15, splash, creme].map((p) => p?.preco);
  const soma = itens.every((v) => v != null) ? (itens as number[]).reduce((a, b) => a + b, 0) : null;
  const avulso = soma != null && kit.preco != null && soma > kit.preco ? soma : null; // só mostra se de fato for mais barato no kit
  const link = linkDe(kit);

  return (
    <article className="kp">
      <a className="kp-foto" href={link} tabIndex={-1} aria-hidden="true">
        <img src={fotoDe(kit, 800)} srcSet={kit.foto ? undefined : `${fotoDe(kit, 600)} 600w, ${fotoDe(kit, 900)} 900w, ${fotoDe(kit, 1200)} 1200w`} sizes="(max-width:600px) 92vw, (max-width:900px) 46vw, 380px" alt="" loading="lazy" />
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
          {avulso && <span className="kp-conta">Os quatro itens, avulsos, somam {precoTexto(avulso)}</span>}
        </div>
        <BotaoComprar produto={kit} grande />
        <a className="kp-ver" href={link}>Ver detalhes do kit</a>
      </div>
    </article>
  );
}
