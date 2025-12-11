import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {
   const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: () => {
      notificationDispatch({type: 'NEW', payload: `too short anecdote, must have length 5 or more`})
      setTimeout(() => {
        notificationDispatch({type:'DELETE'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
  
    newAnecdoteMutation.mutate({content,votes: 0 })
    notificationDispatch({type: 'NEW', payload: `You created anecdote '${content}'`})

    setTimeout(() => {
      notificationDispatch({type: 'DELETE'})
    }, 5000)  
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
