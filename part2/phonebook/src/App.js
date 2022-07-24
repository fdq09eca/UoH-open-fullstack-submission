import { useState, useEffect  } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [showName, setShowName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function hook() {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
    
    axios.get('http://localhost:3001/persons').then(eventHandler)
  }

  useEffect(hook, [])

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