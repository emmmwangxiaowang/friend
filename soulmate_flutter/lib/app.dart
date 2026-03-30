import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'config/routes.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SoulMate',
      theme: appTheme,
      initialRoute: AppRoutes.initial,
      onGenerateRoute: AppRoutes.generateRoute,
      debugShowCheckedModeBanner: false,
    );
  }
}
