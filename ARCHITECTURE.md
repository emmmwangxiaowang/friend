SoulMate Architecture
====================

High-level goal
- Design a scalable social/dating app with rich user profiles, social content, real-time chat, and AI-assisted recommendations (planned).

Tech stack (as requested)
- Frontend: Next.js (client)
- Backend: Node.js + Express (server)
- Database: PostgreSQL (via Prisma ORM)
- Cache/Message Bus: Redis
- Real-time: WebSocket (Socket.IO-style interface)
- Deployment: Docker Compose for local development; scalable deployment via k8s in production

Monorepo layout
- /client  -> Next.js frontend (barebones scaffold; no UI components implemented here)
- /server  -> Express API + Prisma ORM layer
- /prisma  -> Prisma schema and migrations (generated artifacts live under prisma/migrations)
- /docs    -> Architecture and API documentation artifacts (OpenAPI, architecture notes)

Key architectural decisions
- Data model is designed for denormalized fast reads for feed/matches with careful indexing; core truth remains in Postgres with Prisma as the single source of truth.
- Real-time features powered by Redis pub/sub and WebSocket endpoints for private/group chats.
- AI integration is planned; the architecture leaves hooks in place (data pipelines, feature flags, and a dedicated AI service on the horizon).
- Security and privacy by design: strict access controls, encrypted communications (TLS), and data minimization for profiles.

Data model overview (highlights)
- User, Profile (demographics, interests, personality traits, location)
- Social: Posts, Comments, Likes, Follows
- Matching: Potential matches, scoring, and AI-assisted recommendations (tables designed for efficient scoring and filtering)
- Chat: Private and Group conversations with messages
- Soul Test/Quiz: Tests, questions, options, results per user

Scalability and performance considerations
- Horizontal read scale via read-replicas and well-chosen indices on frequently filtered fields (city, age range, interests, etc.).
- Caching hot data (e.g., top matches, trending posts) in Redis with TTL.
- Message throughput, backpressure, and backfill handling for chat features.
- Sharding guidelines and follow-on: shard user_id space and/or message history by time window if traffic grows dramatically.

Security and compliance
- JWT-based auth (not implemented here).
- Roles/permissions layer for admin vs user behavior (skipped in code but documented for future work).
- Data privacy best practices: limit PII exposure, audit logging, and consent handling.

OpenAPI and schemas
- REST endpoints are documented in docs/openapi.yaml (skeleton defined; detailed schemas provided in Prisma models).
- WebSocket endpoints defined in server code (subscription channels for private/group chats).

Risk, blockers, and next steps
- Next: implement skeleton server with API routes, WebSocket bootstrap, and Prisma client hooks.
- Collect requirements for AI recommendation pipeline (data schemas, signals, and privacy guardrails).

Notes
- This document intentionally avoids business logic; it defines structure to support future implementation.

Directory map (summary)
- client/        Next.js app scaffolding (noop views for now)
- server/        Express API + Prisma setup (bare endpoints)
- prisma/schema.prisma  Core data models
- docs/         OpenAPI spec and architecture notes
- docker-compose.yml  Local dev environment for PostgreSQL + Redis
