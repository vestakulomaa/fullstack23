import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  //const votes = Array(anecdotes.length).fill(0)
  const [votes, addVotes] = useState([])
  const [pop, setPop] = useState(0)
  console.log(votes)

  const getIndex = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
    updatePop()
  }

  const updateVotes = () => {
    if (votes.length===0){
      const temp = Array(anecdotes.length).fill(0)
      temp[selected] += 1
      addVotes(temp)
    }
    else {
      const copy = [...votes]
      copy[selected] += 1
      addVotes(copy)
    }
  }

  const updatePop = () => {
    for(var i = 0; i < votes.length-1; i++) {
      if(votes[i] > votes[pop]) {
        setPop(i)
      }
    }
    console.log(pop)
  }

  return (
    <div>
      <h1> Random Anecdote: </h1>
      <Button handleClick={getIndex} text={"Next"}/>
      {"\n"}
      <Button handleClick={updateVotes} text={"Vote"} />
      {"\n"}
      {anecdotes[selected]}
      <p>
        This anecdote has {votes[selected]} votes
      </p>
      <h1> Most Popular Anecdote: </h1>
      {anecdotes[pop]}
      <p>
        This anecdote has {votes[pop]} votes
      </p>
      
    </div>
  )
}

export default App
