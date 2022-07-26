import './index.css'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import PersonService from './PersonService'
import Message from './Message'


const newPerson = (newName, newNumber) => ({ name: newName, number: newNumber })

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [showName, setShowName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageCls, setMessageCls] = useState('good_message')

  const getPersons = () => { PersonService.getAll().then(setPersons) }

  useEffect(getPersons, [])

  function onChangeNewName(event) {
    setNewName(event.target.value)
  }

  function onChangeShowName(event) {
    setShowName(event.target.value)
  }

  function onChangeNewNumber(event) {
    setNewNumber(event.target.value)
  }

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const setNofication = (message, isGoodMessage) => {
    setMessage(message)
    setMessageCls(isGoodMessage ? 'good_message' : 'bad_message')
    setTimeout(
      () => {
        setMessage(null)
      }, 5000
    )
  }

  function AddPerson(event) {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Name and number are required')
      return
    }

    const personExists = () => {
      getPersons()
      return persons.map(person => person.name).includes(newName)
    }

    if (personExists()) {
      if (window.confirm(`${newName} exists already, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        PersonService.replace(person.id, newPerson(newName, newNumber))
          .catch(error => setNofication(`Information of ${person.name} has been removed from server`, false))
          .finally(getPersons);
      }
    } else {
      const onSuccess = (person) => {
        setPersons(persons.concat(person))
        setNofication(`Added ${person.name}`, true)
        resetInputs()
      }

      const onError = (error) => { console.log(error) }

      PersonService.create(newPerson(newName, newNumber)).then(onSuccess, onError)
    }

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} messageClass={messageCls} />
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
        setPersons={setPersons}
        predicateShowName={showName}
      />
    </div>
  )
}

export default App


