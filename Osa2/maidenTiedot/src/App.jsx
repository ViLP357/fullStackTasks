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

const Country= ({filteredCountries, countryData, setCountryData}) => {
  //console.log(filteredCountries)
  const name = filteredCountries[0].name.common
  //console.log(name)
  //<ul>
  //{countryData.languages(lan => (
  //  <li key = {lan}>{lan}</li>
  //))}
//</ul>
  countryService
  .find(name)
  .then(returnedData => {
    setCountryData(returnedData)
    //console.log(returnedData)
    //console.log(returnedData.name.official)
  })
  //console.log(countryData.languages)
  //console.log("ainoa: ", filteredCountries[0].name.common)
  //<ul>
  //{countryData.languages.map(lan => (
  //  <li key = {lan}>{countryData[lan][0]}</li>
  //))}


  //</ul>
  //console.log(countryData.languages["fin"])
  if (countryData.languages != null) {
  return( 
    <div>
      
      <h2>
        {filteredCountries[0].name.common}
      </h2>
      <p>capital: {countryData.capital}</p>
      <p>area: {countryData.area}</p>
      <h5>Languages:</h5>

      <ul>{Object.entries(countryData.languages)
      .map( ([key, value]) => <li key = {key}>{value}</li>
      )}</ul>

      <img 
      src={countryData.flags["png"]}
      alt="new"
      />

      
    </div>
  )
  }
}

const CountriesToShow = ({countries, filterInUse, countryData, setCountryData}) => {
  const filteredCountries = filterInUse
  ? countries.filter(country => country.name.common.toLowerCase().includes(filterInUse.toLowerCase()))
  : countries

  if (filteredCountries.length === 0) {
    return (
      <p>Nothinf</p>
    )
  }

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

  return (
    <>
    <Country filteredCountries = {filteredCountries} countryData={countryData} setCountryData= {setCountryData}/>
    </>
  )
}

function App() {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [countryData, setCountryData] = useState([])

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
      filterInUse={newFilter} countryData={countryData} setCountryData={setCountryData}/>
    </div>
  )
}

export default App
