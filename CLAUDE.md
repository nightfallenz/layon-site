# Site do Layon — Perfumes Amakha Paris

Site de vendas e de recrutamento de consultores do Layon Alves (Brasília e Entorno). É projeto de **cliente**: o Eike constrói e mantém. Next.js + TypeScript, publicado na Cloudflare (https://layonamakhaparis.com.br). **Responda sempre em português.**

O `README.md` é o manual completo (onde fica cada componente e as tarefas do dia a dia). Leia antes de mexer.

## Fontes de verdade
- **Preço:** só em `src/data/produtos.json` (`"preco": null` mostra "Consulte o valor"; número com ponto decimal). Vale para kits também.
- **Contato (WhatsApp, cadastro de consultor):** só em `src/data/contato.ts`.
- **Mensagem do pedido no WhatsApp:** `mensagemDoPedido` em `src/lib/carrinho.ts`.
- **Quais kits aparecem em cada grupo:** `src/data/kits.ts`.
- **Notas olfativas:** `src/data/fichas.json`.
- Visual inteiro em `src/app/globals.css` (sem Tailwind).

## Como o site funciona
- O carrinho **não cobra nada**: o pedido chega pronto no WhatsApp do Layon. Só produto com preço entra no carrinho.
- `/100ml` mostra só os de 100ml com preço.
- Cada página tem `opengraph-image.tsx` (prévia no WhatsApp/Instagram). **Mudou preço? Atualize o texto da prévia também.**
- `scripts/atualizar_catalogo.py` confere com a loja oficial da Amakha. Sem `--salvar` só mostra. Nunca mexe em preço nem em ficha e não apaga produto.

## Cuidados que não se quebram
- As referências "inspirado em" servem só para comparar o cheiro. **Nunca** use foto ou logo das marcas famosas.
- Texto para consultor **não pode prometer ganho**. O aviso "resultados variam" fica.
- Não inventar preço, depoimento ou número de vendas.
- `_antigo/` e `_instalar/` não fazem parte do site.

## Antes de entregar
```
npm run check
npm run build
```
Depois, para publicar:
```
npm run build   # publica pelo Git da Cloudflare (push na main); manual: npx wrangler deploy
```
