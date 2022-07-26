import React from 'react'
import PersonService from './PersonService'

function DeleteButton({ person, setPersons }) {
  const onSuccess = (r) => {
    console.log(r)
    PersonService.getAll().then(setPersons)
  }

  const onFailure = (error) => { alert(error) }
  const onClick = () => {
    if (window.confirm(`Detele ${person.name}?`))
      PersonService.deletePerson(person.id).then(onSuccess, onFailure)
  }
  return <button onClick={onClick}>delete</button>
}

function Person({ person, setPersons }) {
  return <div>
    {person.name} {person.number} <DeleteButton person={person} setPersons={setPersons} />
  </div>
}

function Persons({ persons, setPersons, predicateShowName }) {
  return persons.filter(person =>
    person.name.toLowerCase().startsWith(predicateShowName.toLowerCase())
  ).map(person =>
    <Person key={person.name} person={person} setPersons={setPersons} />)
}
export default Persons