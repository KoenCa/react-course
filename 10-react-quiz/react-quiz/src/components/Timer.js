import { useEffect } from 'react'

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [dispatch])

  return (
    <div className="timer">
      {minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}
    </div>
  )
}

export default Timer
