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
export default PersonsToShow