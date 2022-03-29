import { useDispatch, useSelector } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)))

  return (
    <div>
     {anecdotes.slice().sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(votedAnecdote(anecdote))
              dispatch(setNotification(`Voted anecdote '${anecdote.content}'`, 5))
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList