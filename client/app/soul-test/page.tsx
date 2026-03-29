import React from 'react'
import SoulQuestion from '../components/SoulQuestion'

export default function SoulTestPage() {
  const questions = [
    { id: 'q1', text: '你更愿意和什么样的人交往？', options: ['内向且细心', '外向且热情', '理性且稳重'] },
  ]
  return (
    <main className="p-4 pt-6">
      <h1 className="text-2xl font-bold mb-4">Soul Test - 选择题</h1>
      {questions.map((q) => (
        <SoulQuestion key={q.id} id={q.id} text={q.text} options={q.options} />
      ))}
    </main>
  )
}
