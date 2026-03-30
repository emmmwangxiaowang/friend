# Decisions - Spring Skeleton (Phase 1)

- Tech: Java 17, Spring Boot 3.x, Maven build, H2 in-memory DB.
- Package base: com.soulmate, with standard layers: controller, service, repository, entity, dto, config, security, websocket.
- WebSocket: STOMP over SockJS endpoint at /ws, simple broker under /topic.
- Security: Placeholder via Spring Security; no custom JWTs yet in Phase 1.
- No business logic in Phase 1; skeleton-only to enable iterative development.
