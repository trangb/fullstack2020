import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const nextAnecdote = () => setSelected(Math.ceil(Math.random() * props.anecdotes.length) - 1)
  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1
    setVote(copy)
  }
  let most = 0;
  for (let i = 0; i < votes.length; i++) {
    console.log('most: ' + most)
    if (votes[i] > votes[most]) {
      most = i;
      console.log('most after: ' + most)
    }
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <Header name="Anecdote with most votes" />
      <div>
        {props.anecdotes[most]}
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)