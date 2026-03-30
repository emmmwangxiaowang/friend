import 'package:flutter/material.dart';
import '../widgets/hero_banner.dart';
import '../widgets/hot_topics.dart';
import '../widgets/user_recommendations.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              HeroBanner(),
              SizedBox(height: 20),
              HotTopics(),
              SizedBox(height: 20),
              UserRecommendations(),
            ],
          ),
        ),
      ),
    );
  }
}
