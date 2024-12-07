const Header = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}
const Part = (props) => {
  return (
  <>
  <p>{props.rivi.osa.name} {props.rivi.osa.exercises}</p>
  </>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part rivi = {props.sisalto[0]}/>
    <Part rivi = {props.sisalto[1]}/>
    <Part rivi = {props.sisalto[2]}/>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const osat = [
    {osa: part1}, {osa: part2}, {osa: part3}
  ]
  return (
    <div>
      <Header kurssi = {course} />
      <Content sisalto = {osat}/>
      <Total total = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}


export default App

//tämä on 1.3