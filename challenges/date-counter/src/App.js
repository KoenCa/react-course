import { useState } from 'react'

export default function App() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  function handleStepMinus() {
    if (step <= 1) return

    setStep(currentStep => currentStep - 1)
  }

  function handleStepPlus() {
    setStep(currentStep => currentStep + 1)
  }

  function handleCountMinus() {
    setCount(currentCount => currentCount - step)
  }

  function handleCountPlus() {
    setCount(currentCount => currentCount + step)
  }

  return (
    <div>
      <div>
        <button onClick={handleStepMinus}> - </button>
        <span>Step: {step}</span>
        <button onClick={handleStepPlus}> + </button>
      </div>

      <div>
        <button onClick={handleCountMinus}> - </button>
        <span>Count: {count}</span>
        <button onClick={handleCountPlus}> + </button>
      </div>

      <p>
        <DaysFromToday step={step} count={count} />
      </p>
    </div>
  )
}

function DaysFromToday({ count }) {
  const amountOfDays = count

  const newDate = new Date()
  newDate.setDate(newDate.getDate() + amountOfDays)
  const formattedDate = newDate.toLocaleDateString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (amountOfDays === -1) return <span>Yesterday was {formattedDate}</span>

  if (amountOfDays < 0)
    return (
      <span>
        {amountOfDays} days ago was {formattedDate}
      </span>
    )

  if (amountOfDays === 0) return <span>Today is {formattedDate}</span>

  if (amountOfDays === 1) return <span>Tomorrow is {formattedDate}</span>

  return (
    <span>
      {amountOfDays} days from today is {formattedDate}
    </span>
  )
}
