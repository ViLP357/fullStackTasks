import { useState } from 'react'

const App = () => {
  const generate = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const ääni = () => {
    const copy = [...pisteet]
    copy[selected] += 1
    setPisteet(copy)
  }
  const MaxVotesIndex = (list) => {
    let maxIndex = 0;
    for (let i = 1; i < list.length; i++) {
      if (list[i] > list[maxIndex]) {
        maxIndex = i
      }
    }
    return maxIndex
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  //const pisteet = Array(anecdotes.length).fill(0)
  const [pisteet, setPisteet] = useState(Array(anecdotes.length).fill(0));
  console.log(pisteet[MaxVotesIndex(pisteet)])

  if (pisteet[MaxVotesIndex(pisteet)] == 0) {
    return (    
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {pisteet[selected]} votes</p>
      <button onClick={ääni}>Vote</button>
      <button onClick={generate}>next</button>

      <h2>Anecdote with most votes</h2>
      <p>No votes</p>
    </div>
    )
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {pisteet[selected]} votes</p>
      <button onClick={ääni}>Vote</button>
      <button onClick={generate}>next</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[MaxVotesIndex(pisteet)]}</p>
      <p>has {pisteet[MaxVotesIndex(pisteet)]} votes</p>
    </div>
  )
}

export default App
//step 3 anekdootit 1.14