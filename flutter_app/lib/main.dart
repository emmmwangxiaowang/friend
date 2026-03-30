import 'package:flutter/material.dart';
import 'screens/discover_screen.dart';

void main() {
  runApp(const SoulMateApp());
}

class SoulMateApp extends StatelessWidget {
  const SoulMateApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SoulMate Discover',
      theme: ThemeData(useMaterial3: true),
      home: const DiscoverScreen(),
    );
  }
}
