import { createSlice } from "@reduxjs/toolkit"
//import { current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      
      const id = action.payload
      console.log(id)
      const votedAnecdote = state.find(n => n.id === id)
      //console.log(current(votedAnecdote))
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }

      return state.map((anecdote) => anecdote.id !== id ? anecdote : changedAnecdote).sort((a,b) => b.votes-a.votes)
    },
    createAnecdote(state, action) {
      console.log(action.payload)
      const newAnecdote = {
        content: action.payload,
        id: 3,
        votes: 0
      }
      return [...state, newAnecdote]
    }, 
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
