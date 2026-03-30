import 'package:flutter/material.dart';
import '../models/user.dart';
import '../widgets/user_card.dart';
import '../widgets/filter_bar.dart';
import '../widgets/greet_button.dart';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({Key? key}) : super(key: key);

  @override
  _DiscoverScreenState createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> {
  FilterOption _filter = FilterOption.all;

  final List<User> _users = [
    User(id: 'u1', name: 'Alex Chen', isOnline: true, distanceKm: 1.2),
    User(id: 'u2', name: 'Lina Zhao', isOnline: false, distanceKm: 4.5),
    User(id: 'u3', name: 'Kai Nakamura', isOnline: true, distanceKm: 0.8),
    User(id: 'u4', name: 'Maria Garcia', isOnline: true, distanceKm: 2.3),
    User(id: 'u5', name: 'David Kim', isOnline: false, distanceKm: 9.1),
    User(id: 'u6', name: 'Priya Singh', isOnline: true, distanceKm: 3.0),
  ];

  List<User> get _filtered => _applyFilter(_users, _filter);

  List<User> _applyFilter(List<User> users, FilterOption filter) {
    switch (filter) {
      case FilterOption.online:
        return users.where((u) => u.isOnline).toList();
      case FilterOption.nearby:
        // For simplicity, consider nearby as distance <= 3.0 km
        return users.where((u) => u.distanceKm <= 3.0).toList();
      case FilterOption.all:
      default:
        return users;
    }
  }

  void _onGreet(User user) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('已向 ${user.name} 打招呼')));
  }

  void _onOpenProfile(User user) {
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => UserProfileScreen(user: user)));
  }

  @override
  Widget build(BuildContext context) {
    final list = _filtered;
    return Scaffold(
      appBar: AppBar(title: const Text('发现')),
      body: Column(
        children: [
          FilterBar(
            selected: _filter,
            onSelected: (f) => setState(() {
              _filter = f;
            }),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: list.length,
              itemBuilder: (context, index) {
                final user = list[index];
                return UserCard(
                  user: user,
                  onTap: () => _onOpenProfile(user),
                  onGreet: () => _onGreet(user),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class UserProfileScreen extends StatelessWidget {
  final User user;
  const UserProfileScreen({Key? key, required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(user.name)),
      body: Center(
        child: Text('这是 ${user.name} 的个人主页 (模拟)'),
      ),
    );
  }
}
