import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  // id unnecessary as names are always unique
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const handleChange = (event, passFn) => {
    passFn(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} handleChange={handleChange}/>
      <h2>Add New Contact</h2>
      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        handleChange={handleChange}
      />
      <h2>Contact List</h2>
      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App