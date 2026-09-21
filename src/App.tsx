import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center">
      <span className="custom-badge">Tailwind + CSS</span>
      <h1 className="text-3xl font-bold text-slate-900">Ally Alarm Web</h1>
      <p className="text-slate-600">
        Este proyecto combina clases de Tailwind con CSS clásico (
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">
          App.css
        </code>
        ).
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
