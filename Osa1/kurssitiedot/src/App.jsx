const Header = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
  )
}
const Part = (props) => {
  return (
  <>
  <p>{props.rivi.name} {props.rivi.exercises}</p>
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header kurssi = {course} />
      <Content sisalto = {parts}/>
      <Total total = {parts}/>
    </div>
  )
}


export default App

//tämä on 1.3