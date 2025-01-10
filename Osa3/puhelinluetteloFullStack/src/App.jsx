import { useState , useEffect} from 'react'
import axios from 'axios'
import personService from './services/person'
import './index.css'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <form>
  <div>
    filter: <input value={newFilter} onChange={handleFilterChange} />
  </div>
</form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}
const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const PersonsToShow = ({ persons, filterInUse, deletePerson }) => {
  //console.log("Persons data:", persons); // Tarkista konsolista, mitä dataa `persons` sisältää

  const filteredPersons = filterInUse
    ? persons.filter(person => person.name.toLowerCase().includes(filterInUse.toLowerCase()))
    : persons;

  return (
    <>
      {filteredPersons.map(person => (
        <p className="person" key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const deletePerson = (id) => {
    //console.log("poistetaan")

      if (window.confirm(`Delete person with id${id}????`)) {
        personService.deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
            setInfoMessage("poistaminen onnistui")
            setTimeout(() => {
              setInfoMessage(null)
            }, 3000)
          })
          .catch(error => {
            console.error("Error deleting person:", error)
            alert("Failed to delete person.")
          })
      }
    }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      //täällä step 10
      //etsi oikea henkilö
      const henkilo = persons.find((person) => person.name === newName)
      //console.log("muutettava: ", henkilo)
      const changedHenkilo = { ...henkilo, number: newNumber}
      //console.log("muutettuna: ", changedHenkilo)

      personService 
      .update(henkilo.id, changedHenkilo)
      .then(response => {
        //console.log("here: ", response)
        setPersons(persons.map(person => person.id !== henkilo.id ? person : response))
        //console.log(persons)
        setNewName("")
        setNewNumber("")
        setInfoMessage(`Henkilo ${response.name} numeron muutos onnistui`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000)
      })
      .catch(error => {
        //alert(`the person was already deleted from server`)
        setErrorMessage("the person has already been deleted from server")
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      

    } else {
        setPersons(persons.concat(personObject))

      
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setInfoMessage(`${returnedPerson.name} lisatty`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.error('Error adding person:', error)
          alert('Error while adding person.')
        })
    }
  }

  const handleNameChange = (event) =>
   setNewName(event.target.value)
  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)
  const handleFilterChange = (event) => 
    setNewFilter(event.target.value)



  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={infoMessage} />
      <ErrorNotification message={errorMessage}/>
      <Filter newFilter ={newFilter} 
        handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
        newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <ul>
        <PersonsToShow persons={persons} 
          filterInUse={newFilter} deletePerson={deletePerson}/>
      </ul>
    </div>
  )
}

export default App;
//puhelinluettelo 2.17 step12