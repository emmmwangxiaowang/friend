import 'package:flutter/material.dart';

class Post {
  final String id;
  final String author;
  final String avatarUrl;
  final String content;
  final DateTime timestamp;
  int likes;
  bool isLiked;
  final List<String> comments;
  bool isAuthorFollowed;

  Post({
    required this.id,
    required this.author,
    required this.avatarUrl,
    required this.content,
    required this.timestamp,
    this.likes = 0,
    this.isLiked = false,
    this.comments = const [],
    this.isAuthorFollowed = false,
  });
}
