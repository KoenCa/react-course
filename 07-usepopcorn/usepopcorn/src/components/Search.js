import { useRef, useEffect } from 'react'

export function Search({ query, setQuery }) {
  const searchInput = useRef(null)

  useEffect(() => {
    function keyDownHandler(e) {
      if (document.activeElement === searchInput.current) return
      if (e.code !== 'Enter') return

      searchInput.current.focus()
      setQuery('')
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [setQuery])

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
