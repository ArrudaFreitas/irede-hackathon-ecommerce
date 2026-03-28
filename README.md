# 🛒 Mercado irede

Marketplace desenvolvido para o Hackathon irede — inspirado no Mercado Livre, construído com Vue 3, TypeScript e boas práticas de arquitetura frontend.

---

## ✨ Funcionalidades

- 🔍 **Busca e filtro** por palavras-chave e categoria
- 📦 **Listagem de produtos** com paginação
- 🛍️ **Detalhe do produto** com galeria de imagens, avaliações e informações de logística
- 🛒 **Carrinho** com resumo de compra e persistência por sessão
- ❤️ **Wishlist** (favoritos) persistida por usuário
- 🔐 **Autenticação JWT** com renovação automática de token
- 📱 **Responsivo** — header adaptado para desktop e mobile

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ArrudaFreitas/irede-hackathon-ecommerce.git
cd irede-hackathon-ecommerce

# inicie o container pela primeira vez
docker compose up -d --build

# inicie o conteiner nas próximas
docker compose up -d

# parar o conteiner 
docker compose down

# Copie o arquivo de variáveis de ambiente
cp .env.example .env
```

A aplicação estará disponível em `http://localhost:5173`.


### Credenciais de teste

Qualquer usuário da [DummyJSON](https://dummyjson.com/users) pode ser usado. Exemplo:

| Campo    | Valor        |
|----------|--------------|
| Username | `emilys`     |
| Senha    | `emilyspass` |

---

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** com responsabilidades bem definidas:

```
src/
├── models/      → Interfaces TypeScript (sem lógica, só tipos)
├── services/    → Chamadas HTTP via Axios (único lugar com fetch)
├── stores/      → Estado global com Pinia + persistência em localStorage
├── composables/ → Estado reativo local: loading, error, dados paginados
├── views/       → Páginas — orquestram stores e componentes
├── components/  → Componentes visuais reutilizáveis (recebem props, emitem eventos)
└── router/      → Rotas com guards de autenticação
```

### Fluxo de dados

```
Component → View → Store → Service → API
                 ↘ Composable ↗
```

### Persistência por usuário

Wishlist e carrinho são isolados por `userId` no localStorage:

```
wishlist_user_5  → [12, 34, 89]
cart_user_5      → [{ productId, quantity, price }]
```

Ao fazer logout, o estado em memória é limpo — os dados do localStorage são mantidos e restaurados no próximo login com o mesmo usuário.

---

## ⚙️ CI

O pipeline roda a cada push e pull request:

```
lint → type-check → build
```

Nenhum código com erro de lint ou de tipo entra na branch principal. Merges diretos na `main` são bloqueados — toda mudança passa por Pull Request.

---

## 📁 Padrão de commits

O projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): descrição
fix(scope): descrição
refactor(scope): descrição
chore(scope): descrição
docs(scope): descrição
```

---

## 👥 Equipe

Desenvolvido pela equipe **Ian Arruda, Gustavo Erick, Everton Correia** para o Hackathon irede.
