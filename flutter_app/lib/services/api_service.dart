import '../models/user.dart';
import '../models/post.dart';
import '../models/chat.dart';

class ApiService {
  // Singleton pattern
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  /// Fetch all posts (mock data)
  Future<List<Post>> fetchPosts() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return mockPosts;
  }

  /// Fetch all users (mock data)
  Future<List<User>> fetchUsers() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return mockUsers;
  }

  /// Fetch all chats (mock data)
  Future<List<Chat>> fetchChats() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return mockChats;
  }

  /// Greet a user by ID (mock - always returns true)
  Future<bool> greetUser(String userId) async {
    await Future.delayed(const Duration(milliseconds: 200));
    return true;
  }

  /// Like a post by ID (mock - always returns true)
  Future<bool> likePost(String postId) async {
    await Future.delayed(const Duration(milliseconds: 200));
    return true;
  }
}
