# Phase 5 - Posts module learnings

- Implemented JPA entities: Post, Comment, PostLike, CommentLike with proper relationships to User.
- Created repositories for each entity and simple services for core CRUD and like/comment actions.
- Exposed REST endpoints via PostController for posts, likes, and comments under /api/posts.
- Leveraged existing User entity from server-spring-auth module (com.soulmate.auth.entity.User).
- Plan to extend with tests and security/auth integration in future phases.
