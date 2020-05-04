import React from 'react'

const Filter = (props) => {

  return (
    <div>
      <form>
        filter shown with
        <input
          value={props.filter}
          onChange={props.handleFilter} />
      </form>
    </div>
  )
}

export default Filter
