import React from 'react'

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length > 0) {
        return (
            <div>
                {countries.map(c =>
                    <div key={c.alpha2Code}>{c.name}</div>
                )}
            </div>
        )
    } else {
        return (
            
            <div></div>
        )
    }
}
export default Countries