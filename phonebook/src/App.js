import { useState } from 'react'

const Number = ({name, number}) => <li>{name} {number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
      setPersons(persons.concat(Person))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  const handleChange = (event, passFn) => {
    passFn(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <form>
          filter numbers by name:&nbsp;
            <input value={nameFilter} onChange={(event) => 
            handleChange(event, setNameFilter)}/>
        </form>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event) => 
            handleChange(event, setNewName)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => 
            handleChange(event, setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contact List</h2>
      <ul>
        {persons
          .filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()))
          .map(x => <Number key={x.name} name={x.name} number={x.number}/>)
        }
      </ul>
    </div>
  )
}

export default App