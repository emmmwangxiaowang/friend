class Chat {
  final String id;
  final String title;
  final String avatar;
  final String lastMessage;
  final int unread;
  final String time;
  final bool isOnline;

  Chat({
    required this.id,
    required this.title,
    required this.avatar,
    required this.lastMessage,
    required this.unread,
    required this.time,
    required this.isOnline,
  });

  factory Chat.fromJson(Map<String, dynamic> json) {
    return Chat(
      id: json['id'] as String,
      title: json['title'] as String,
      avatar: json['avatar'] as String,
      lastMessage: json['lastMessage'] as String,
      unread: json['unread'] as int,
      time: json['time'] as String,
      isOnline: json['isOnline'] as bool,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'avatar': avatar,
      'lastMessage': lastMessage,
      'unread': unread,
      'time': time,
      'isOnline': isOnline,
    };
  }
}

// Mock data for testing
final List<Chat> mockChats = [
  Chat(
    id: '1',
    title: '林星',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: '明天一起去看展览?',
    unread: 2,
    time: '刚刚',
    isOnline: true,
  ),
  Chat(
    id: '2',
    title: '周子安',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: '收到你的消息啦！',
    unread: 0,
    time: '5分钟前',
    isOnline: false,
  ),
  Chat(
    id: '3',
    title: '姚雨樱',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: '最近在看什么书?',
    unread: 1,
    time: '1小时前',
    isOnline: true,
  ),
  Chat(
    id: '4',
    title: '系统通知',
    avatar: 'https://i.pravatar.cc/150?img=10',
    lastMessage: '你的资料审核已通过',
    unread: 0,
    time: '昨天',
    isOnline: false,
  ),
];
