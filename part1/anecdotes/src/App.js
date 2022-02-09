import React, { useState } from 'react'

const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(7).fill(0))

  const maxv = votes.indexOf(Math.max(...votes))

  const select = () => {
    const num = Math.floor(Math.random()*7)
    setSelected(num)
    }
  
  const vote = () => {
    const nvote = [...votes]
    nvote[selected] += 1
    setVote(nvote)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button onClick={select} text='Next anecdote'></Button>
      <Button onClick={vote} text='Vote'></Button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxv]}</p>
      <p>Has {votes[maxv]} votes</p>
    </div>
  )
}

export default App