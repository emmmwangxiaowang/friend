# AGENTS for server/src

Overview: Express backend with MVC-like separation for routes, controllers, and services.

## STRUCTURE
- controllers/ - HTTP request handlers
- routes/ - Express route definitions
- services/ - Business logic and use-cases
- middleware/ - Authentication, validation, error handling
- utils/ - Shared helpers
- chat/ - Real-time chat service
- ws/ - WebSocket server and transport
- seed/ - Database seeding scripts

## WHERE TO LOOK
- Entry points: index.ts (Express app), server.js (start script)
- Auth: middleware/authMiddleware.ts, utils/auth.ts
- API: routes/*.ts for routing, controllers/*.ts for HTTP handlers

## CONVENTIONS
- Follow existing patterns in server/src/controllers and server/src/services
- TypeScript strict mode is enabled
- Controllers focus on HTTP concerns; services encapsulate business logic

## ANTI-PATTERNS (server/src specific)
- dist/ must not be committed; ensure it is ignored in .gitignore
- Do not mix index.ts and index.js; choose one entry point to avoid confusion
