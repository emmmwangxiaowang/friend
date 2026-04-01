import 'package:flutter/material.dart';
import '../models/user.dart';
import '../models/message.dart';

class ChatDetailScreen extends StatefulWidget {
  final String userId;
  final User? user;
  final String? initialGreeting;
  
  const ChatDetailScreen({Key? key, required this.userId, this.user, this.initialGreeting}) : super(key: key);

  @override
  _ChatDetailScreenState createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends State<ChatDetailScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Message> _messages = [];
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    // Add initial greeting message if provided
    if (widget.initialGreeting != null && widget.initialGreeting!.isNotEmpty) {
      _messages.add(Message(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        text: widget.initialGreeting!,
        fromMe: true,
        date: TimeOfDay.now().format(context),
      ));
      
      // Auto reply after 1-2 seconds
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _messages.add(Message(
              id: DateTime.now().millisecondsSinceEpoch.toString(),
              text: _getAutoReply(),
              fromMe: false,
              date: TimeOfDay.now().format(context),
            ));
          });
          _scrollToBottom();
        }
      });
    } else {
      // Default initial message
      _messages.add(Message(
        id: '1',
        text: '你好！很高兴认识你',
        fromMe: false,
        date: '10:00',
      ));
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _sendMessage() {
    if (_controller.text.trim().isEmpty) return;
    
    setState(() {
      _messages.add(Message(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        text: _controller.text,
        fromMe: true,
        date: TimeOfDay.now().format(context),
      ));
    });
    _controller.clear();
    _scrollToBottom();
    
    // Simulate reply after 1-2 seconds
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _messages.add(Message(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            text: _getAutoReply(),
            fromMe: false,
            date: TimeOfDay.now().format(context),
          ));
        });
        _scrollToBottom();
      }
    });
  }

  String _getAutoReply() {
    final replies = [
      '你好呀！也很高兴认识你～',
      '今天过得怎么样？',
      '有什么爱好吗？',
      '有空可以一起出来玩！',
      '哈哈，真有趣！',
    ];
    return replies[DateTime.now().second % replies.length];
  }

  @override
  Widget build(BuildContext context) {
    final user = widget.user ?? User(
      id: widget.userId,
      name: '用户',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: '',
      age: 0,
      distance: '',
      interests: [],
      isOnline: true,
      lastActive: '',
    );

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundImage: NetworkImage(user.avatar),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    user.name,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                  Text(
                    user.isOnline ? '在线' : '离线',
                    style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[index];
                return _MessageBubble(message: message);
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.1),
                  blurRadius: 4,
                  offset: const Offset(0, -2),
                ),
              ],
            ),
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        hintText: '发送消息...',
                        filled: true,
                        fillColor: Colors.grey[100],
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                      ),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: Theme.of(context).primaryColor,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 20),
                      onPressed: _sendMessage,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  final Message message;
  
  const _MessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: message.fromMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        decoration: BoxDecoration(
          color: message.fromMe ? Theme.of(context).primaryColor : Colors.grey[200],
          borderRadius: BorderRadius.circular(20).copyWith(
            bottomRight: message.fromMe ? const Radius.circular(4) : null,
            bottomLeft: !message.fromMe ? const Radius.circular(4) : null,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              message.text,
              style: TextStyle(
                color: message.fromMe ? Colors.white : Colors.black87,
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              message.date,
              style: TextStyle(
                color: message.fromMe ? Colors.white70 : Colors.grey[500],
                fontSize: 11,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
