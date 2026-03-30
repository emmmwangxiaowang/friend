import 'package:flutter/material.dart';
import '../models/post.dart';
import './like_button.dart';
import './comment_button.dart';

class PostCard extends StatelessWidget {
  final Post post;
  final VoidCallback? onFollowToggle;
  final VoidCallback onLikeToggle;
  final VoidCallback onOpenComments;

  const PostCard({
    Key? key,
    required this.post,
    this.onFollowToggle,
    required this.onLikeToggle,
    required this.onOpenComments,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundImage: NetworkImage(post.avatarUrl),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(post.author, style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(_formatTime(post.timestamp), style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: onFollowToggle,
                  child: Text(post.isAuthorFollowed ? 'Following' : 'Follow'),
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(post.content),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                LikeButton(
                  initialLikes: post.likes,
                  initiallyLiked: post.isLiked,
                  onLikeChanged: onLikeToggle,
                ),
                CommentButton(
                  commentsCount: post.comments.length,
                  onPressed: onOpenComments,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _formatTime(DateTime t) {
    final diff = DateTime.now().difference(t);
    if (diff.inMinutes < 60) return '${diff.inMinutes}m';
    if (diff.inHours < 24) return '${diff.inHours}h';
    return '${diff.inDays}d';
  }
}
