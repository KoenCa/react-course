import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message
        message={'Add your first country by clicking on a country on the map'}
      />
    )

  const countries = cities.reduce((accCountries, city) => {
    if (
      !accCountries.map(countryObj => countryObj.country).includes(city.country)
    ) {
      accCountries.push({ country: city.country, emoji: city.emoji })
    }

    return accCountries
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map(countryObj => (
        <CountryItem key={countryObj.country} country={countryObj} />
      ))}
    </ul>
  )
}

export default CountryList
