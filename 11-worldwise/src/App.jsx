import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'

const BASE_URL = 'http://localhost:8000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)

        const response = await fetch(`${BASE_URL}/cities`)
        const json = await response.json()
        setCities(json)
      } catch (error) {
        alert('An error occurred while fetching the cities.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
