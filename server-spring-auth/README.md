# Post module (Phase 5) - REST API for posts, comments, and likes

This module implements a simple social-post system using Spring Boot with JPA.
Entities:
- Post: author (User), content, createdAt, comments, likes
- Comment: post, author (User), content, createdAt
- PostLike: post, user
- CommentLike: comment, user

Endpoints (under /api/posts):
- GET /api/posts
- POST /api/posts
- GET /api/posts/{id}
- DELETE /api/posts/{id}
- POST /api/posts/{id}/like
- DELETE /api/posts/{id}/like
- POST /api/posts/{id}/comments
- GET /api/posts/{id}/comments

Notes:
- Relies on existing User entity (com.soulmate.auth.entity.User).
- Basic JSON payloads required for create actions (userId, content).
- No advanced business rules (no notifications, feeds, etc.).
