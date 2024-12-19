import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('name')

  const lisaaNimi = (event) => {
    event.preventDefault()
    const nimiObject = {
      content: newName
    }
    setPersons(persons.concat(nimiObject))
    setNewName("")
    console.log("klikattu")
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={lisaaNimi}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key = {person.content}>{person.content}</div>)}
  
    </div>
  )

}

export default App
