# ERP Financeiro (MVP)

![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular) ![NestJS](https://img.shields.io/badge/NestJS-GraphQL-E0234E?logo=nestjs) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql) ![License](https://img.shields.io/badge/License-MIT-green)

> **MVP em 3 dias**: Contas a Receber (com **boleto simulado**), Contas a Pagar, Cobrança (timeline), Nota Fiscal **simulada** e Dashboard.

## 🧱 Arquitetura
```
Angular (Apollo) ──> GraphQL (NestJS) ──> Prisma ──> PostgreSQL
                         │
                         ├─ BoletoGatewaySimulado (HTML→PDF)
                         └─ FiscalGatewaySimulado (HTML→PDF)
```

## 🚀 Comece agora
```bash
npm i
npm -w api i && npm -w web i
npm run dev
```
- API GraphQL: http://localhost:3000/graphql
- Web: http://localhost:4200

## 🔧 Envs
- api/.env.example, web/src/environments/environment.ts

## 🗺️ Roadmap pós-MVP
- Integrações reais de boletos e NF
- PIX + Conciliação
# erp_financeiro
