package com.soulmate.recommender.model;

import java.util.Set;

public class UserProfile {
  private String userId;
  private Set<String> interests;
  private double latitude;
  private double longitude;
  private double[] soulVector;
  private double activityScore; // 0..1
  private double vipScore; // 0..1

  public UserProfile() {}

  public UserProfile(String userId, Set<String> interests, double latitude, double longitude, double[] soulVector, double activityScore, double vipScore) {
    this.userId = userId;
    this.interests = interests;
    this.latitude = latitude;
    this.longitude = longitude;
    this.soulVector = soulVector;
    this.activityScore = activityScore;
    this.vipScore = vipScore;
  }

  public String getUserId() { return userId; }
  public void setUserId(String userId) { this.userId = userId; }
  public Set<String> getInterests() { return interests; }
  public void setInterests(Set<String> interests) { this.interests = interests; }
  public double getLatitude() { return latitude; }
  public void setLatitude(double latitude) { this.latitude = latitude; }
  public double getLongitude() { return longitude; }
  public void setLongitude(double longitude) { this.longitude = longitude; }
  public double[] getSoulVector() { return soulVector; }
  public void setSoulVector(double[] soulVector) { this.soulVector = soulVector; }
  public double getActivityScore() { return activityScore; }
  public void setActivityScore(double activityScore) { this.activityScore = activityScore; }
  public double getVipScore() { return vipScore; }
  public void setVipScore(double vipScore) { this.vipScore = vipScore; }
}
