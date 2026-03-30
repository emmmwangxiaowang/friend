import 'package:flutter/material.dart';

class LikeButton extends StatefulWidget {
  final int initialLikes;
  final bool initiallyLiked;
  final VoidCallback? onLikeChanged;

  const LikeButton({
    Key? key,
    this.initialLikes = 0,
    this.initiallyLiked = false,
    this.onLikeChanged,
  }) : super(key: key);

  @override
  _LikeButtonState createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  late int _count;
  late bool _liked;

  @override
  void initState() {
    super.initState();
    _count = widget.initialLikes;
    _liked = widget.initiallyLiked;
  }

  @override
  Widget build(BuildContext context) {
    return TextButton.icon(
      onPressed: () {
        setState(() {
          if (_liked) {
            _count = (_count - 1).clamp(0, 999999);
          } else {
            _count = _count + 1;
          }
          _liked = !_liked;
        });
        if (widget.onLikeChanged != null) widget.onLikeChanged!();
      },
      icon: Icon(
        Icons.favorite,
        color: _liked ? Colors.red : Colors.grey,
      ),
      label: Text(
        _count.toString(),
        style: TextStyle(color: Colors.grey[800]),
      ),
      style: TextButton.styleFrom(primary: Colors.black),
    );
  }
}
