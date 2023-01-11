const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => <li>{name} {exercises}</li>

// using a list feels neater
const Content = ({parts}) => 
  <ul>
    {parts.map((part) => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />)
    }
    <strong>
    {/* key doesn't get reused within same list */}
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

export default Course