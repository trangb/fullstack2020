import React from 'react'


const msgStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle : 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ message }) => {
    if (!message) {
        return null
    }

    return (
        <div style={msgStyle}>
            {message}
        </div>
    )
}

export default Notification