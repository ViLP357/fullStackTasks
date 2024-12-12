import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
    <p>{props.text} {props.value}</p>
    </>
  )
  }
const Statistics = (props) => {
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
      <p>All {props.arvostelut[0].hyvat + props.arvostelut[2].huonot + props.arvostelut[1].neutraalit}</p>
      </>
    )
  }
  const Positives = (props) => {
    return (
      <>
      <p>Positive {(props.arvostelut[0].hyvat) / (props.arvostelut[0].hyvat + props.arvostelut[2].huonot + props.arvostelut[1].neutraalit)}</p>
      </>
    )
  }

  if (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
      <div>
      <StatisticLine text="good" value ={props.kaikki[0].hyvat}/>
      <StatisticLine text = "neutral" value ={props.kaikki[1].neutraalit}/>
      <StatisticLine text = "bad" value={props.kaikki[2].huonot}/>

      <StatisticLine text = "All" value={props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit}/>
      <StatisticLine text = "Avarage" value={(props.kaikki[0].hyvat + -(props.kaikki[2].huonot)) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)}/>
      <StatisticLine text = "Positives" value={(props.kaikki[0].hyvat) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)}/>
      </div>
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
//unicafe step5 1.10