# programaria-notes

Monorepo (npm workspaces + Turborepo) do app de anotações das palestras.

```
apps/
  web/   Next.js 16 (App Router) — UI das anotações, persistência em localStorage
  api/   NestJS 11 — apenas GET /health por enquanto
packages/
  ui/    Design system mínimo: tokens CSS, Button e Icon (importado como @programaria/ui/*)
```

## Requisitos

- Node >= 22
- npm >= 10

## Comandos (raiz)

```bash
npm install
npm run dev          # sobe web (3000) e api (3001) via turbo
npm run build
npm run lint
npm run check-types
npm test
```

Por app: `npm run dev -w @programaria/web`, `npm run test:e2e -w @programaria/api`, etc.

## Web

- Dados do protótipo (`.claude/design`): 8 palestras fixas em `src/lib/talks/talks.ts`.
- Anotações ficam no navegador sob a chave `programaria-notas-v2` (mesma do protótipo).
- Camadas: `models/` (tipos), `lib/` (puro), `hooks/` (orquestração), `components/` (JSX).
- Testes em `tests/unit/**`, espelhando as camadas.

## API

- `GET /health` → `{ "status": "ok" }`.
- Unit: `npm test -w @programaria/api`; e2e (supertest): `npm run test:e2e -w @programaria/api`.
- Porta via `PORT` (padrão 3001).

## Regras do projeto

As convenções de arquitetura, testes, acessibilidade e i18n estão em `.claude/rules-unified/`.
