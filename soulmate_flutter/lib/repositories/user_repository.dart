import '../models/user.dart';

class UserRepository {
  Future<User?> getUser(String id) async {
    // Skeleton: no real data source
    await Future.delayed(const Duration(milliseconds: 100));
    return null;
  }
}
