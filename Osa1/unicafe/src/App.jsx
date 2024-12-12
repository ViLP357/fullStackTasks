import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
    <td><p>{props.text} {props.value}</p></td>
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
      <tr>
        <td>good</td>
        <tr>{props.kaikki[0].hyvat}</tr>
      </tr>

      <tr>
      <td>Neutral</td>
      <tr>{props.kaikki[1].neutraalit}</tr>
      </tr>

      <tr>
      <td>Bad</td>
      <tr>{props.kaikki[2].huonot}</tr>
      </tr>

      <tr>
      <td>All</td>
      <td>{props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit}</td>
      </tr>

      <tr>
      <td>Average</td>
      <td>{(props.kaikki[0].hyvat + -(props.kaikki[2].huonot)) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit)}</td>
      </tr>

      <tr>
      <td>Positive</td>
      <td>{(props.kaikki[0].hyvat) / (props.kaikki[0].hyvat + props.kaikki[2].huonot + props.kaikki[1].neutraalit) * 100+ " %"}</td>
      </tr>
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
//unicafe step5 1.10