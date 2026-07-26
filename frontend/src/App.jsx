import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {

  const [goal, setGoal] = useState("")
  const [syllabus, setSyllabus] = useState("")
  const [hours, setHours] = useState("")
  const [plan, setPlan] = useState("")
  const [loading, setLoading] = useState(false)

  async function generatePlan() {
    setLoading(true)

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate",
        {
          goal: goal,
          syllabus: syllabus,
          hours: Number(hours)
        }
      )

      console.log(response.data)

      setPlan(response.data.plan)

    } catch (error) {
      console.log(error)
      setPlan("Something went wrong.")
    }

    setLoading(false)
  }

  return (
    <>
      <h1>Welcome to Goal2Plan AI</h1>
      <p>AI Powered Study Planner</p>

      <input
        type="text"
        placeholder="🎯 Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <br /><br />

      <textarea
    placeholder="📚 Enter your syllabus or describe what you want to learn (Optional)"
    value={syllabus}
    onChange={(e) => setSyllabus(e.target.value)}
>    </textarea>

      <br /><br />

      <input
        type="number"
        placeholder="⏰ Study hours per day"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <br /><br />

      <button onClick={generatePlan}>
        Generate AI Plan
      </button>

      <p>Let's turn your goals into an actionable study plan.</p>

      <div>
        <h2>Your Learning Plan</h2>

        {loading && <p>⏳ Generating your AI plan...</p>}

        <pre style={{ whiteSpace: "pre-wrap" }}>
          {plan}
        </pre>

      </div>
    </>
  )
}

export default App