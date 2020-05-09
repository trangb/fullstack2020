import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'
import Countries from './components/Countries'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countriesToShow = countries.filter(country => {
        if (countryFilter) {
          return country.name.toUpperCase().includes(countryFilter.toUpperCase())
        } else {
          return false
        }
      })
  
  const handleFilter = (event) => {
    setCountryFilter(event.target.value);
  }

  if (countriesToShow.length === 1) {
    return (
      <div >
          <Filter value={countryFilter} handler={handleFilter} />
          <CountryDetails toShow={countriesToShow} />
      </div>
    );
  } else {
    return (
      <div >
          <Filter value={countryFilter} handler={handleFilter} />
          <Countries countries={countriesToShow} />
      </div>
    );

  }
}

export default App;
