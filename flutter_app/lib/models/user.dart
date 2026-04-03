class User {
  final String id;
  final String name;
  final String avatar;
  final String bio;
  final int age;
  final String distance;
  final List<String> interests;
  final bool isOnline;
  final String lastActive;

  User({
    required this.id,
    required this.name,
    required this.avatar,
    required this.bio,
    required this.age,
    required this.distance,
    required this.interests,
    required this.isOnline,
    required this.lastActive,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      name: json['name'] as String,
      avatar: json['avatar'] as String,
      bio: json['bio'] as String,
      age: json['age'] as int,
      distance: json['distance'] as String,
      interests: List<String>.from(json['interests'] as List),
      isOnline: json['isOnline'] as bool,
      lastActive: json['lastActive'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'avatar': avatar,
      'bio': bio,
      'age': age,
      'distance': distance,
      'interests': interests,
      'isOnline': isOnline,
      'lastActive': lastActive,
    };
  }
}

// Mock data for testing
final List<User> mockUsers = [
  User(
    id: '1',
    name: 'Emma',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio:
        'Coffee lover and adventure seeker. Looking for someone to explore the city with!',
    age: 25,
    distance: '2 km away',
    interests: ['Coffee', 'Travel', 'Photography'],
    isOnline: true,
    lastActive: 'Active now',
  ),
  User(
    id: '2',
    name: 'Sophia',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Bookworm by day, foodie by night. Let\'s grab dinner sometime!',
    age: 28,
    distance: '5 km away',
    interests: ['Reading', 'Cooking', 'Yoga'],
    isOnline: false,
    lastActive: '2 hours ago',
  ),
  User(
    id: '3',
    name: 'Olivia',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Dog mom and hiking enthusiast. Swipe right if you love the outdoors!',
    age: 24,
    distance: '8 km away',
    interests: ['Hiking', 'Dogs', 'Nature'],
    isOnline: true,
    lastActive: 'Active now',
  ),
  User(
    id: '4',
    name: 'Ava',
    avatar: 'https://i.pravatar.cc/150?img=16',
    bio:
        'Music is my therapy. Looking for concert buddies and good conversations.',
    age: 26,
    distance: '3 km away',
    interests: ['Music', 'Concerts', 'Art'],
    isOnline: false,
    lastActive: '30 min ago',
  ),
  User(
    id: '5',
    name: 'Isabella',
    avatar: 'https://i.pravatar.cc/150?img=20',
    bio: 'Fitness junkie who also loves pizza. Balance is key!',
    age: 27,
    distance: '1 km away',
    interests: ['Fitness', 'Pizza', 'Netflix'],
    isOnline: true,
    lastActive: 'Active now',
  ),
];
