import React from "react";

const Title = ({courses}) => <h2>{courses.name}</h2>

const Content = ({part}) => {
    return(
    <div>
      {part.map(part =>
        <Part key={part.id} part={part}></Part>
      )}
    </div>
    )
}

const Part = ({part}) => {
  return (
    <p>{part.name}: {part.exercises}</p>
  )
}

const Total = ({part}) => {
  let total = part.reduce((acc,el) => acc + el.exercises, 0)
  return(
    <p><b>Total exercises: {total}</b>
    </p>
  )
}

const Courses = ({courses}) => {
  
  return(
    <div>
      <Title courses={courses}/>
      <Content part={courses.parts}/>
      <Total part={courses.parts}/>
    </div>
  )
}
 export default Courses