import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

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
      <Filter handleFilter={handleFilter} filter={filterVal} />

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
