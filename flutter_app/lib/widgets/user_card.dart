import 'package:flutter/material.dart';
import '../models/user.dart';
import 'greet_button.dart';

class UserCard extends StatelessWidget {
  final User user;
  final VoidCallback onTap;
  final VoidCallback onGreet;

  const UserCard({Key? key, required this.user, required this.onTap, required this.onGreet}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 6.0),
      child: ListTile(
        leading: CircleAvatar(
          radius: 24,
          child: Text(user.name.isNotEmpty ? user.name[0] : '?'),
        ),
        title: Text(user.name, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text('\ • '),
        trailing: GreetButton(onPressed: onGreet, label: '打招呼'),
        onTap: onTap,
      ),
    );
  }
}
