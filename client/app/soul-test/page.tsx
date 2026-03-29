'use client';

import { useState } from 'react';

type Question = {
  id: string;
  text: string;
  options: string[];
};

type TestResult = {
  type: string;
  description: string;
  traits: string[];
};

const questions: Question[] = [
  { id: '1', text: '在社交场合中，你更倾向于？', options: ['主动与人交流', '等待别人来找你', '观察他人', '独自享受'] },
  { id: '2', text: '做决定时，你更看重？', options: ['逻辑分析', '直觉感受', '他人建议', '经验总结'] },
  { id: '3', text: '你理想的周末是？', options: ['户外活动', '在家休息', '朋友聚会', '学习新技能'] },
  { id: '4', text: '面对压力时，你通常会？', options: ['寻求帮助', '独自解决', '暂时逃避', '分析问题'] },
  { id: '5', text: '你更喜欢哪种沟通方式？', options: ['文字消息', '语音通话', '视频通话', '面对面'] },
];

const results: Record<string, TestResult> = {
  A: { type: '社交达人型', description: '你善于交际，喜欢结识新朋友，在人群中总是闪闪发光。', traits: ['外向', '热情', '善于表达'] },
  B: { type: '深度思考型', description: '你喜欢独处，善于思考，总能看到别人看不到的细节。', traits: ['内向', '理性', '洞察力强'] },
  C: { type: '灵活应变型', description: '你适应能力强，能在不同环境中找到自己的位置。', traits: ['灵活', '适应力强', '平衡'] },
  D: { type: '稳健务实型', description: '你脚踏实地，注重实际，是值得信赖的伙伴。', traits: ['稳重', '务实', '可靠'] },
};

export default function SoulTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const resultKey = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
      setResult(results[resultKey]);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold mb-2">测试结果</h2>
            <div className="text-purple-600 dark:text-purple-400 text-xl font-bold mb-4">{result.type}</div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{result.description}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {result.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={resetTest}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                重新测试
              </button>
              <button
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                分享结果
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Soul测试</span>
            <span>{currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].text}</h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
