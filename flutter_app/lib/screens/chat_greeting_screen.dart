import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/user.dart';

class ChatGreetingScreen extends StatefulWidget {
  final String userId;
  final User? user;
  
  const ChatGreetingScreen({Key? key, required this.userId, this.user}) : super(key: key);

  @override
  _ChatGreetingScreenState createState() => _ChatGreetingScreenState();
}

class _ChatGreetingScreenState extends State<ChatGreetingScreen> {
  final TextEditingController _controller = TextEditingController();
  bool _isSending = false;

  // Mock user data for display
  User get _targetUser => widget.user ?? User(
    id: widget.userId,
    name: '用户',
    avatar: 'https://i.pravatar.cc/150?img=',
    bio: '',
    age: 0,
    distance: '',
    interests: [],
    isOnline: true,
    lastActive: '',
  );

  void _sendGreeting() {
    if (_controller.text.trim().isEmpty) return;
    
    setState(() => _isSending = true);
    
    // Simulate sending delay then navigate to chat
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) {
        // Navigate to chat detail with greeting
        context.go('/chat/', extra: {
          'greeting': _controller.text.trim(),
          'user': _targetUser,
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('打招呼'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/'),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              // User info card
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundImage: NetworkImage(_targetUser.avatar),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _targetUser.name,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              _targetUser.isOnline ? '在线' : '离线',
                              style: TextStyle(
                                color: Colors.grey[600],
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              // Greeting prompt
              const Text(
                '发送一条友好的打招呼消息',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 16),
              // Input field
              TextField(
                controller: _controller,
                maxLines: 3,
                maxLength: 100,
                decoration: InputDecoration(
                  hintText: '你好，很高兴认识你！',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  filled: true,
                  fillColor: Colors.grey[100],
                ),
                onChanged: (_) => setState(() {}),
              ),
              const SizedBox(height: 16),
              // Send button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _controller.text.trim().isEmpty || _isSending 
                    ? null 
                    : _sendGreeting,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    backgroundColor: Theme.of(context).primaryColor,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isSending 
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Text(
                        '发送打招呼',
                        style: TextStyle(fontSize: 16),
                      ),
                ),
              ),
              const Spacer(),
              // Tips
              Text(
                '发送打招呼后，对方回复即可开始聊天',
                style: TextStyle(
                  color: Colors.grey[500],
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
