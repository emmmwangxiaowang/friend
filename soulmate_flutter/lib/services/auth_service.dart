class AuthService {
  Future<bool> login(String username, String password) async {
    await Future.delayed(const Duration(milliseconds: 400));
    // Placeholder for authentication: always succeed in the skeleton
    return true;
  }

  void logout() {
    // Placeholder logout
  }
}
