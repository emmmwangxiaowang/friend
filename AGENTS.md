# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-29
**Project:** SoulMate - Dating/Social App

## OVERVIEW
Monorepo with Next.js frontend + Express backend + Prisma ORM + PostgreSQL + Redis + WebSocket real-time chat.

## STRUCTURE
```
./
├── client/           # Next.js frontend (TailwindCSS)
├── server/           # Express + TypeScript API
│   └── src/
│       ├── controllers/  # HTTP handlers
│       ├── services/     # Business logic
│       ├── routes/       # Express routes
│       ├── middleware/   # Auth middleware
│       ├── utils/        # Helpers
│       ├── chat/         # Real-time chat
│       ├── ws/           # WebSocket
│       └── seed/         # DB seeding
└── docker-compose.yml    # PostgreSQL + Redis
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| API routes | server/src/routes/ | Express route definitions |
| Controllers | server/src/controllers/ | HTTP handlers |
| Services | server/src/services/ | Business logic |
| Auth | server/src/middleware/authMiddleware.ts | JWT middleware |
| Client API | client/lib/api.ts | Frontend API wrapper |
| DB Schema | server/prisma/ | Prisma models |

## CODE MAP
| Symbol | Type | Location |
|--------|------|----------|
| server.js | Entry | server/src/server.js |
| index.ts | Express App | server/src/index.ts |
| authController | Controller | server/src/controllers/ |
| chatService | Service | server/src/chat/chat.service.ts |

## CONVENTIONS
- Server uses strict TypeScript (strict: true)
- Client uses permissive TS (strict: false, noEmit: true)
- Monorepo via Yarn workspaces
- No ESLint/Prettier config in repo

## ANTI-PATTERNS (THIS PROJECT)
- **Committed dist/** - Build artifacts in repo (non-standard)
- **Duplicate entry points** - server.js, index.js, index.ts all exist
- **No test configs** - No Jest, Vitest, or test directory

## COMMANDS
```bash
# Install
npm install

# Dev (both)
npm run dev

# Server
cd server && npm run dev

# Client
cd client && npm run dev
```

## NOTES
- Server: Express + Prisma + Redis + Socket.IO
- Client: Next.js 13 + TailwindCSS
- Real-time: WebSocket for chat
