const Header = (props) => {
  
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
          {props.part} {props.exercises}
      </p>
    </>
    
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
)

const Course = ({course}) => { 
  return (
    <>
      <Header props={course}/>
      <Content props={course}/>
      <Total props={course}/>
    </>
    
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App