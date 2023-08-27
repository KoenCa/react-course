import { useState } from 'react'

export default function App() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  function handleCountMinus() {
    setCount(currentCount => currentCount - step)
  }

  function handleCountPlus() {
    setCount(currentCount => currentCount + step)
  }

  function handleReset() {
    setStep(1)
    setCount(0)
  }

  return (
    <div>
      <div>
        <span>
          Step:{' '}
          <input
            type="range"
            min={0}
            step={1}
            value={step}
            onChange={e => setStep(e.target.valueAsNumber)}
          />{' '}
          {step}
        </span>
      </div>

      <div>
        Count:{' '}
        <button onClick={handleCountMinus}> - </button>{' '}
        <input
          type="number"
          value={count}
          onChange={e => setCount(e.target.valueAsNumber)}
        />{' '}
        <button onClick={handleCountPlus}> + </button>
      </div>

      <p>
        <DaysFromToday count={count} />
      </p>

      {(step !== 1 || count !== 0) && (
        <button onClick={handleReset}>Reset</button>
      )}
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
