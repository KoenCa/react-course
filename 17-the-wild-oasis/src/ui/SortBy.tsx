import { useSearchParams } from 'react-router-dom'
import { Select } from './Select'

interface SortByProps {
  options: Array<{ label: string; value: string }>
}

export const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setSearchParams(prevSearchParams => {
      prevSearchParams.set('sortBy', e.target.value)
      return prevSearchParams
    })
  }

  return (
    <Select options={options} value={sortBy} onChange={handleChange}></Select>
  )
}
