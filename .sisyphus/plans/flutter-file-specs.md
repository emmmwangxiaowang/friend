# Flutter项目文件规范 - 阶段一

## main.dart
```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'app.dart';
import 'config/theme.dart';
import 'blocs/auth/auth_bloc.dart';

void main() {
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider<AuthBloc>(
          create: (context) => AuthBloc(),
        ),
      ],
      child: const SoulMateApp(),
    ),
  );
}
```

## app.dart
```dart
import 'package:flutter/material.dart';
import 'config/theme.dart';
import 'config/routes.dart';

class SoulMateApp extends StatelessWidget {
  const SoulMateApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'SoulMate',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      routerConfig: AppRoutes.router,
      debugShowCheckedModeBanner: false,
    );
  }
}
```

## config/theme.dart
```dart
import 'package:flutter/material.dart';

class AppTheme {
  static const primaryColor = Color(0xFF9C27B0);
  static const secondaryColor = Color(0xFFE91E63);
  
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: Brightness.light,
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
  );
  
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      brightness: Brightness.dark,
    ),
  );
}
```

## config/routes.dart
```dart
import 'package:go_router/go_router.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/home/home_screen.dart';

class AppRoutes {
  static final router = GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
    ],
  );
}
```

## 目录结构说明
- `config/` - 配置文件(主题、路由等)
- `models/` - 数据模型
- `services/` - 服务层(API调用等)
- `repositories/` - 数据仓库层
- `blocs/` - 状态管理(BLoC)
- `screens/` - 页面
- `widgets/` - 自定义组件
