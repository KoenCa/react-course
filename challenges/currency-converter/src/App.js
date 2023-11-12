// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from 'react'

function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')
  const [isFetching, setIsFetching] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchCurrencyConvertion() {
      try {
        setIsFetching(true)
        setError('')

        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal: abortController.signal }
        )
        const data = await response.json()

        if (!response.ok) throw new Error(data.message)

        setResult(data.rates[toCurrency])
        setIsFetching(false)
      } catch (error) {
        if (error.name === 'AbortError') return

        setIsFetching(false)
        setError(error.message)
      }
    }

    if (!amount) {
      setResult('')
      setIsFetching(false)
      return
    }

    fetchCurrencyConvertion()

    return () => abortController.abort()
  }, [amount, fromCurrency, toCurrency])

  function handleSetFromCurrency(event) {
    const fromCurrencyInputValue = event.target.value
    if (fromCurrencyInputValue === toCurrency) return

    setFromCurrency(fromCurrencyInputValue)
  }

  function handleSetToCurrency(event) {
    const toCurrencyInputValue = event.target.value
    if (toCurrencyInputValue === fromCurrency) return

    setToCurrency(toCurrencyInputValue)
  }

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select value={fromCurrency} onChange={handleSetFromCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={handleSetToCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {isFetching && !error && <p>Loading...</p>}
      {!isFetching && !error && <p>{result}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
