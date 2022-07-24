import { useState, useEffect } from 'react'
import axios from 'axios'

const endpoint = 'https://restcountries.com/v3.1/all'

function SearchCountry({ value, onChange }) {
  return <>find countries: <input value={value} onChange={onChange}></input></>
}

function CountrySearchResultBreif({ country }) {
  return <p>{country.name.common}</p>
}

function Language({ language_value }) {
  return <li>{language_value}</li>
}

function Languages({ country }) {
  console.log(country.languages)
  return Object.entries(country.languages).map(lang => <Language key={lang[0]} language_value={lang[1]} />)
}

function CountryFlag({ country }) {
  const alt = `${country.name.common}_flag`
  return <img alt={alt} src={country.flags.png} />
}

function CountrySearchResultDetail({ country }) {
  return <>
    <CountrySearchResultBreif />
    <h2>{country.name.common}</h2>
    <p>capital: {country.capital}</p>
    <p>area: {country.area}</p>
    <h3>langauge</h3>
    <Languages country={country} />
    <CountryFlag country={country} />
  </>
}

function filterCountries(country, searchCountries) {
  return country.name.common.toLowerCase().startsWith(searchCountries.toLowerCase())
}

function Countries({ countries, searchCountries }) {
  console.log(countries)
  const results = countries.filter(country => filterCountries(country, searchCountries))

  if (results.length === 0) {
    return <p>No such country, specify another filter</p>
  }
  if (results.length === 1) {
    return <CountrySearchResultDetail country={results[0]} />
  }
  if (results.length <= 10) {
    return results.map(country => <CountrySearchResultBreif key={country.name.common} country_name={country} />)
  }
  return <p>Too many matches, specify another filter</p>
}


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
    axios.get(endpoint).then(handleResponse)
  }

  useEffect(hook, [])

  return <>
    <SearchCountry value={searchCountries} onChange={handleSearchCountries} />
    <Countries countries={countries} searchCountries={searchCountries} />
  </>
}

export default App;
