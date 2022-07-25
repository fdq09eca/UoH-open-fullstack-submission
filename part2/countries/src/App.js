import { useState, useEffect } from 'react'
import axios from 'axios'
import { SearchCountry } from './SearchCountry'
import { Countries } from './Countries'

const countriesEndpoint = 'https://restcountries.com/v3.1/all'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  function handleSearchCountries(e) {
    setSearchCountries(e.target.value)
  }

  function hook() {
    const handleResponse = response => {
      setCountries(response.data)
    }
    axios.get(countriesEndpoint).then(handleResponse)
  }

  useEffect(hook, [])

  return <>
    <SearchCountry value={searchCountries} onChange={handleSearchCountries} />
    <Countries countries={countries} searchCountries={searchCountries} />
  </>
}

export default App;
