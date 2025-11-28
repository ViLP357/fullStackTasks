import { useDispatch, useSelector } from "react-redux"
//import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addVoteForAnecdote } from "../reducers/anecdoteReducer"
import { deleteNotification, changeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes.filter(a =>a.content.includes(filter))
    })

    const vote = (anecdote) => {
        //console.log("id", id)
        //dispatch(voteAnecdote(anecdote.id))
        dispatch(addVoteForAnecdote(anecdote.id, anecdote))

        dispatch(changeNotification(`You voted anecdote "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(deleteNotification())

        }, 5000)
    }
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div style={{margin:'8px'}} key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={()=>vote(anecdote)}>vote</button>
                </div>
                </div>
            ))}
        </div>
    )

}
export default AnecdoteList