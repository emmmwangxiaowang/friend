class Post {
  final String id;
  final String author;
  final String avatar;
  final String content;
  final String? image;
  final int likes;
  final int comments;
  final String date;
  final bool isLiked;

  Post({
    required this.id,
    required this.author,
    required this.avatar,
    required this.content,
    this.image,
    required this.likes,
    required this.comments,
    required this.date,
    required this.isLiked,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as String,
      author: json['author'] as String,
      avatar: json['avatar'] as String,
      content: json['content'] as String,
      image: json['image'] as String?,
      likes: json['likes'] as int,
      comments: json['comments'] as int,
      date: json['date'] as String,
      isLiked: json['isLiked'] as bool,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'author': author,
      'avatar': avatar,
      'content': content,
      'image': image,
      'likes': likes,
      'comments': comments,
      'date': date,
      'isLiked': isLiked,
    };
  }
}

enum FilterOption { all, online, nearby, latest, hot, following }

final List<Post> mockPosts = [
  Post(
    id: '1',
    author: '林星',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: '今天天气不错，来聊聊心动瞬间吧！',
    image: 'https://picsum.photos/800/400?random=1',
    likes: 12,
    comments: 4,
    date: '今天',
    isLiked: false,
  ),
  Post(
    id: '2',
    author: '周子安',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: '刚吃完夜宵，脑子里全是旅行的计划。',
    likes: 8,
    comments: 2,
    date: '2小时前',
    isLiked: true,
  ),
  Post(
    id: '3',
    author: '姚雨樱',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: '分享一本好书《小王子》，每次读都有新的感悟。',
    image: 'https://picsum.photos/800/400?random=3',
    likes: 24,
    comments: 8,
    date: '昨天',
    isLiked: false,
  ),
];
