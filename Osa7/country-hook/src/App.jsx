import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState([])
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  useEffect(() => {
    //console.log("here1")
    axios
      .get(url)
      .then(response => {
        //console.log("hep1")
        setCountry({found:true, data: response.data})
    })
    .catch(() => {
      setCountry({found: false})
    })
  }, [name])
  //console.log("useCountry", country)
  return country
}

const Country = ({ country }) => {
  
  //console.log('here!2', country.data)
  if (!country) {
    return null
  }
  //console.log(country.data.name.common)
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  //console.log(country, "app")
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App