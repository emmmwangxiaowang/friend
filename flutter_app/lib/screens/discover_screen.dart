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

  final List<User> _users = mockUsers;

  List<User> get _filtered => _applyFilter(_users, _filter);

  List<User> _applyFilter(List<User> users, FilterOption filter) {
    switch (filter) {
      case FilterOption.online:
        return users.where((u) => u.isOnline).toList();
      case FilterOption.nearby:
        return users;
      case FilterOption.all:
      default:
        return users;
    }
  }

  void _onGreet(User user) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('已向 \ 打招呼')));
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
        child: Text('这是 \ 的个人主页 (模拟)'),
      ),
    );
  }
}
