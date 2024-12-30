import { useState, useEffect } from 'react'
import countryService from './services/countries'
//import countries from './services/countries'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        find countries: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const Country= ({filteredCountries}) => {
  //console.log("ainoa: ", filteredCountries[0].name.common)
  return( 
    <h2>
      {filteredCountries[0].name.common}
    </h2>
  )
}

const CountriesToShow = ({countries, filterInUse}) => {
  const filteredCountries = filterInUse
  ? countries.filter(country => country.name.common.toLowerCase().includes(filterInUse.toLowerCase()))
  : countries

  if (filteredCountries.length > 10) {  
    return (
      <p>Too many matches, specify more</p>
    )
  }
  if (filteredCountries.length > 1) {
    return(
      <ul>
      {filteredCountries.map(country => (
        <li key ={country.name.official}>
          {country.name.common}
        </li>
      ))}
    </ul>
      )
    }
  
  //console.log("ennen: ", filteredCountries)
  return (
    <>
    <Country filteredCountries = {filteredCountries}/>
    </>
  )
}


function App() {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        //console.log("initil: ", initialCountries)
        //console.log("countries: ", countries)
      })
  }, [])

  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  //console.log("last: ", countries)
  
  return (
    <div>
    <p>Country info</p>
    <Filter newFilter = {newFilter}
      handleFilterChange={handleFilterChange}/>
    <CountriesToShow countries={countries}
      filterInUse={newFilter}/>
    </div>
  )
}

export default App
