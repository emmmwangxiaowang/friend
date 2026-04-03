import 'package:flutter/material.dart';

class HotTopics extends StatelessWidget {
  const HotTopics({Key? key}) : super(key: key);

  final List<Map<String, String>> topics = const [
    {'title': 'AI Trends', 'tag': '#AI'},
    {'title': 'Mobile UX', 'tag': '#UX'},
    {'title': 'Flutter 3.13', 'tag': '#Flutter'},
    {'title': 'Web 3.0', 'tag': '#Web3'},
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('热门话题', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            childAspectRatio: 3/2,
          ),
          itemCount: topics.length,
          itemBuilder: (context, index) {
            final t = topics[index];
            return Card(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(t['title']!, style: const TextStyle(fontWeight: FontWeight.bold)),
                    const SizedBox(height: 6),
                    Text(t['tag']!, style: const TextStyle(color: Colors.grey)),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
