# Recommender Module (Phase 4)

This module implements a simple scoring-based recommendation engine using:
- Jaccard similarity for interests
- Haversine distance for location similarity
- Cosine similarity for soul-test-like vector
- Business factors (activity, VIP) as a trait-like weight
- Redis caching via Spring Data Redis

Endpoints:
- GET /api/discover?userId=...&limit=...
- POST /api/actions/like/:userId
- POST /api/actions/pass/:userId
- POST /api/actions/greet/:userId
- POST /api/recommendations/refresh

Note: This is a scaffold focused on the scoring logic and cache integration. It does not implement production-grade user data or persistence.
