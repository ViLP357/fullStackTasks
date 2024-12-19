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

const Courses = (props) => {

  const result = props.courses.map(kurssi => <div key = {kurssi.id}>{kurssi.name}</div>)
  const osat = props.courses.map(kurssi => <div key = {kurssi.id}>{kurssi.parts}</div>)
  //console.log("osia", osat)

  //console.log("osia", osat[0].props.children[0])

  return (
    <div>
    <h1>Web development curriculum</h1>
    {props.courses.map(kurssi => (
      <Course key = {kurssi.id} kurssinOsat = {kurssi}/>
    ))}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App
//kurssitiedot step 9, 2.4