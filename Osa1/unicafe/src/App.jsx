//unicafe 1.11 step6

import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </>
  )
  }
const Statistics = (props) => {


  if (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
      <table>
      <tr><StatisticLine text="good" value ={props.kaikki[0].hyvat}/></tr>
      <tr><StatisticLine text = "neutral" value ={props.kaikki[1].neutraalit}/></tr>
      <tr><StatisticLine text = "bad" value={props.kaikki[2].huonot}/></tr>

      <tr><StatisticLine text = "All" value={props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit}/></tr>
      <tr><StatisticLine text = "Avarage" value={(props.kaikki[0].hyvat + -(props.kaikki[2].huonot)) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)}/></tr>
      <tr><StatisticLine text = "Positives" value={(props.kaikki[0].hyvat) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)*100 + " %"}/></tr>
      </table>

    )

}

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const handleGoodClick = () => {
  setGood(good + 1)
}

const handleNeutralClick = () => {
  setNeutral(neutral + 1)
}

const handleBadClick = () => {
  setBad(bad + 1)
}

const values = [
  {hyvat: good},
  {neutraalit: neutral},
  {huonot: bad}
]

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <Statistics kaikki = {values}/>
    </div>
  )
} 


export default App
//unicafe step6 1.11