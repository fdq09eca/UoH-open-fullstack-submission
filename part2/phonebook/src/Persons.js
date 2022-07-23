import React from 'react'
function Person({ person }) {
  return <p>{person.name} {person.number}</p>
}

function Persons({ persons, predicateShowName }) {
    return persons.filter(person =>
      person.name.toLowerCase().startsWith(predicateShowName.toLowerCase())
    ).map(person =>
      <Person key={person.name} person={person} />)
  }
  export default Persons