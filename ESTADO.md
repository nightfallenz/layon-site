# Estado do site do Layon (atualizado em 06/10/2026)

## O que é
Site de vendas de perfumes Amakha + recrutamento de consultores. Next.js 16 (`output: export`), Cloudflare Workers. Domínio `layonamakhaparis.com.br` em migração da Vercel para a Cloudflare (teste OK em `layon-site.eikeklein0.workers.dev`). Manual: `README.md`; regras: `CLAUDE.md`.

## Catálogo (Fase 1 feita, NÃO publicada)
- `src/data/produtos.json`: 215 produtos (202 + 13 novos da loja oficial), 39 fotos atualizadas. Preços antigos e nomes intactos. Revisão aprovou.
- 82 itens sem preço (`preco: null`), aguardando o Layon. Grupos: K 34, C 33, B 11, F 3, M 1.
- Fora do catálogo por decisão do Eike: suplementos, infantil, caixa, sacola, vale-presente, livro, Shakeira, energético, chá. Esgotados na loja oficial entram normalmente. Al Sabah Ward Original e Asad Original ficam.
- Novos sem `ficha` (notas olfativas): Miss, Addictive, La Lune, Mythology. Não inventar notas.
- `scripts/atualizar_catalogo.py` casa por nome exato e acusa falso "novo/sumido"; o cruzamento por nome normalizado foi feito à mão.

## Fase 2: repaginar (especificação da Design pronta, nada implementado)
Fases pequenas, cada uma com `npm run check` + build + Revisão + conferência 390x844 e 1440x900:
1. `globals.css` (tokens, `.pcard`, `.sem-preco`, contraste do `.pfam` para #7A6830, hover mais discreto), `CardProduto.tsx` (tamanho como chip, preço mais forte, ação "Perguntar no WhatsApp", foco, `onError` da imagem), `BotaoComprar.tsx`, `lib/catalogo.ts` (com preço antes de sem preço).
2. `Catalogo.tsx` (busca grande, chips-link, gaveta de filtros, 12 por vez no celular), `MenuTela.tsx` (7 itens), `Nav.tsx` (lupa).
3. `CompraPor.tsx` novo + `page.tsx`, `Kits.tsx` (3 premium), `Linhas.tsx` (rever), `/catalogo` novo com filtro por URL.
4. `/corpo` novo (body splash + corpo e cabelo), aviso único em `/kits`, `srcset`/`sizes`, skeleton.

## Decisões pendentes do Eike
1. Catalogo completo sai da home e vai para `/catalogo`?
2. Existe esgotado "de verdade"? Criar campo `indisponivel` em `produtos.json`?
3. Prazo de resposta no WhatsApp ("em minutos") só com confirmação do Layon.
4. Criar `/corpo` ou manter body splash e corpo e cabelo só no catálogo?
5. Raio dos botões: quadrado (recomendado) ou 12px em tudo.
6. Remover `Linhas.tsx` da home se ficar redundante (ver no navegador).

## Próximo passo
Eike responde 1, 2 e 4 → implementar Fase 2.1. Preços do Layon entram em `produtos.json` quando chegarem (atualizar também o texto das prévias `opengraph-image.tsx`).

## Como rodar e testar
`npm run check` e `npm run build`. Publicar: push na `main` (Cloudflare faz o deploy).
