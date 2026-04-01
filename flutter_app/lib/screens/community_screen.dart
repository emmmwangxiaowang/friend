import 'package:flutter/material.dart';
import '../models/post.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({Key? key}) : super(key: key);

  @override
  _CommunityScreenState createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  FilterOption _filter = FilterOption.latest;
  final List<Post> _posts = List.from(mockPosts);

  List<Post> get _filtered => _applyFilter(_posts, _filter);

  List<Post> _applyFilter(List<Post> posts, FilterOption filter) {
    switch (filter) {
      case FilterOption.hot:
        return List.from(posts)..sort((a, b) => b.likes.compareTo(a.likes));
      case FilterOption.following:
        return posts;
      case FilterOption.latest:
      default:
        return posts;
    }
  }

  void _toggleLike(Post post) {
    setState(() {
      final index = _posts.indexWhere((p) => p.id == post.id);
      if (index != -1) {
        final p = _posts[index];
        _posts[index] = Post(
          id: p.id,
          author: p.author,
          avatar: p.avatar,
          content: p.content,
          image: p.image,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          comments: p.comments,
          date: p.date,
          isLiked: !p.isLiked,
        );
      }
    });
  }

  void _showCreatePostDialog() {
    final controller = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 16,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('发布动态', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            TextField(
              controller: controller,
              maxLines: 4,
              decoration: const InputDecoration(
                hintText: '分享你的想法...',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('取消'),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {
                    if (controller.text.trim().isNotEmpty) {
                      setState(() {
                        _posts.insert(0, Post(
                          id: DateTime.now().millisecondsSinceEpoch.toString(),
                          author: '我',
                          avatar: 'https://i.pravatar.cc/150?img=1',
                          content: controller.text,
                          likes: 0,
                          comments: 0,
                          date: '刚刚',
                          isLiked: false,
                        ));
                      });
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('发布成功！')),
                      );
                    }
                  },
                  child: const Text('发布'),
                ),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final list = _filtered;
    return Scaffold(
      appBar: AppBar(title: const Text('社区')),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                _buildFilterChip('最新', FilterOption.latest),
                const SizedBox(width: 8),
                _buildFilterChip('热门', FilterOption.hot),
                const SizedBox(width: 8),
                _buildFilterChip('关注', FilterOption.following),
              ],
            ),
          ),
          Expanded(
            child: list.isEmpty 
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.feed_outlined, size: 64, color: Colors.grey[300]),
                      const SizedBox(height: 16),
                      Text('暂无动态', style: TextStyle(color: Colors.grey[500], fontSize: 16)),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _showCreatePostDialog,
                        child: const Text('发布第一条动态'),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    final post = list[index];
                    return _PostCard(
                      post: post,
                      onLike: () => _toggleLike(post),
                      onComment: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('评论功能开发中...')),
                        );
                      },
                      onShare: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('分享功能开发中...')),
                        );
                      },
                    );
                  },
                ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showCreatePostDialog,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildFilterChip(String label, FilterOption filter) {
    final isSelected = _filter == filter;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (selected) {
        if (selected) {
          setState(() => _filter = filter);
        }
      },
    );
  }
}

class _PostCard extends StatelessWidget {
  final Post post;
  final VoidCallback onLike;
  final VoidCallback onComment;
  final VoidCallback onShare;

  const _PostCard({
    required this.post,
    required this.onLike,
    required this.onComment,
    required this.onShare,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 20,
                  backgroundImage: NetworkImage(post.avatar),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(post.author, style: const TextStyle(fontWeight: FontWeight.bold)),
                      Text(post.date, style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(post.content, style: const TextStyle(fontSize: 15)),
            if (post.image != null) ...[
              const SizedBox(height: 12),
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(post.image!, height: 150, width: double.infinity, fit: BoxFit.cover),
              ),
            ],
            const SizedBox(height: 12),
            Row(
              children: [
                _buildActionButton(
                  icon: post.isLiked ? Icons.favorite : Icons.favorite_border,
                  label: post.likes.toString(),
                  color: post.isLiked ? Colors.red : Colors.grey,
                  onTap: onLike,
                ),
                const SizedBox(width: 24),
                _buildActionButton(
                  icon: Icons.chat_bubble_outline,
                  label: post.comments.toString(),
                  onTap: onComment,
                ),
                const SizedBox(width: 24),
                _buildActionButton(
                  icon: Icons.share,
                  label: '分享',
                  onTap: onShare,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    Color? color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(4),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
        child: Row(
          children: [
            Icon(icon, size: 20, color: color ?? Colors.grey[600]),
            const SizedBox(width: 4),
            Text(label, style: TextStyle(color: color ?? Colors.grey[600])),
          ],
        ),
      ),
    );
  }
}
