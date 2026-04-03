class Question {
  final String id;
  final String text;
  final List<String> options;

  Question({
    required this.id,
    required this.text,
    required this.options,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['id'] as String,
      text: json['text'] as String,
      options: List<String>.from(json['options'] as List),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'text': text,
      'options': options,
    };
  }
}

// Mock data for testing
final List<Question> mockQuestions = [
  Question(
    id: '1',
    text: '在社交场合中，你更倾向于？',
    options: ['主动与人交流', '等待别人来找你', '观察他人', '独自享受'],
  ),
  Question(
    id: '2',
    text: '做决定时，你更看重？',
    options: ['逻辑分析', '直觉感受', '他人建议', '经验总结'],
  ),
  Question(
    id: '3',
    text: '你理想的周末是？',
    options: ['户外活动', '在家休息', '朋友聚会', '学习新技能'],
  ),
  Question(
    id: '4',
    text: '面对压力时，你通常会？',
    options: ['寻求帮助', '独自解决', '暂时逃避', '分析问题'],
  ),
  Question(
    id: '5',
    text: '你更喜欢哪种沟通方式？',
    options: ['文字消息', '语音通话', '视频通话', '面对面'],
  ),
];
