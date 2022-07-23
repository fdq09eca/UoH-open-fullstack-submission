import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [showName, setShowName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function onChangeNewName(event) {
    setNewName(event.target.value)
  }

  function onChangeShowName(event) {
    setShowName(event.target.value)
  }

  function onChangeNewNumber(event) {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  function resetInputs() {
    setNewName('')
    setNewNumber('')
  }

  function AddPerson(event) {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    resetInputs()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={showName} onChange={onChangeShowName} />
      <PersonForm
        onSubmit={AddPerson}
        nameValue={newName}
        numberValue={newNumber}
        onChangeNewName={onChangeNewName}
        onChangeNewNumber={onChangeNewNumber} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        predicateShowName={showName} />
    </div>
  )
}

export default App