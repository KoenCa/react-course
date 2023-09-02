import { Bill } from './components/Bill'
import { ServicePercentage } from './components/ServicePercentage'
import { Result } from './components/Result'
import { Reset } from './components/Reset'
import { useState } from 'react'

export default function App() {
  const [bill, setBill] = useState('')
  const [myPercentage, setMyPercentage] = useState(0)
  const [friendPercentage, setFriendPercentage] = useState(0)

  const averagePercentage = (myPercentage + friendPercentage) / 2
  const tip = bill * (averagePercentage / 100)
  const total = bill + tip

  function handleReset() {
    setBill('')
    setMyPercentage(0)
    setFriendPercentage(0)
  }

  return (
    <div>
      <h1>Tip Calculator</h1>

      <Bill bill={bill} onBillChange={setBill} />
      <ServicePercentage
        percentage={myPercentage}
        onPercentageChange={setMyPercentage}
      >
        How did you like the service?
      </ServicePercentage>
      <ServicePercentage
        percentage={friendPercentage}
        onPercentageChange={setFriendPercentage}
      >
        How did your friend like the service?
      </ServicePercentage>
      <Result
        total={total}
        bill={bill}
        tip={tip}
      />
      <Reset onReset={handleReset} />
    </div>
  )
}
