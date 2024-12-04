const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const Content = (props) => {
  return (
    <>
    <p>{props.sisalto[0].osa} {props.sisalto[0].harjoitukset}</p>
    <p>{props.sisalto[1].osa} {props.sisalto[1].harjoitukset}</p>
    <p>{props.sisalto[2].osa} {props.sisalto[2].harjoitukset}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const osat = [
    { osa: part1, harjoitukset: exercises1 },
    { osa: part2, harjoitukset: exercises2 },
    { osa: part3, harjoitukset: exercises3 }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content sisalto = {osat}/>
      <Total total = {exercises1 + exercises2 + exercises3}/>

    </div>
  )
}


export default App
//tämä on 1.1