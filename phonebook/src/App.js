import { useState, useEffect } from 'react'
import phServ from './services/phones'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const handleChange = (event, passFn) => {
    passFn(event.target.value)
  }

  useEffect(() => {
    //backend */
    phServ
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    // some validation
    if(!newName || !newNumber) {
      alert('Missing Values')
      return
    }

    // Duplicate Numbers should be fine.
    // not validating inputs thoroughly

    const isUnique = !persons.filter(p => p.name === newName).length 

    if (isUnique){
      const Person = {
        name: newName,
        number: newNumber,
      }

      phServ
        .addNew(Person)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })  
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        nameFilter={nameFilter} 
        setNameFilter={setNameFilter} 
        handleChange={handleChange}
      />
      <h2>Add New Contact</h2>
      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        handleChange={handleChange}
        addPerson={addPerson}
      />
      <h2>Contact List</h2>
      <Persons 
        persons={persons} 
        nameFilter={nameFilter}
      />
    </div>
  )
}

export default App