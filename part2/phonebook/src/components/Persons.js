import React from 'react'
import Person from './Person'

const Persons = ({personsToShow}) => {
  return (
    <div>
    {personsToShow.map(p =>
      <Person key={p.name} person={p} />
    )}
    </div>
  )
}

export default Persons
