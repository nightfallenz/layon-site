# Site do Layon — Perfumes Amakha Paris

Site de vendas e de recrutamento de consultores do Layon Alves (Brasília e Entorno).
Feito em **Next.js + TypeScript**, publicado na **Vercel**.

No ar: https://layon-site.vercel.app

---

## Onde fica cada coisa

```
src/
  app/
    page.tsx          página inicial (ordem das seções)
    kits/page.tsx     página /kits (3 em 1, 2 em 1, Premium)
    15ml/page.tsx     página /15ml (escolha: feminino ou masculino)
    15ml/feminino/    página /15ml/feminino
    15ml/masculino/   página /15ml/masculino
    100ml/page.tsx    página /100ml (só os que têm preço)
    layout.tsx        título, descrição e fontes
    globals.css       todo o visual (cores, tamanhos, celular)
    icon.svg          ícone da aba
  components/         uma seção por arquivo
    Nav.tsx               menu do topo
    Hero.tsx              primeira dobra ("Perfumes que Deixam Memória")
    Kits.tsx              Kits em Destaque
    Catalogo.tsx          catálogo com busca e filtros
    CardProduto.tsx       o cartão de cada produto
    FichaPerfume.tsx      janela com as notas do perfume
    TesteDoPerfume.tsx    "Descubra o Seu Perfume"
    Historia.tsx          Nossa história
    Linhas.tsx            Nossas Linhas
    Consultor.tsx         Seja consultor
    Rodape.tsx            rodapé e botão flutuante do WhatsApp
    Loja.tsx              liga catálogo, ficha e teste entre si
    Icones.tsx            ícones
  data/               o conteúdo, separado do visual
    contato.ts            WhatsApp, e-mail, link de cadastro
    kits.ts               quais kits aparecem em /kits e na vitrine
    produtos.json         os ~200 produtos do catálogo
    fichas.json           notas olfativas e "inspirado em" (enciclopédia 2025)
  lib/
    catalogo.ts       regras: busca, filtros, parecidos, teste do perfume
scripts/
  atualizar_catalogo.py   confere o catálogo com a loja oficial da Amakha
_antigo/
  index.html          versão de antes (só backup, não vai para o ar)
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

**Colocar um perfume de 100ml na página /100ml** — basta dar preço a ele em
`produtos.json`. A página mostra só os de 100ml que têm preço.

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
