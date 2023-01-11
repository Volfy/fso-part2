const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => <li>{name} {exercises}</li>

const Content = ({parts}) => 
  <ul>
    {parts.map((part) => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />)
    }
    <strong>
      <Part key="-1" name="total exercises:" exercises=
        {parts.reduce((sum,index) => sum += index.exercises, 0)} 
      />
    </strong>
  </ul>

const Course = ({course}) => 
  <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
  </>


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
      },
      {
        name: 'test',
        exercises: 14,
        id: 4
      }
    ]
  }

  return <Course key={course.id} course={course} />
}

export default App