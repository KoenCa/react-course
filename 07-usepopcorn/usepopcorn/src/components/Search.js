import { useRef } from 'react'
import { useKey } from '../hooks/useKey'

export function Search({ query, setQuery }) {
  const searchInput = useRef(null)

  useKey('Enter', () => {
    if (document.activeElement === searchInput.current) return
    searchInput.current.focus()
    setQuery('')
  })

  return (
    <input
      ref={searchInput}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}
