package com.soulmate.recommender.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.soulmate.recommender.model.Candidate;
import com.soulmate.recommender.model.CandidateScore;
import com.soulmate.recommender.model.UserProfile;

@Service
public class RecommendationService {
  @Autowired
  private RedisTemplate<String, Candidate> redisTemplate;

  private static final double MAX_DISTANCE_KM = 20000.0;
  private static final double WEIGHT_INTEREST = 0.4;
  private static final double WEIGHT_TRAIT = 0.2;
  private static final double WEIGHT_LOCATION = 0.2;
  private static final double WEIGHT_SOUL = 0.2;


  private final List<Candidate> sampleCandidates = new ArrayList<>();

  @PostConstruct
  public void initSampleData() {
    // Prepopulate sample candidates if cache empty
    if (redisTemplate.opsForValue().get("cand:sample1") == null) {
      sampleCandidates.add(new Candidate("cand:1", Set.of("hiking","music","cooking"), 37.77, -122.41, new double[]{0.9,0.1,0.0}, 0.8, 0.5));
      sampleCandidates.add(new Candidate("cand:2", Set.of("movies","reading","travel"), 34.05, -118.25, new double[]{0.2,0.8,0.1}, 0.6, 0.8));
      sampleCandidates.add(new Candidate("cand:3", Set.of("sports","tech","gaming"), 40.71, -74.01, new double[]{0.3,0.4,0.3}, 0.9, 0.6));
      sampleCandidates.add(new Candidate("cand:4", Set.of("cooking","art","travel"), 51.51, -0.13, new double[]{0.7,0.2,0.1}, 0.5, 0.7));
      // persist
      for (Candidate c : sampleCandidates) {
        redisTemplate.opsForValue().set(c.getCandidateId(), c);
      }
    } else {
      // load maybe more in future
    }
  }

  public List<CandidateScore> getRecommendations(String userId, int limit) {
    UserProfile user = loadUser(userId);
    List<Candidate> candidates = new ArrayList<>();
    // gather from Redis or from in-memory sample data
    for (int i = 1; i <= 4; i++) {
      String key = "cand:" + i;
      Candidate c = redisTemplate.opsForValue().get(key);
      if (c != null) candidates.add(c);
    }
    // fallback to sample inline
    if (candidates.isEmpty()) {
      return new ArrayList<>();
    }

    List<CandidateScore> scores = new ArrayList<>();
    for (Candidate cand : candidates) {
      double inter = jaccard(user.getInterests(), cand.getInterests());
      double distKm = haversine(user.getLatitude(), user.getLongitude(), cand.getLatitude(), cand.getLongitude());
      double locationSim = 1.0 - Math.min(distKm / MAX_DISTANCE_KM, 1.0);
      double soulSim = cosine(user.getSoulVector(), cand.getSoulVector());
      if (soulSim < 0) soulSim = 0;
      double trait = 0.5 * user.getActivityScore() + 0.5 * user.getVipScore();
      double total = WEIGHT_INTEREST * inter + WEIGHT_TRAIT * trait + WEIGHT_LOCATION * locationSim + WEIGHT_SOUL * soulSim;
      scores.add(new CandidateScore(cand.getCandidateId(), inter, locationSim, soulSim, total));
    }

    scores.sort(Comparator.comparingDouble(CandidateScore::getTotalScore).reversed());
    if (limit > scores.size()) limit = scores.size();
    return scores.subList(0, limit);
  }

  private UserProfile loadUser(String userId) {
    // In a real implementation, fetch user profile from DB or cache. Here we synthesize a sample user if not present.
    return new UserProfile(userId, Set.of("music","travel","cooking"), 37.7749, -122.4194, new double[]{0.4,0.6,0.0}, 0.7, 0.4);
  }

  private double jaccard(Set<String> a, Set<String> b) {
    if (a == null || b == null || a.isEmpty() || b.isEmpty()) return 0.0;
    Set<String> intersection = new HashSet<>(a);
    intersection.retainAll(b);
    Set<String> union = new HashSet<>(a);
    union.addAll(b);
    return (double) intersection.size() / (double) union.size();
  }

  private double haversine(double lat1, double lon1, double lat2, double lon2) {
    final int R = 6371; // Radius of the earth in km
    double dLat = Math.toRadians(lat2 - lat1);
    double dLon = Math.toRadians(lon2 - lon1);
    double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
               Math.sin(dLon/2) * Math.sin(dLon/2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private double cosine(double[] a, double[] b) {
    if (a == null || b == null || a.length == 0 || b.length == 0) return 0.0;
    double dot = 0.0; double na = 0.0; double nb = 0.0;
    int len = Math.min(a.length, b.length);
    for (int i = 0; i < len; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    if (na == 0 || nb == 0) return 0.0;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  // refresh could rehydrate cache
  public void refreshCache() {
    // simple no-op: in real life we would recompute or invalidate Redis caches
  }
}
