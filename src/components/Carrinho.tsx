"use client";
// Carrinho do site inteiro: guarda os itens no navegador, mostra a gaveta lateral
// e fecha o pedido mandando tudo escrito para o WhatsApp do Layon.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { linkWhats } from "@/data/contato";
import { imagem, precoTexto, type Produto } from "@/lib/catalogo";
import {
  PAGAMENTOS, QTD_MAX, mensagemDoPedido, montarItens, quantidadeDe, totalDe,
  type DadosPedido, type Item, type ItemGuardado,
} from "@/lib/carrinho";
import { nomeVitrine } from "@/lib/nomes";

const CHAVE = "layon-carrinho-v1";

type Ctx = {
  itens: Item[];
  quantidade: number;
  adicionar: (p: Produto) => void;
  abrir: () => void;
};
const Contexto = createContext<Ctx | null>(null);

export function useCarrinho(): Ctx {
  const c = useContext(Contexto);
  if (!c) throw new Error("useCarrinho precisa estar dentro de <Carrinho>");
  return c;
}

function ler(): ItemGuardado[] {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => x && typeof x.nome === "string" && typeof x.qtd === "number") : [];
  } catch {
    return [];
  }
}
function gravar(v: ItemGuardado[]) {
  try { localStorage.setItem(CHAVE, JSON.stringify(v)); } catch { /* navegador sem armazenamento: segue só na memória */ }
}

export default function Carrinho({ children }: { children: ReactNode }) {
  const [guardados, setGuardados] = useState<ItemGuardado[]>([]);
  const [carregou, setCarregou] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const gaveta = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => { setGuardados(ler()); setCarregou(true); }, []);
  useEffect(() => { if (carregou) gravar(guardados); }, [guardados, carregou]);

  const itens = useMemo(() => montarItens(guardados), [guardados]);

  const mudarQtd = (nome: string, qtd: number) =>
    setGuardados((g) => (qtd <= 0 ? g.filter((x) => x.nome !== nome) : g.map((x) => (x.nome === nome ? { ...x, qtd: Math.min(qtd, QTD_MAX) } : x))));

  const adicionar = useCallback((p: Produto) => {
    setGuardados((g) => {
      const achou = g.find((x) => x.nome === p.nome);
      return achou ? g.map((x) => (x.nome === p.nome ? { ...x, qtd: Math.min(x.qtd + 1, QTD_MAX) } : x)) : [...g, { nome: p.nome, qtd: 1 }];
    });
    setAviso(nomeVitrine(p));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(null), 3500);
  }, []);

  const abrir = useCallback(() => { setAviso(null); gaveta.current?.showModal(); }, []);

  return (
    <Contexto.Provider value={{ itens, quantidade: quantidadeDe(itens), adicionar, abrir }}>
      {children}
      <dialog className="gaveta" ref={gaveta} aria-labelledby="gaveta-t" onClick={(e) => { if (e.target === gaveta.current) gaveta.current?.close(); }}>
        <Gaveta itens={itens} mudarQtd={mudarQtd} esvaziar={() => setGuardados([])} fechar={() => gaveta.current?.close()} />
      </dialog>
      {aviso && (
        <div className="toast" role="status">
          <span><b>Adicionado:</b> {aviso}</span>
          <button type="button" onClick={abrir}>Ver carrinho</button>
        </div>
      )}
    </Contexto.Provider>
  );
}

const DADOS_INICIAIS: DadosPedido = { nome: "", entrega: "entrega", local: "", pagamento: "Pix", obs: "", presente: false, cartaoDe: "", cartaoPara: "", cartaoMsg: "" };

function Gaveta({ itens, mudarQtd, esvaziar, fechar }: { itens: Item[]; mudarQtd: (n: string, q: number) => void; esvaziar: () => void; fechar: () => void }) {
  const [d, setD] = useState<DadosPedido>(DADOS_INICIAIS);
  const [enviado, setEnviado] = useState(false);
  const total = totalDe(itens);

  return (
    <div className="gaveta-in">
      <div className="gaveta-top">
        <h2 id="gaveta-t">Seu pedido</h2>
        <button type="button" className="gaveta-x" aria-label="Fechar carrinho" onClick={fechar}>×</button>
      </div>

      {itens.length === 0 ? (
        <div className="gaveta-vazia">
          <p>{enviado ? "Pronto! O Layon vai te responder no WhatsApp." : "Seu carrinho está vazio."}</p>
          <a className="btn btn-outline" href="/15ml" onClick={fechar}>Ver perfumes</a>
        </div>
      ) : (
        <>
          <ul className="gaveta-lista">
            {itens.map(({ produto: p, qtd, subtotal }) => (
              <li key={p.nome}>
                <img src={imagem(p.imagem, p.ext, 200)} alt="" width={72} height={72} />
                <div className="gi-info">
                  <div className="gi-nome">{nomeVitrine(p)}</div>
                  <div className="gi-preco">{precoTexto(p.preco)} cada</div>
                  <div className="qtd" role="group" aria-label={`Quantidade de ${nomeVitrine(p)}`}>
                    <button type="button" aria-label="Diminuir" onClick={() => mudarQtd(p.nome, qtd - 1)}>−</button>
                    <span aria-live="polite">{qtd}</span>
                    <button type="button" aria-label="Aumentar" disabled={qtd >= QTD_MAX} onClick={() => mudarQtd(p.nome, qtd + 1)}>+</button>
                  </div>
                </div>
                <div className="gi-dir">
                  <div className="gi-sub">{precoTexto(subtotal)}</div>
                  <button type="button" className="gi-rem" onClick={() => mudarQtd(p.nome, 0)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>

          <form
            className="gaveta-form"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(linkWhats(mensagemDoPedido(itens, d)), "_blank", "noopener");
              setEnviado(true);
            }}
          >
            {enviado && (
              <div className="gaveta-ok" role="status">
                <p>Abrimos o WhatsApp com o seu pedido. É só tocar em enviar lá.</p>
                <div>
                  <button type="button" className="btn btn-outline" onClick={() => { esvaziar(); setD(DADOS_INICIAIS); }}>Já enviei, esvaziar carrinho</button>
                </div>
              </div>
            )}
            <div className="gaveta-total"><span>Total</span><strong>{precoTexto(total)}</strong></div>

            <label className="campo">Seu nome
              <input value={d.nome} onChange={(e) => setD({ ...d, nome: e.target.value })} autoComplete="name" required maxLength={60} />
            </label>

            <fieldset className="campo-op">
              <legend>Como você quer receber?</legend>
              <label><input type="radio" name="entrega" checked={d.entrega === "entrega"} onChange={() => setD({ ...d, entrega: "entrega" })} /> Entrega em mãos</label>
              <label><input type="radio" name="entrega" checked={d.entrega === "retirada"} onChange={() => setD({ ...d, entrega: "retirada" })} /> Retirar com o Layon</label>
            </fieldset>

            {d.entrega === "entrega" && (
              <label className="campo">Bairro ou cidade
                <input value={d.local} onChange={(e) => setD({ ...d, local: e.target.value })} placeholder="Ex.: Águas Claras" autoComplete="address-level2" required maxLength={80} />
              </label>
            )}

            <fieldset className="campo-op">
              <legend>Forma de pagamento</legend>
              {PAGAMENTOS.map((p) => (
                <label key={p}><input type="radio" name="pag" checked={d.pagamento === p} onChange={() => setD({ ...d, pagamento: p })} /> {p}</label>
              ))}
            </fieldset>

            <div className={`presente${d.presente ? " on" : ""}`}>
              <label className="presente-chk">
                <input type="checkbox" checked={d.presente} onChange={(e) => setD({ ...d, presente: e.target.checked })} />
                <span>
                  <strong>É para presente</strong>
                  <small>Vai embalado, com cartão escrito do seu jeito</small>
                </span>
              </label>
              {d.presente && (
                <div className="presente-campos">
                  <div className="presente-linha">
                    <label className="campo">Para
                      <input value={d.cartaoPara} onChange={(e) => setD({ ...d, cartaoPara: e.target.value })} maxLength={40} placeholder="Ex.: Ana" />
                    </label>
                    <label className="campo">De
                      <input value={d.cartaoDe} onChange={(e) => setD({ ...d, cartaoDe: e.target.value })} maxLength={40} placeholder="Ex.: Pedro" />
                    </label>
                  </div>
                  <label className="campo">Mensagem do cartão <small>(opcional)</small>
                    <textarea value={d.cartaoMsg} onChange={(e) => setD({ ...d, cartaoMsg: e.target.value })} maxLength={200} rows={3} placeholder="Ex.: Feliz aniversário! Esse cheiro é a sua cara." />
                  </label>
                </div>
              )}
            </div>

            <label className="campo">Observação <small>(opcional)</small>
              <input value={d.obs} onChange={(e) => setD({ ...d, obs: e.target.value })} placeholder="Ex.: melhor horário para entrega" maxLength={140} />
            </label>

            <button type="submit" className="btn btn-primary gaveta-enviar">{enviado ? "Abrir o WhatsApp de novo" : "Enviar pedido pelo WhatsApp"}</button>
            <p className="gaveta-nota">Nada é cobrado aqui. O pedido chega pronto no WhatsApp do Layon, que confirma o estoque, a entrega e o pagamento com você.</p>
            <button type="button" className="gi-rem" style={{ alignSelf: "center" }} onClick={esvaziar}>Esvaziar carrinho</button>
          </form>
        </>
      )}
    </div>
  );
}
