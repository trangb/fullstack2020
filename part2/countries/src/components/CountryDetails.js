import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ toShow }) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY  //defined in .env file at root of project
    const url = 'http://api.weatherstack.com/current' +
        '?access_key=' + api_key + '&query=' + toShow[0].name
    const hook = () => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }
    useEffect(hook, [])

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
                    <div>
                        {weather.current &&
                        <div>
                            <h3>Weather in {c.name}</h3>
                             <div><span style={{fontWeight: 'bold'}}>temperature: </span>{weather.current.temperature} celcius</div>
                             <div><img src={weather.current.weather_icons[0]} alt="weather_icon"/></div>
                             <div><span style={{fontWeight: 'bold'}}>wind: </span> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
                         </div> 
                          
                         
                        }
                    </div>

                </div>
            )}

        </div>
    )
}
export default CountryDetails