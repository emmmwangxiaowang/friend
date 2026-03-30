import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'config/routes.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Skeleton',
      theme: appTheme,
      onGenerateRoute: AppRoutes.generateRoute,
      initialRoute: '/',
    );
  }
}
