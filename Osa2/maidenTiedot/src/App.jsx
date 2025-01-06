import { useState, useEffect, useRef } from 'react'
import countryService from './services/countries'

//viimeistelyä icon vailla valmis
const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        find countries: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const Country= ({filteredCountries, countryData, setCountryData, weatherData, setWeatherData}) => {
  const previousCountry = useRef(null)
  //console.log(filteredCountries)
  //
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const selectedCountry = filteredCountries[0].name.common


      if (previousCountry.current !== selectedCountry) {
        previousCountry.current = selectedCountry


        countryService.find(selectedCountry).then((returnedData) => {
          setCountryData(returnedData)
        })

        countryService
          .getWeather(filteredCountries[0].capital[0], selectedCountry)
          .then((returnedData) => {
            setWeatherData(returnedData)
          })
      }
    }
  }, [filteredCountries, setCountryData, setWeatherData])

  // Odotetaan tietojen latautumista
  if (!countryData || !countryData.languages) {
    return <p>Ladataan maan tietoja...</p>
  }

  if (!weatherData) {
    return <p>Ladataan säätietoja...</p>
  }


  
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
      <h2>Weather in {countryData.capital[0]}
      </h2>
      <p>Temperature {((weatherData.main.temp) - 273.15).toFixed(2)} Celsius</p>

      <img
      src= {`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      
      alt="new"
      />

      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
  }
}


const CountriesToShow = ({countries, filterInUse, countryData, setCountryData, weatherData, setWeatherData}) => {
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
    <Country filteredCountries = {filteredCountries} countryData={countryData} setCountryData= {setCountryData} weatherData={weatherData} setWeatherData={setWeatherData}/>
    </>
  )
}

function App() {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [countryData, setCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)


  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
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
      filterInUse={newFilter} countryData={countryData} setCountryData={setCountryData} weatherData={weatherData} setWeatherData={setWeatherData}/>
    </div>
  )
}

export default App
