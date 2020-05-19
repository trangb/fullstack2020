import React from 'react'


const infoStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle : 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const errorStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle : 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ message, messageType }) => {
    if (!message) {
        return null
    }

    return (
        <div style={messageType === 'error' ? errorStyle : infoStyle}>
            {message}
        </div>
    )
}

export default Notification