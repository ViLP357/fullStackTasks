const Course = ({kurssinOsat}) => {
    //console.log("osat at course", kurssinOsat)
    const initialValue = 0
    const total = kurssinOsat.parts.reduce( (s, value) => s +  value.exercises, initialValue,)
    //console.log(total)
    return(
      <>
      <h3>{kurssinOsat.name}</h3>
      {kurssinOsat.parts.map(osa => <div key = {osa.id}>{osa.name} {osa.exercises}</div>)}
      <p>total of {total} exercises</p>
      </>
  
    )
  }
  
  const Courses = ({courses}) => {
    
    //const result = courses.map(kurssi => <div key = {kurssi.id}>{kurssi.name}</div>)
    //const osat = courses.map(kurssi => <div key = {kurssi.id}>{kurssi.parts}</div>)
    //console.log("osia", osat)
    //console.log("osia", osat[0].props.children[0])
  
    return (
      <div>
      <h1>Web development curriculum</h1>
      {courses.map(kurssi => (
        <Course key = {kurssi.id} kurssinOsat = {kurssi}/>
      ))}
      </div>
    )
  }
export default Courses