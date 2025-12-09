import { isCancelledError } from "@tanstack/react-query"

export const getAnecdotes = async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }
      return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch ('http://localhost:3001/anecdotes', options)
    if (!response.ok) {
        throw new Error ('Failed to create anecdote')
    }
    return await response.json()
}