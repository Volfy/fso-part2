const PersonForm = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber, handleChange}) => {
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
    return (
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
    )
  }

export default PersonForm