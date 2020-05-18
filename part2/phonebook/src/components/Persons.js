import React from 'react'
import Person from './Person'

const Persons = ({personsToShow, deleteName}) => {

  return (
    <div>
    {personsToShow.map(p =>
      <Person key={p.name} person={p} deletePerson={() => deleteName(p.id)}/>
    )}
    </div>
  )
}

export default Persons
