import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterVal, setFilterVal] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.some(p => p.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        axios
          .post('http://localhost:3001/persons', nameObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
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
