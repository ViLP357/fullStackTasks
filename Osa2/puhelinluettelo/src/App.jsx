import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '+234 45325543'
     }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const lisaaHenkilo = (event) => {
    event.preventDefault()
    const henkiloObject = {
      name: newName,
      number: newNumber
    }

    var loytyy = false
    for (let i = 0; i < persons.length; i++) {

      if (persons[i].name == henkiloObject.name) {
        alert(`${henkiloObject.name} is already added to phonebook`)
        loytyy = true
      }
    }
    if (loytyy == false) {
      setPersons(persons.concat(henkiloObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={lisaaHenkilo}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>

        <div>
          number: <input
           value={newNumber}
           onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key = {person.name}>{person.name} {person.number}</div>)}
  
    </div>
  )
}

export default App
//puhelinluettelo step3 2.8