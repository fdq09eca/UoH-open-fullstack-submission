import React from 'react'

function TotalExercises({ parts }) {
    const totalNumEx = parts.reduce((totalex, part) => totalex + part.exercises, 0)
    return <b>total of {totalNumEx} exercises</b>
}

function Part({ part }) {
    return <p key={part.id}>{part.name} {part.exercises}</p>
}

function Course({ course }) {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
            <TotalExercises parts={course.parts} />
        </div>
    )
}

export default Course