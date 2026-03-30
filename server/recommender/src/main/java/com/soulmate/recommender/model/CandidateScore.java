package com.soulmate.recommender.model;

public class CandidateScore {
  private String candidateId;
  private double interestScore;
  private double locationScore;
  private double soulScore;
  private double totalScore;

  public CandidateScore() {}
  public CandidateScore(String candidateId, double interestScore, double locationScore, double soulScore, double totalScore) {
    this.candidateId = candidateId;
    this.interestScore = interestScore;
    this.locationScore = locationScore;
    this.soulScore = soulScore;
    this.totalScore = totalScore;
  }

  public String getCandidateId() { return candidateId; }
  public void setCandidateId(String candidateId) { this.candidateId = candidateId; }
  public double getInterestScore() { return interestScore; }
  public void setInterestScore(double interestScore) { this.interestScore = interestScore; }
  public double getLocationScore() { return locationScore; }
  public void setLocationScore(double locationScore) { this.locationScore = locationScore; }
  public double getSoulScore() { return soulScore; }
  public void setSoulScore(double soulScore) { this.soulScore = soulScore; }
  public double getTotalScore() { return totalScore; }
  public void setTotalScore(double totalScore) { this.totalScore = totalScore; }
}
