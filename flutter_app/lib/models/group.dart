class Group {
  final String id;
  final String name;
  final String avatar;
  final String description;
  final int members;
  final bool isActive;

  Group({
    required this.id,
    required this.name,
    required this.avatar,
    required this.description,
    required this.members,
    required this.isActive,
  });

  factory Group.fromJson(Map<String, dynamic> json) {
    return Group(
      id: json['id'] as String,
      name: json['name'] as String,
      avatar: json['avatar'] as String,
      description: json['description'] as String,
      members: json['members'] as int,
      isActive: json['isActive'] as bool,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'avatar': avatar,
      'description': description,
      'members': members,
      'isActive': isActive,
    };
  }
}

// Mock data for testing
final List<Group> mockGroups = [
  Group(
    id: '1',
    name: '读书会',
    avatar: 'https://i.pravatar.cc/150?img=10',
    description: '分享好书，交流心得',
    members: 128,
    isActive: true,
  ),
  Group(
    id: '2',
    name: '旅行爱好者',
    avatar: 'https://i.pravatar.cc/150?img=11',
    description: '一起探索世界',
    members: 256,
    isActive: true,
  ),
  Group(
    id: '3',
    name: '美食分享',
    avatar: 'https://i.pravatar.cc/150?img=12',
    description: '分享美食，享受生活',
    members: 64,
    isActive: false,
  ),
  Group(
    id: '4',
    name: '摄影交流',
    avatar: 'https://i.pravatar.cc/150?img=13',
    description: '记录美好瞬间',
    members: 96,
    isActive: true,
  ),
];
