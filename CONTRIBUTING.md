## Branches
Toda branch deve seguir o padrão abaixo:
```
feature/escopo   nova funcionalidade
fix/escopo       correção de bug
chore/escopo     configuração, dependências, tarefas técnicas
```

Exemplos: `feature/products`, `fix/cart`, `chore/ci`

## Commits
Todo commit deve seguir o padrão Conventional Commits:
```
tipo(escopo): descrição curta no imperativo
```

Tipos aceitos: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`

Escopos sugeridos: `products`, `cart`, `wishlist`, `auth`, `checkout`, `ui`, `ci`

Exemplos:
- `feat(products): adiciona listagem na home`
- `fix(cart): corrige cálculo do preço com desconto`
- `chore(ci): configura github actions`

## Fluxo de trabalho
1. Crie uma branch a partir da `main`
2. Faça seus commits seguindo o padrão acima
3. Abra um PR para a `main`
4. O CI precisa passar para o merge ser liberado
```

Cria o arquivo na raiz do projeto, commita e pronto. Sugiro o commit:
```
docs(ci): adiciona contributing com padrão de branches e commits