import { useDispatch, useSelector } from "react-redux"
//import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdote } from "../reducers/anecdoteReducer"
const AnecdoteList = () => {

    const anecdotes = useSelector(({filter, anecdotes}) => {
        //console.log(state.filter)

        return anecdotes.filter(a =>a.content.includes(filter))

    })
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div style={{margin:'8px'}} key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList