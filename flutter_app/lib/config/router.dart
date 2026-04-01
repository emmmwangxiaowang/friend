import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../screens/home_screen.dart';
import '../screens/discover_screen.dart';
import '../screens/community_screen.dart';
import '../screens/chat_list_screen.dart';
import '../screens/chat_detail_screen.dart';
import '../screens/chat_greeting_screen.dart';
import '../screens/profile_screen.dart';
import '../widgets/bottom_nav_bar.dart';

class ScaffoldWithNavBar extends StatelessWidget {
  final Widget child;
  final int currentIndex;
  const ScaffoldWithNavBar({Key? key, required this.child, required this.currentIndex}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavBar(
        currentIndex: currentIndex,
        onTap: (index) {
          switch (index) {
            case 0: context.go('/'); break;
            case 1: context.go('/discover'); break;
            case 2: context.go('/community'); break;
          }
        },
      ),
    );
  }
}

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) {
        final location = state.uri.path;
        int currentIndex = 0;
        if (location.startsWith('/discover')) currentIndex = 1;
        else if (location.startsWith('/community')) currentIndex = 2;
        return ScaffoldWithNavBar(currentIndex: currentIndex, child: child);
      },
      routes: [
        GoRoute(path: '/', pageBuilder: (context, state) => NoTransitionPage(child: HomeScreen())),
        GoRoute(path: '/discover', pageBuilder: (context, state) => NoTransitionPage(child: DiscoverScreen())),
        GoRoute(path: '/community', pageBuilder: (context, state) => NoTransitionPage(child: CommunityScreen())),
      ],
    ),
    // Chat routes
    GoRoute(
      path: '/chat',
      builder: (context, state) => const ChatListScreen(),
      routes: [
        GoRoute(
          path: ':userId',
          builder: (context, state) {
            final userId = state.pathParameters['userId']!;
            final extra = state.extra as Map<String, dynamic>?;
            return ChatDetailScreen(
              userId: userId,
              user: extra?['user'],
              initialGreeting: extra?['greeting'],
            );
          },
          routes: [
            GoRoute(
              path: 'greeting',
              builder: (context, state) {
                final userId = state.pathParameters['userId']!;
                final extra = state.extra as Map<String, dynamic>?;
                return ChatGreetingScreen(
                  userId: userId,
                  user: extra?['user'],
                );
              },
            ),
          ],
        ),
      ],
    ),
    GoRoute(
      path: '/profile/:userId',
      builder: (context, state) {
        final userId = state.pathParameters['userId']!;
        return ProfileScreen(userId: userId);
      }
    ),
    GoRoute(
      path: '/groups',
      builder: (context, state) => const Center(child: Text('Groups (Coming Soon)')),
    ),
    GoRoute(
      path: '/soul-test',
      builder: (context, state) => const Center(child: Text('Soul Test (Coming Soon)')),
    ),
  ],
);
