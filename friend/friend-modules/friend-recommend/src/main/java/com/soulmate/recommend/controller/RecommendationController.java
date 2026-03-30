package com.soulmate.recommender.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.soulmate.recommender.model.CandidateScore;
import com.soulmate.recommender.service.RecommendationService;

@RestController
@RequestMapping("/api")
public class RecommendationController {
  @Autowired
  private RecommendationService recommendationService;

  @GetMapping("/discover")
  public List<CandidateScore> discover(@RequestParam String userId, @RequestParam(defaultValue = "10") int limit) {
    return recommendationService.getRecommendations(userId, limit);
  }

  @PostMapping("/actions/like/{userId}")
  public ResponseEntity<?> like(@PathVariable String userId) {
    // TODO: persist like action in Redis or DB
    return ResponseEntity.ok().build();
  }

  @PostMapping("/actions/pass/{userId}")
  public ResponseEntity<?> pass(@PathVariable String userId) {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/actions/greet/{userId}")
  public ResponseEntity<?> greet(@PathVariable String userId) {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/recommendations/refresh")
  public ResponseEntity<?> refresh() {
    recommendationService.refreshCache();
    return ResponseEntity.ok().build();
  }
}
