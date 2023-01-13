import { useState } from 'react'

const Number = ({name}) => <li>{name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    // some validation
    if(!newName) {
      alert('No name given')
      return
    }

    // Not checking for case variations
    const isUnique = !persons.filter(p => p.name === newName).length 

    if (isUnique){
      const Name = {
        name: newName,
      }
      setPersons(persons.concat(Name))
      setNewName('')
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(x => <Number key={x.name} name={x.name}/>)}
      </ul>
    </div>
  )
}

export default App