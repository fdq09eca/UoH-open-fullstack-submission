import { useState } from 'react'

const Header = (props) => (<h1>{props.title}</h1>)

const StatItem = ({name, clickCount}) => (
  <tr><td>{name}</td><td>{clickCount}</td></tr>
)

const Statistics = (props) => (
      <table>
        <tbody>
          <StatItems feedbacks={props.feedbacks} summary={props.summary}/>
          <Summary summary = {props.summary}/>
        </tbody>
      </table>
)

const StatItems = (props) => {
  if (props.summary.all.value === 0) {
    return <tr>
        <td>No feedback given.</td>
      <td></td>
      </tr>
  }
  
  return (
    props.feedbacks.map(
      feedback => 
      <StatItem name={feedback.text} clickCount={feedback.clickCount}/>
      ) //map
    ) // return
}

const handleClick = (feedback, summary) => {
  const onClick = () => {
    feedback.setClickCountFunc(feedback.clickCount += 1)
    summary.all.setFunc(summary.all.value += 1)
    summary.totalFeedback.setFunc(summary.totalFeedback.value += feedback.value)
    summary.avg.setFunc(summary.totalFeedback.value / summary.all.value)
    summary.pos.setFunc(summary.good.value / summary.all.value)
    
  }
  return onClick
}

const Button = (props) => {
  return (<button  onClick = {handleClick(props.feedback, props.summary)}>{props.feedback.text}</button>)
}

const Buttons = (props) => {
  return (
    props.feedbacks.map(
      feedback => <Button key={feedback.text} feedback={feedback} summary={props.summary}/>) 
    )
}

const Summary = (props) => {
  if (props.summary.all.value === 0) {
    return 
  }
  return (<>
    <StatItem name={props.summary.all.text} clickCount={props.summary.all.value}/>
    <StatItem name={props.summary.avg.text} clickCount={props.summary.avg.value}/>
    <StatItem name={props.summary.pos.text} clickCount={props.summary.pos.value  * 100 + "%"}/>
  </>
  )
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [avg, setAvg] = useState("N/A")
  const [pos, setPos] = useState(0)

  const summary = {
    all:{
      text: "all",
      value: all,
      setFunc: setAll
    },

    good:{
      value: good,
    },
    
    totalFeedback: {
      text: "totalFeedback",
      value: totalFeedback,
      setFunc: setTotalFeedback
    },
    
    avg:{
      text: "avg",
      value: avg,
      setFunc: setAvg
    },

    pos:{
      text: "positive",
      value: pos,
      setFunc: setPos
    }
  }

  const feedbacks = [
    {
      text: "good",
      clickCount: good,
      setClickCountFunc: setGood,
      value:1,
    },
    
    {
      text: "neutral",
      clickCount: neutral,
      setClickCountFunc: setNeutral,
      value:0,
    },
    
    {
      text: "bad",
      clickCount: bad,
      setClickCountFunc: setBad,
      value: -1,
    }
  ]
  

  return (
    <>
      <Header title = "give feedback"/>
      <Buttons feedbacks = {feedbacks} summary = {summary}/>
      <Header title = "statistics"/>
      <Statistics feedbacks = {feedbacks} summary = {summary}/>
    </>
  )
}

export default App