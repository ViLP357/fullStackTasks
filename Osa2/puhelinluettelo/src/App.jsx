import { useState } from 'react';

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

const PersonsToShow = ({ persons, filterInUse }) => {
  const filteredPersons = filterInUse
    ? persons.filter(person => person.name.toLowerCase().includes(filterInUse.toLowerCase()))
    : persons

  return (
    <>
      {filteredPersons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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
          filterInUse={newFilter} />
      </ul>
    </div>
  )
}

export default App;
//puhelinluettelo 2.10 step5