import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        //console.log(state.filter)

        return state.anecdotes.filter(a =>a.content.includes(state.filter))

    })
    const dispatch = useDispatch()
    const vote = id => {
        //console.log(id)
        dispatch(voteAnecdote(id))
    }
    return (
        <div>
            {anecdotes.map(anecdote => (
                <div style={{margin:'8px'}} key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList