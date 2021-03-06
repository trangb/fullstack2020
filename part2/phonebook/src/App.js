import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterVal, setFilterVal] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (newName) {
      if (persons.some(p => p.name === newName)) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber }
          console.log('before update')
          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
              setNewName('')
              setNewNumber('')

              setMessage(`Updated ${newName}`)
              setTimeout(() => {setMessage(null)}, 3000)
            })
            .catch(error => {
              setMessage(`Person validation failed: ${error.response.data.error}`)
              setMessageType('error')
              setTimeout(() => {setMessage(null)}, 3000)
            })
    
        } else {
          setNewName('')
          setNewNumber('')
        }
      } else {
        const nameObject = {
          name: newName,
          number: newNumber
        }

        personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')

            setMessage(`Added ${newName}`)
            setMessageType('info')
            setTimeout(() => {setMessage(null)}, 3000)
          })
          .catch(error => {
            setMessage(`Person validation failed: ${error.response.data.error}`)
            setMessageType('error')
            setTimeout(() => {setMessage(null)}, 3000)
          })

      }
    } else {
      alert('Enter a name')
      setNewNumber('')
    }
  }

  const deleteName = (id) => {
    const person = personsToShow.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(returned => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`${person.name} was already deleted`)
        })
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
      <Notification message={message} messageType={messageType} />

      <Filter handleFilter={handleFilter} filter={filterVal} />

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App
