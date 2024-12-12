import { useState } from 'react'

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
const Avarage = (props) => {
  return (
    <>
    
    <p>Avarage {(props.arvostelut[0].hyvat + -(props.arvostelut[2].huonot)) / (props.arvostelut[0].hyvat + props.arvostelut[2].huonot + props.arvostelut[1].neutraalit)}</p>
    </>
  )
}
const Total = (props) => {
  return (
    <>
    <p>All {props.maara}</p>
    </>
  )
}
const Positives = (props) => {
  return (
    <>
    <p>Positive {(props.kaikki[0].hyvat) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)}</p>
    </>
  )
}

const values = [
  {hyvat: good},
  {neutraalit: neutral},
  {huonot: bad}
]
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <h2>statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>

      <Total maara = {good + bad + neutral}/>
      <Avarage arvostelut = {values} />
      <Positives kaikki = {values}/>
    </div>
  )
}

export default App
//unicafe step2 1.7