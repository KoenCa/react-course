import { useState, useEffect } from 'react'

export function useLocalStorageState(initialState, key) {
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem(key)
    return storedState ? JSON.parse(storedState) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState]
}
