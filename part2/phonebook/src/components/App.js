import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Art1 Hellas1', number: '0023-14567' },
    { name: 'Blander Hellas', number: '004-1234567' },
    { name: 'Carto Sellas', number: '40-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterVal, setFilterVal] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.some(p => p.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewName('')
        setNewNumber('')
      }
    } else {
      alert('Enter a name')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const personsToShow = showAll ? 
    persons : persons.filter(p => {
      console.log(filterVal.toUpperCase())
      return p.name.toUpperCase().includes(filterVal.toUpperCase())
    });

  const handleFilter = (event) => {
    setFilterVal(event.target.value)
    if (filterVal) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input 
          value={filterVal}
          onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
      <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(p =>
        <Person key={p.name} person={p} />
      )}
    </div>
  )
}

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

export default App