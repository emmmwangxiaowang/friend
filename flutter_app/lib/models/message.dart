class Message {
  final String id;
  final String text;
  final bool fromMe;
  final String date;

  Message({
    required this.id,
    required this.text,
    required this.fromMe,
    required this.date,
  });

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['id'] as String,
      text: json['text'] as String,
      fromMe: json['fromMe'] as bool,
      date: json['date'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'text': text,
      'fromMe': fromMe,
      'date': date,
    };
  }
}

// Mock data for testing
final List<Message> mockMessages = [
  Message(
    id: 'm1',
    text: '嗨！最近怎么样？',
    fromMe: false,
    date: '10:00',
  ),
  Message(
    id: 'm2',
    text: '还不错，你呢？',
    fromMe: true,
    date: '10:01',
  ),
  Message(
    id: 'm3',
    text: '最近在忙什么？',
    fromMe: false,
    date: '10:02',
  ),
];
