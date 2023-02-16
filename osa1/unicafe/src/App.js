import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >
      {props.text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good===0 & neutral===0 & bad===0){
    return (
      <div>
        <h1> Statistics </h1>
        <p> No feedback given </p>
      </div>
    )
  }

  const average = (good * 1 + bad * -1) / (good+neutral+bad)
  const pos = good / (good+neutral+bad) * 100

  console.log("testing for warnings")

  return (
    <div>
      <h1> Statistics </h1>

      <table>
        <tbody>
          <tr>
            <td> Good: </td>
            <td> {good} </td>
          </tr>
          <tr>
            <td> Neutral: </td>
            <td> {neutral} </td>
          </tr>
          <tr>
            <td> Bad: </td>
            <td> {bad} </td>
          </tr>
          <tr>
            <td> Average: </td>
            <td> {average} </td>
          </tr>
          <tr>
            <td> Positive: </td>
            <td> {pos} </td>
            <td> % </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) =>  <p> {text} {value} </p> 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
