# Site do Layon — Perfumes Amakha Paris

Site de vendas e de recrutamento de consultores do Layon Alves (Brasília e Entorno).
Feito em **Next.js + TypeScript**, publicado na **Vercel**.

No ar: https://layon-site.vercel.app

---

## Onde fica cada coisa

```
src/
  app/
    page.tsx              página inicial (ordem das seções)
    perfume/[slug]/       página de cada produto (/perfume/imortal-15ml), gerada para todos
    kits/  15ml/  100ml/  arabes/   demais páginas
    */opengraph-image.tsx imagem de prévia de cada página (WhatsApp, Instagram)
    layout.tsx            fontes (Playfair, Inter e a cursiva da logo) e título
    globals.css           todo o visual
  components/
    Nav.tsx               menu do topo (links, sacola e botão do menu em tela cheia)
    MenuTela.tsx          menu em tela cheia com faixa de frascos
    Logo.tsx              logo "layon." cursiva, com efeito de escrita
    Hero.tsx  Vitrine.tsx Nevoa.tsx  topo da página inicial (arco com frascos)
    Faixa.tsx             faixa preta deslizante
    Kits.tsx  Catalogo.tsx  TesteDoPerfume.tsx  Historia.tsx  Linhas.tsx  Consultor.tsx
    CardProduto.tsx       cartão de produto (foto e nome levam à página do produto)
    FichaPerfume.tsx      ficha rápida ("Ver notas")
    Carrinho.tsx  BotaoComprar.tsx  Loja.tsx  Grade.tsx  Pagina.tsx  Lista15.tsx
    Rodape.tsx  Animacoes.tsx  Icones.tsx
  data/
    contato.ts  kits.ts  arabes.ts  produtos.json  fichas.json
  lib/
    catalogo.ts  carrinho.ts  nomes.ts  produtos.ts  cartaz.tsx
    perfume.ts            endereço de cada produto, tamanhos, famílias de notas e descrição
  fontes/                 Playfair Display, Inter, Cedarville Cursive (logo) e licenças
scripts/
  atualizar_catalogo.py   confere o catálogo com a loja oficial da Amakha
```

## Tarefas do dia a dia

**Colocar preço num produto** — em `src/data/produtos.json`, troque `"preco": null`
por um número, com ponto no lugar da vírgula:

```json
{"nome": "Imortal 15ml", ..., "preco": 89.9, "ficha": "imortal-m"}
```

O site mostra "R$ 89,90". Com `null`, mostra "Consulte o valor".
Isso vale para kits também: o preço fica sempre em `produtos.json`.
Em `src/data/kits.ts` fica só quais kits aparecem em cada grupo da página /kits.

**Carrinho** — só produto com preço entra no carrinho. Sem preço, o botão vira
"Consultar no WhatsApp". O pedido não cobra nada no site: ele chega pronto no
WhatsApp do Layon (itens, total, nome, entrega e forma de pagamento). Para mudar o
texto da mensagem, edite `mensagemDoPedido` em `src/lib/carrinho.ts`.

**Colocar um perfume de 100ml na página /100ml** — basta dar preço a ele em
`produtos.json`. A página mostra só os de 100ml que têm preço.

**Produto com foto própria ou importado original** — em `produtos.json`, use
`"foto": "/produtos/arquivo.jpg"` (arquivo na pasta `public/produtos/`) e, se for
importado, `"original": "Nome da marca"`. Ele ganha a etiqueta "Original" e, na ficha,
aparece a versão Amakha do mesmo cheiro. Exemplo: Al Sabah Ward e Asad em /arabes.

**Prévia do link** — cada página tem um `opengraph-image.tsx` com título, texto,
preço e as fotos. Mudou o preço? Atualize o texto ali também. As fotos são baixadas
da Amakha na hora do deploy; se a Amakha estiver fora do ar, a prévia sai só com texto.

**Trocar o número do WhatsApp ou o link de cadastro** — só em `src/data/contato.ts`.

**Mudar um texto** — abra o componente da seção (tabela acima) e edite o texto.

**Colocar foto própria** — salve a imagem na pasta `public/` (ex.: `public/layon.jpg`)
e siga o comentário `FOTO:` dentro de `Historia.tsx` ou `Consultor.tsx`.

**Ver produtos novos da Amakha** —
```
python scripts/atualizar_catalogo.py            (só mostra)
python scripts/atualizar_catalogo.py --salvar   (grava)
```
Ele nunca mexe em preço nem em ficha, e não apaga nada sozinho.

## Rodar no computador

Precisa do Node.js 20 ou mais novo (o mesmo que roda o `npx vercel`).

```
cd C:\layon-site
npm install          (só na primeira vez)
npm run dev
```
Abra http://localhost:3000. Cada arquivo salvo aparece na hora no navegador.

Antes de publicar, vale rodar `npm run build`: se tiver erro, ele avisa aqui
em vez de quebrar o site no ar.

## Publicar

```
npx vercel --prod
```

## Cuidados

- As referências "inspirado em" servem só para comparar o cheiro. Não use foto nem
  logo das marcas famosas.
- O texto do consultor não pode prometer ganho. O aviso "resultados variam" fica.
