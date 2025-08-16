# ERP Financeiro – Repositório & Arquitetura

Bem-vindo ao repositório do projeto **ERP Financeiro** 🎉

Este projeto é um MVP (mínimo produto viável) de **ERP financeiro** com funcionalidades de contas a pagar, contas a receber, emissão de boletos simulados, notas fiscais simuladas, cobrança e dashboard de indicadores.

---

## 🏗️ Arquitetura

### Frontend

* **Framework:** Angular 18+
* **Bibliotecas:** Apollo Angular, Angular Material
* **Organização:**

  * `auth/` → Login, autenticação JWT
  * `dashboard/` → KPIs e gráficos
  * `cadastros/` → Clientes, Fornecedores, Produtos/Serviços, Contas Bancárias
  * `financeiro/` → Contas a Pagar e a Receber
  * `fiscal/` → Emissão de notas
  * `cobranca/` → Timeline de cobrança

### Backend

* **Framework:** NestJS + GraphQL (Apollo Server)
* **Banco de dados:** PostgreSQL (via Prisma ORM)
* **Organização:**

  * `auth/` → Login, JWT, RBAC
  * `companies/` → Multi-empresa (multi-tenant)
  * `users/` → Usuários e permissões
  * `partners/` → Clientes e Fornecedores
  * `catalog/` → Produtos e Serviços
  * `finance/` → Recebíveis, Pagáveis, Boletos
  * `billing/` → Notas fiscais
  * `notifications/` → Envio de e-mails simulados
  * `audit/` → Logs e auditoria

### Infraestrutura

* **Banco:** PostgreSQL
* **ORM:** Prisma (migrations, seeds)
* **Docker:** Containers para API, Frontend e DB
* **Segurança:** JWT com `company_id` no payload, roles por usuário (ADMIN, FINANCE, VIEWER)

---

## 📂 Estrutura do Repositório

```bash
erp-financeiro/
├── api/              # Backend NestJS + GraphQL + Prisma
│   ├── src/modules/   # Módulos organizados por domínio
│   ├── prisma/        # Schema e seeds do banco
│   └── ...
├── web/              # Frontend Angular + Apollo
│   ├── src/app/       # Módulos Angular
│   └── ...
├── docs/             # Documentação
└── README.md          # Este arquivo ✨
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

* Node.js 20+
* PostgreSQL 14+
* Docker (opcional, para rodar tudo containerizado)

### Backend (API)

```bash
cd api
npm install
npx prisma migrate dev
npm run start:dev
```

### Frontend (WEB)

```bash
cd web
npm install
npm start
```

### Acesso

* **Frontend:** [http://localhost:4200](http://localhost:4200)
* **Backend (GraphQL Playground):** [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🧩 Funcionalidades do MVP

✔️ **Autenticação JWT** (login, multi-empresa, RBAC)

✔️ **Cadastros básicos:** Clientes, Fornecedores, Produtos/Serviços, Contas Bancárias

✔️ **Financeiro – A Receber:**

* Lançamento de recebíveis
* Geração de boletos simulados (PDF, linha digitável)
* Marcação como pago/atrasado

✔️ **Financeiro – A Pagar:**

* Lançamento de contas a pagar
* Upload de comprovantes
* Marcação como pago/atrasado

✔️ **Fiscal (Notas simuladas):**

* Emissão e cancelamento de notas fiscais fake
* PDF com chave de acesso simulada

✔️ **Cobrança:**

* Registro de eventos (e-mails, WhatsApp, telefone)
* Timeline por cliente

✔️ **Dashboard:**

* KPIs de contas a pagar/receber
* Gráficos de inadimplência e fluxo de caixa

---

## 📌 Kanban & Backlog

* **To Do:** Planejamento e criação do repositório, setup da API, setup do Frontend
* **In Progress:** Cadastros, Financeiro (Receber/Pagar)
* **Review:** Boleto simulado + Nota simulada
* **Done:** Dashboard, Cobrança, Documentação

---

## 📝 Documentação extra

* [x] **Modelagem de dados** (Company, User, Receivable, Payable, Invoice, Boleto…)
* [x] **Esquema GraphQL** com Queries e Mutations principais
* [x] **Templates de PDF** para Boleto e Nota
* [x] **Critérios de aceite (DoD)**

---

## 💡 Próximos passos pós-MVP

* Integração real com API de boletos (Asaas, Gerencianet, Iugu…)
* Integração real com NFE.io, eNotas ou TecnoSpeed
* PIX dinâmico e conciliação bancária
* Relatórios avançados (DRE, fluxo de caixa projetado)

---

✨ Projeto desenvolvido em **3 dias de sprint** como MVP – evolutivo e pronto para integrações reais!

---

# 21) Repositório Git & Arquitetura do Código

## 21.1 Nome e estrutura do repositório

**Opção monorepo (recomendada)**: `erp-financeiro`

```
erp-financeiro/
  README.md
  LICENSE
  CONTRIBUTING.md
  CODE_OF_CONDUCT.md
  package.json           # workspace manager (npm workspaces)
  .editorconfig
  .gitignore
  .nvmrc                 # versão de Node
  .github/
    workflows/
      ci.yml
  docs/
    ADR-001-stack.md
    ERD.png (future)
    API.graphql (auto-gerado)
  api/                   # NestJS + GraphQL + Prisma
    README.md
    package.json
    prisma/
      schema.prisma
      seed.ts
    src/
      main.ts
      app.module.ts
      common/
      modules/
  web/                   # Angular + Apollo
    README.md
    package.json
    src/
      app/
      environments/
```

> Por que monorepo? Facilita versionamento conjunto, PRs sincronizados e reuso de tipos/constantes entre `api` e `web`.

---

## 21.2 Inicialização rápida (comandos)

```bash
# 1) Crie o repo local e arquivos básicos
mkdir erp-financeiro && cd erp-financeiro
git init -b main

# 2) Node e workspaces
fnm use 20 || nvm use 20 || echo "(use Node 20)"
cat > package.json <<'JSON'
{
  "name": "erp-financeiro",
  "private": true,
  "workspaces": ["api", "web"],
  "scripts": {
    "build": "npm -w api run build && npm -w web run build",
    "dev": "concurrently \"npm -w api run start:dev\" \"npm -w web run start\"",
    "lint": "npm -w api run lint && npm -w web run lint",
    "test": "npm -w api run test && npm -w web run test"
  },
  "devDependencies": {"concurrently": "^9.0.0"}
}
JSON

# 3) API (NestJS)
npx @nestjs/cli new api --package-manager npm --strict
cd api
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express class-validator class-transformer
npm i -D prisma
npm i @prisma/client
npx prisma init
cd ..

# 4) WEB (Angular)
ng new web --routing --style=scss --strict
cd web
npm i apollo-angular @apollo/client graphql @angular/material @angular/cdk
cd ..

# 5) Git básicos
cat > .gitignore <<'GIT'
node_modules
.env
.env.*
dist
coverage
.prisma
GIT

echo "v20" > .nvmrc

git add .
git commit -m "chore: scaffold monorepo (api NestJS + web Angular)"
```

---

## 21.3 README do repositório (bonito) – **conteúdo sugerido**

> Crie o arquivo `README.md` na raiz com o conteúdo abaixo.

```markdown
# ERP Financeiro (MVP)

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular) ![NestJS](https://img.shields.io/badge/NestJS-GraphQL-E0234E?logo=nestjs) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql) ![License](https://img.shields.io/badge/License-MIT-green)

> **MVP em 3 dias**: Contas a Receber (com **boleto simulado**), Contas a Pagar, Cobrança (timeline), Nota Fiscal **simulada** e Dashboard.

## ✨ Features
- Cadastros: Empresas, Clientes, Fornecedores, Produtos/Serviços, Contas Bancárias
- **A Receber**: gerar boleto simulado (PDF, linha digitável & código de barras)
- **A Pagar**: lançamento, baixa e anexos
- **Cobrança**: timeline de interações
- **Fiscal**: emissão de **NF simulada** (PDF)
- Dashboard com KPIs

## 🧱 Arquitetura
```

Angular (Apollo) ──> GraphQL (NestJS) ──> Prisma ──> PostgreSQL
│
├─ BoletoGatewaySimulado (HTML→PDF)
└─ FiscalGatewaySimulado (HTML→PDF)

````

## 🚀 Comece agora
```bash
# requisitos: Node 20, npm, PostgreSQL local
npm i
npm -w api i && npm -w web i

# configure envs (veja .env exemplos abaixo)

# dev em paralelo
npm run dev
````

## 🔧 Variáveis de ambiente

| App | Variável                            | Exemplo                                                        |
| --- | ----------------------------------- | -------------------------------------------------------------- |
| api | DATABASE\_URL                       | postgresql://user\:pass\@localhost:5432/erp                    |
| api | JWT\_SECRET                         | supersecret                                                    |
| api | PORT                                | 3000                                                           |
| web | VITE\_GRAPHQL\_URI (ou env Angular) | [http://localhost:3000/graphql](http://localhost:3000/graphql) |

## 📚 Documentação

* [Plano do MVP](./docs/ADR-001-stack.md) (decisões de arquitetura)
* [Schema GraphQL](./docs/API.graphql)
* [Modelagem (ERD)](./docs/ERD.png)

## 🧪 Qualidade

* Lint, Testes, CI via GitHub Actions (`.github/workflows/ci.yml`).

## 🗺️ Roadmap (pós-MVP)

* Integração real de boletos (Asaas/Gerencianet/Iugu)
* Integração fiscal (eNotas/NFE.io/TecnoSpeed)
* PIX & Conciliação automática

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) e [Code of Conduct](./CODE_OF_CONDUCT.md).

## 📄 Licença

[MIT](./LICENSE)

````

---

## 21.4 API/README.md (NestJS)

```markdown
# API (NestJS + GraphQL + Prisma)

## Setup
```bash
cd api
cp .env.example .env
# edite DATABASE_URL e JWT_SECRET
npm i
npx prisma migrate dev --name init
npm run start:dev
````

## Scripts

* `start:dev`: Nest com hot-reload
* `prisma:studio`: abrir Prisma Studio
* `seed`: popular dados demo

## Endpoints

* GraphQL Playground: `http://localhost:3000/graphql`

## Estrutura

```
src/
  main.ts
  app.module.ts
  common/
  modules/
    auth/
    companies/
    users/
    partners/
    catalog/
    finance/
      receivables/
      payables/
      boleto/
    billing/
    notifications/
    audit/
```

````

### `.env.example`
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/erp
JWT_SECRET=dev-secret
PORT=3000
````

````

---

## 21.5 WEB/README.md (Angular)

```markdown
# Web (Angular + Apollo)

## Setup
```bash
cd web
npm i
# configure o endpoint do GraphQL em environment.ts
npm start
````

## Environments

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  graphqlUri: 'http://localhost:3000/graphql'
};
```

## Módulos

* `auth`, `dashboard`, `cadastros`, `financeiro` (receber/pagar), `fiscal`, `cobranca`.

````

---

## 21.6 GitHub Actions (CI)

Crie `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm i
      - run: npm -w api i && npm -w web i
      - run: npm run lint --if-present
      - run: npm test --if-present
      - run: npm run build --if-present
````

---

## 21.7 Contribuição, Licença & Conduta

**CONTRIBUTING.md** (resumo):

```
- Use Conventional Commits (feat, fix, chore...)
- PRs curtos e focados
- Rode lint/test antes do push
```

**CODE\_OF\_CONDUCT.md**: baseado no Contributor Covenant v2.

**LICENSE**: MIT (padrão).

---

## 21.8 ADR-001 – Decisão de Stack (docs/ADR-001-stack.md)

```markdown
# ADR-001: Stack do MVP

## Decisão
Usar **NestJS (TS) + GraphQL + Prisma + PostgreSQL** no backend e **Angular + Apollo** no frontend, em **monorepo**.

## Contexto
- Time com forte experiência em TypeScript/Angular.
- Rapidez para entregar PDF de boleto/nota simulados.

## Alternativas
- **Python (FastAPI) + Strawberry GraphQL**: viável, mas menos sinergia com Angular para compartilhamento de tipos.

## Consequências
- Reuso de tipos/validações com TS
- Menos atrito entre squads front/back
```

---

## 21.9 Próximo passo imediato

1. Criar repo no GitHub `erp-financeiro`.
2. Colar os arquivos `README.md`, `api/README.md`, `web/README.md`, `ci.yml`, `.gitignore`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`.
3. Executar os comandos de scaffolding acima e fazer o primeiro push.
