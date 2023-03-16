const Header = (props) => {
    return (
      <div>
        <h2> {props.name} </h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        {props.course.parts.map(part => 
          <Part key={part.id} part={part} />)}
        <Total course={props.course} />
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    const exercises = props.course.parts.map(part => part.exercises)
    const i = 0
    console.log(exercises)
    return (
      <div>
        <b>
          Total of exercises {exercises.reduce((add,current) => add+current, i)}
        </b>
      </div>
    )
  }
  
  const Course = ({courses}) => {
    console.log(courses)
    return (
      <div>
        {courses.map(course =>
          <Content key={course.id} course={course} />)}
      </div>
    )
  }

  export default Course