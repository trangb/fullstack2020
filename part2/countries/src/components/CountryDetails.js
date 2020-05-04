import React from 'react'

const CountryDetails = ({toShow}) => {
    return (
        <div>
            {toShow.map(c =>
                <div key={c.alpha2Code}>
                    <h2>{c.name}</h2>
                    <div>capital {c.capital}</div>
                    <div>population {c.population}</div>
                    <h3>languages</h3>
                    <ul>
                        {c.languages.map(l =>
                            <li key={l.iso639_2}>{l.name}</li>
                        )}
                    </ul>
                    <img src={c.flag} alt="flag" width="25%" height="25%" />
                </div>
            )}
        </div>
    )
}
export default CountryDetails