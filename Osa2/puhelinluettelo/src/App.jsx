import { useState , useEffect} from 'react'
import axios from 'axios'
import personService from './services/person'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <form>
  <div>
    filter: <input value={newFilter} onChange={handleFilterChange} />
  </div>
</form>
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
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const deletePerson = (id) => {
    console.log("poistetaan")

      if (window.confirm(`Delete person with id${id}????`)) {
        personService.deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))

    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.error('Error adding person:', error)
      alert('Error while adding person.')
    })
  
  }

  const handleNameChange = (event) =>
   setNewName(event.target.value);
  const handleNumberChange = (event) => 
    setNewNumber(event.target.value);
  const handleFilterChange = (event) => 
    setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
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
//puhelinluettelo 2.14 step9