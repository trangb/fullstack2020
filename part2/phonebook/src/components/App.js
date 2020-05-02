import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.some(p => p.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({ name: newName }))
        setNewName('')
        }
    }
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      {/* <div>debug: {newName}</div> */ }
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p =>
        <Person key={p.name} name={p.name} />
      )}
    </div>
  )
}

const Person = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

export default App