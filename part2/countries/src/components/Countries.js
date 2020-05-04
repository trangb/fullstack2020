import React from 'react'

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(c =>
                    <div key={c.alpha2Code}>{c.name}</div>
                )}
            </div>
        )
    }
}
export default Countries