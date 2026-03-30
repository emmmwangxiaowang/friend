# Recommender Phase 4 Learnings

- Implemented a Spring Boot-based recommender module skeleton with Redis caching.
- Introduced four scoring components: Jaccard (interests), Haversine (location), Cosine (soul vector), and Business factors (activity + VIP).
- Weights mapped as: interest 0.4, trait 0.2, location 0.2, soul 0.2 to compute total score.
- Exposed REST endpoints as requested and wired to a central RecommendationService.
- Next: integrate with real user data source, enrich candidate data, and expand tests.
