import 'package:flutter/material.dart';
import '../models/post.dart';
import '../widgets/post_filter_bar.dart';
import '../widgets/post_card.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({Key? key}) : super(key: key);
  @override
  _CommunityScreenState createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  late List<Post> _posts;
  String _filter = 'latest';

  @override
  void initState() {
    super.initState();
    _posts = List.generate(5, (i) {
      final now = DateTime.now().subtract(Duration(minutes: i * 15));
      return Post(
        id: 'p$i',
        author: 'User ${i + 1}',
        avatarUrl: 'https://i.pravatar.cc/150?img=${i + 10}',
        content: '这是帖子内容示例 #$i，展示 Flutter 社区页的卡片与交互。',
        timestamp: now,
        likes: (i + 1) * 3,
        isLiked: false,
        comments: List.generate(i, (c) => 'Comment ${c + 1} on post $i'),
        isAuthorFollowed: false,
      );
    });
  }

  void _updateLike(String id) {
    setState(() {
      final idx = _posts.indexWhere((p) => p.id == id);
      if (idx != -1) {
        final p = _posts[idx];
        p.isLiked = !p.isLiked;
        p.likes = p.isLiked ? p.likes + 1 : (p.likes > 0 ? p.likes - 1 : 0);
      }
    });
  }

  void _toggleFollow(Post post) {
    setState(() {
      post.isAuthorFollowed = !post.isAuthorFollowed;
    });
  }

  void _openComments(Post post) {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        final TextEditingController _controller = TextEditingController();
        return Padding(
          padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListView.builder(
                shrinkWrap: true,
                itemCount: post.comments.length,
                itemBuilder: (ctx, idx) => ListTile(title: Text(post.comments[idx])),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  children: [
                    Expanded(child: TextField(controller: _controller, decoration: InputDecoration(hintText: 'Add a comment'))),
                    IconButton(
                      icon: Icon(Icons.send),
                      onPressed: () {
                        if (_controller.text.trim().isEmpty) return;
                        setState(() {
                          post.comments.add(_controller.text.trim());
                        });
                        _controller.clear();
                        FocusScope.of(context).unfocus();
                      },
                    )
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter Community')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: PostFilterBar(
              current: _filter,
              onChanged: (val) {
                setState(() {
                  _filter = val;
                });
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _posts.length,
              itemBuilder: (ctx, idx) {
                final post = _posts[idx];
                return PostCard(
                  post: post,
                  onFollowToggle: () => _toggleFollow(post),
                  onLikeToggle: () => _updateLike(post.id),
                  onOpenComments: () => _openComments(post),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
