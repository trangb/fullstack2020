import React, {useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => 
    <button onClick={handleClick}>{text}</button>;

const Title = ({text}) => <h1>{text}</h1>    

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral
  const average = total === 0 ? 0 : ((good*1) + (neutral*0) + (bad*-1))/total
  const positivePct = (total === 0 ? 0 : (good/total) * 100.0) + " %"

  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={total} />
      <Statistic text="average" value ={average} />
      <Statistic text="positive" value ={positivePct} />
    </div>
  )
}

const Statistic = (props) => <div>{props.text} {props.value}</div>

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={() => setGood(good+1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={() => setBad(bad+1)} text='bad'/>
      <Title text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))