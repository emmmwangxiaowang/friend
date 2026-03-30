# Soulmate Spring Boot Skeleton (Phase 1)

A minimal, ready-to-run Spring Boot skeleton with base project layout.

- Build: Maven (pom.xml)
- Java: 17+
- Web: REST endpoint skeleton + WebSocket support
- Persistence: In-memory H2 (Jpa) for quick start
- Base package layout: controller, service, repository, entity, dto, config, security, websocket

How to run
- Prereqs: JDK 17+, Maven
- Build: mvn clean package
- Run: java -jar target/soulmate-skeleton-0.0.1-SNAPSHOT.jar
- Or: mvn spring-boot:run

What was created (Phase 1)
- SoulmateApplication.java (main class)
- Base package: com.soulmate
- Controller: ApiController with health endpoint and user fetch
- Service: UserService with getUserDto
- Repository: UserRepository
- Entity: User
- DTO: UserDTO
- Config: WebSocketConfig (STOMP over WebSocket)
- Security: (basic placeholder via Spring Security default)
- WebSocket: basic setup endpoint /ws
- README and Maven POM

Notes
- Business logic is intentionally not implemented in this phase.
- The skeleton is ready for incremental enhancement in subsequent phases.
