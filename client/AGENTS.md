# AGENTS for client

Overview: Next.js 13 frontend with TailwindCSS.

## STRUCTURE
- app/ — Next.js App Router routes and pages
- lib/api.ts — API client wrapper
- tailwind.config.js — Tailwind styling configuration

## WHERE TO LOOK
- API calls: lib/api.ts
- Components: app/components/
- Pages: app/ directory

## CONVENTIONS
- TypeScript with strict: false and noEmit: true
- TailwindCSS for styling
- API interactions wrapped by lib/api.ts

## ANTI-PATTERNS
- No test configurations in this module
