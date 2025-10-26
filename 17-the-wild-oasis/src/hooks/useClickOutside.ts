import { useEffect, useRef } from 'react'

export const useClickOutside = <T>(
  handler: () => void,
  shouldCheckForClicks = false
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!shouldCheckForClicks) return

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => document.removeEventListener('click', handleClick, true)
  }, [handler])

  return ref
}
