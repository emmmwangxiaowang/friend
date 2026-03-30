import 'package:flutter/material.dart';

class UserRecommendations extends StatelessWidget {
  const UserRecommendations({Key? key}) : super(key: key);

  final List<Map<String, String>> users = const [
    {'name': 'Alex', 'status': 'New here'},
    {'name': 'Mia', 'status': 'Loves Flutter'},
    {'name': 'Liam', 'status': 'Coffee enthusiast'},
    {'name': 'Noah', 'status': 'Frontend dev'},
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('为你推荐', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: users.length,
          itemBuilder: (context, index) {
            final u = users[index];
            return Card(
              margin: const EdgeInsets.symmetric(vertical: 6),
              child: ListTile(
                leading: const CircleAvatar(child: Icon(Icons.person)),
                title: Text(u['name']!),
                subtitle: Text(u['status']!),
              ),
            );
          },
        ),
      ],
    );
  }
}
