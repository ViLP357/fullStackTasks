import { createSlice } from "@reduxjs/toolkit"
import anecdoteServce from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      
      const id = action.payload.id
      console.log(id)
      const votedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }

      return state.map((anecdote) => anecdote.id !== id ? anecdote : changedAnecdote).sort((a,b) => b.votes-a.votes)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {    
      return action.payload.sort((a,b) => b.votes-a.votes)
    }
  }
})

const { createAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServce.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServce.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVoteForAnecdote = (id, anecdote) => {
  return async (dispatch)=> {
    const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
    const votedAnecdote = await anecdoteServce.voteAnecdote(id, changedAnecdote)
    dispatch(voteAnecdote(votedAnecdote))
  }
}
 
export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
