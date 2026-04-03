import 'package:flutter/material.dart';
import 'config/router.dart';

void main() {
  runApp(const SoulMateApp());
}

class SoulMateApp extends StatelessWidget {
  const SoulMateApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'SoulMate',
      theme: ThemeData(
        useMaterial3: true,
        primarySwatch: Colors.purple,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF7C3AED),
          brightness: Brightness.light,
        ),
      ),
      routerConfig: router,
    );
  }
}
