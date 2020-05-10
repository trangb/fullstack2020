import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const Countries = ({countries}) => {
    const [showDetails, setShowDetails] = useState([])
    const [prevListLength, setPrevListLength] = useState(countries.length)

    const handleClick = (totalLength, index) => {
        const newShowDetails = [];
        for (let i = 0; i < totalLength; i++) {
            newShowDetails[i] = false;
        }
        
        showDetails.length === newShowDetails.length 
            ? newShowDetails[index] = !showDetails[index]
            : newShowDetails[index] = true;
        setShowDetails(newShowDetails);
    }

    //if they reset the filter, then reset the showDetails list as well
    //so that country details don't show up for the new result set
    if (countries.length !== prevListLength) {
        const newShowDetails = [];
        for (let i = 0; i < prevListLength; i++) {
            newShowDetails[i] = false;
        }
        setShowDetails(newShowDetails);
        setPrevListLength(countries.length)
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length > 0) {
        return (
            <div>
                {countries.map((c, index) =>
                    <div key={c.alpha2Code}>
                        {c.name} 
                        <button onClick={()=> {
                            handleClick(countries.length, index)}
                        }>show</button>
                        {showDetails[index] === true && 
                            <CountryDetails toShow={[c]} />                        
                        }
                    </div>
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