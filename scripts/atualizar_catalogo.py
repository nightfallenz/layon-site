"""
Confere o catálogo do site com a loja oficial da Amakha Paris.

Uso (na pasta do site):
    python scripts/atualizar_catalogo.py            -> só mostra o que mudou
    python scripts/atualizar_catalogo.py --salvar   -> grava em src/data/produtos.json

O que ele faz:
- Adiciona produtos novos que estão disponíveis na loja (com grupo adivinhado pelo nome
  e pela categoria; confira depois).
- Atualiza a foto dos produtos que já existem.
- Lista os que sumiram ou esgotaram, mas NÃO apaga: você decide.
- Nunca mexe em "preco" nem em "ficha", que são preenchidos por vocês.

Só usa a biblioteca padrão do Python 3.10+, não precisa instalar nada.
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

API = "https://www.amakhaparis.com.br/api/catalog_system/pub/products/search?_from={ini}&_to={fim}"
ARQUIVO = Path(__file__).resolve().parent.parent / "src" / "data" / "produtos.json"

# Itens da loja que não entram no catálogo do site
IGNORAR = re.compile(r"suplement|livro|sacola|caixa|vale[- ]presente|infantil|kids|display|amostra", re.I)


def buscar_loja() -> list[dict]:
    """Baixa todos os produtos da loja, de 50 em 50 (limite da API)."""
    todos: list[dict] = []
    ini = 0
    while True:
        req = urllib.request.Request(API.format(ini=ini, fim=ini + 49), headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            pagina = json.load(r)
        if not pagina:
            break
        todos.extend(pagina)
        ini += 50
        if ini > 2500:  # trava de segurança
            break
    return todos


def disponivel(prod: dict) -> bool:
    for item in prod.get("items", []):
        for vendedor in item.get("sellers", []):
            if vendedor.get("commertialOffer", {}).get("AvailableQuantity", 0) > 0:
                return True
    return False


def foto(prod: dict) -> tuple[int, str] | None:
    """Tira o id e a extensão da URL da foto (…/arquivos/ids/163231/nome.jpg)."""
    try:
        url = prod["items"][0]["images"][0]["imageUrl"]
    except (KeyError, IndexError):
        return None
    m = re.search(r"/ids/(\d+)[^/]*/[^/?]+\.(\w+)", url)
    return (int(m.group(1)), m.group(2).lower()) if m else None


def adivinhar_grupo(nome: str, categorias: list[str]) -> str:
    texto = f"{nome} {' '.join(categorias)}".lower()
    if "kit" in texto or "trio" in texto or "coleção" in texto:
        return "K"
    if "body splash" in texto:
        return "B"
    if re.search(r"hidratante|shampoo|condicionador|capilar|sabonete|óleo|creme", texto):
        return "C"
    if "unissex" in texto:
        return "U"
    if "masculin" in texto:
        return "M"
    return "F"


def limpar_nome(nome: str) -> str:
    # A loja escreve "Deo Parfum Imortal 15ml Insp. Invictus"; no site fica "Imortal 15ml".
    nome = re.sub(r"\s*[-–]?\s*Insp\..*$", "", nome, flags=re.I)
    nome = re.sub(r"^(Deo\s+)?(Parfum|Colônia|Perfume)\s+", "", nome, flags=re.I)
    return re.sub(r"\s+", " ", nome).strip()


def main() -> None:
    salvar = "--salvar" in sys.argv
    atuais: list[dict] = json.loads(ARQUIVO.read_text(encoding="utf-8"))
    por_nome = {p["nome"].lower(): p for p in atuais}

    print("Baixando a loja da Amakha…")
    loja = buscar_loja()
    print(f"{len(loja)} produtos na loja.\n")

    vistos: set[str] = set()
    novos: list[dict] = []
    fotos_trocadas = 0

    for prod in loja:
        nome = limpar_nome(prod.get("productName", ""))
        if not nome or IGNORAR.search(nome):
            continue
        chave = nome.lower()
        vistos.add(chave)
        f = foto(prod)
        existente = por_nome.get(chave)
        if existente:
            if f and (existente["imagem"], existente["ext"]) != f:
                existente["imagem"], existente["ext"] = f
                fotos_trocadas += 1
            continue
        if not disponivel(prod) or not f:
            continue
        novo = {
            "nome": nome,
            "grupo": adivinhar_grupo(nome, prod.get("categories", [])),
            "familia": None,
            "imagem": f[0],
            "ext": f[1],
            "preco": None,
        }
        novos.append(novo)

    sumiram = [p["nome"] for p in atuais if p["nome"].lower() not in vistos]

    print(f"Novos disponíveis: {len(novos)}")
    for n in novos:
        print(f"  + {n['nome']}  (grupo {n['grupo']}, confira)")
    print(f"Fotos atualizadas: {fotos_trocadas}")
    print(f"Não encontrados na loja (não apaguei): {len(sumiram)}")
    for n in sumiram:
        print(f"  ? {n}")

    if salvar:
        linhas = [json.dumps(p, ensure_ascii=False) for p in atuais + novos]
        ARQUIVO.write_text("[\n" + ",\n".join(linhas) + "\n]\n", encoding="utf-8")
        print(f"\nSalvo em {ARQUIVO}")
    else:
        print("\nNada foi gravado. Rode de novo com --salvar para gravar.")


if __name__ == "__main__":
    main()
