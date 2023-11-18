import { useEffect } from 'react'

export function useKey(keyCode, callback) {
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.code?.toLowerCase() === keyCode?.toLowerCase()) callback?.()
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [keyCode, callback])
}
