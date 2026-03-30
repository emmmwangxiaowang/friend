import 'package:flutter/material.dart';

class CommentButton extends StatelessWidget {
  final int commentsCount;
  final VoidCallback onPressed;

  const CommentButton({Key? key, this.commentsCount = 0, required this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton.icon(
      onPressed: onPressed,
      icon: Icon(Icons.comment, color: Colors.grey),
      label: Text(commentsCount.toString(), style: TextStyle(color: Colors.grey[800])),
    );
  }
}
