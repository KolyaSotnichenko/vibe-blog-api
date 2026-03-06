## Quickstart

Requirements:
- Node.js >= 18
- npm

Main libraries used:
- @nestjs/common, @nestjs/core, @nestjs/platform-express — NestJS framework core
- @nestjs/swagger — OpenAPI / Swagger integration
- @nestjs/typeorm, typeorm — Database ORM
- sqlite3 — Default database (for local development)
- rxjs — Reactive utilities (required by NestJS)
- reflect-metadata — Decorators metadata support

Dev / tooling:
- typescript — TypeScript compiler
- eslint — Linting
- jest, ts-jest — Testing framework
- @nestjs/cli — NestJS CLI

Install dependencies:
```
npm install
```

Run in development:
```
npm run start:dev
```

Build:
```
npm run build
```

Run production build:
```
npm run start:prod
```

Environment variables:
- Copy `.env.example` to `.env` if present and adjust values.

Tests:
```
npm test
```

OpenAPI specification:
- Generated file is available at `openapi.json` in the repository root.
