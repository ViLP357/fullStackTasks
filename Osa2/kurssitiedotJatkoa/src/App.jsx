const Course = (props) => {
  const header = props.course.name
 
  const result = props.course.parts.map(osa => <div key = {osa.id}>{osa.name} {osa.exercises}</div>)

  const initialValue = 0
  const total = props.course.parts.reduce( (s, value) => s +  value.exercises, initialValue,)
  console.log(total)
  return (
    <>
    <h1>{header}</h1>
    {result}
    total of {total} exercises
    </>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
//kurssitiedot step 8, 2.3