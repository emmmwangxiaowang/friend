"use client";
import React from 'react'

export type SoulQuestionProps = {
  id: string
  text: string
  options: string[]
}

export default function SoulQuestion({ id, text, options }: SoulQuestionProps) {
  const [selected, setSelected] = React.useState<string | null>(null)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
      <div className="text-sm font-semibold mb-2">{text}</div>
      <div className="flex flex-col space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={`q-${id}`}
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
