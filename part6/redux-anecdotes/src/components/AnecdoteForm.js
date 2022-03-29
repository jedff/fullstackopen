import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) =>{
  let timeOut

  const addAnecdote = async (evt) => {
    evt.preventDefault()
    const content = evt.target.anecdote.value
    evt.target.anecdote.value = ''
    props.createAnecdote(content)
    clearTimeout(timeOut)
    props.setNotification(`Created anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

export default connect(
  null, 
  { createAnecdote, setNotification }
)(AnecdoteForm)