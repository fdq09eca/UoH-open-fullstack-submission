const Header = (props) => (<h1>{props.course.name}</h1>)
const Part = (props) => {
  console.log(props.name)
  return (<p>{props.name} {props.exercises}</p>)
}

const Content = (props) => {
  return (
    props.parts.map( part => <Part name = {part.name} exercises = {part.exercises}/>)
  )
}

function ex_sum(ex1, ex2, ex3){
  return ex1 + ex2 + ex3
}

const Total = (props) => {
  const [ex1, ex2, ex3] = props.parts.map(part => part.exercises)
  
  return (<p>Number of exercises {ex_sum(ex1, ex2, ex3)}</p>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}

export default App