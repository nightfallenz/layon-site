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
    arabes/page.tsx   página /arabes (Linha Árabe)
    */opengraph-image.tsx   imagem de prévia de cada página (WhatsApp, Instagram)
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
    Carrinho.tsx          carrinho do site todo + envio do pedido pelo WhatsApp
    BotaoComprar.tsx      "Adicionar ao carrinho" ou "Consultar no WhatsApp"
    Animacoes.tsx         efeitos ao rolar, barra de progresso, parallax do topo
    Nevoa.tsx             partículas douradas no topo da página inicial
    Faixa.tsx             faixa preta deslizante abaixo do topo (frases editáveis)
    Icones.tsx            ícones
  data/               o conteúdo, separado do visual
    contato.ts            WhatsApp, e-mail, link de cadastro
    kits.ts               quais kits aparecem em /kits e na vitrine
    arabes.ts             quais produtos aparecem em /arabes
    produtos.json         os ~200 produtos do catálogo
    fichas.json           notas olfativas e "inspirado em" (enciclopédia 2025)
  lib/
    catalogo.ts       regras: busca, filtros, parecidos, teste do perfume
    carrinho.ts       regras do carrinho e texto da mensagem do pedido
    nomes.ts          nome de vitrine ("Duo Fragrâncias GD" vira "Kit 2 em 1 · GD")
    cartaz.tsx        desenho da imagem de prévia dos links
  fontes/             Playfair Display e Inter servidas pelo próprio site (licença OFL)
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
