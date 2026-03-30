class User {
  final String id;
  final String name;
  final bool isOnline;
  final double distanceKm;
  final String? avatarUrl;

  User({required this.id, required this.name, required this.isOnline, required this.distanceKm, this.avatarUrl});
}
