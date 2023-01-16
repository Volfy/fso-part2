import {useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({nameFilter, handleChange}) => 
<form>
  find country:&nbsp;
    <input value={nameFilter} onChange={handleChange}/>
</form>

const Weather = ({capital}) => {
  // unsure if this is good practice 
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        const x = {
        wind: response.data.wind.speed.toFixed(2),
        temp: (response.data.main.temp - 273.15).toFixed(2),
        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        alt: response.data.weather[0].description
      }
      setWeather(x)
    })
  }, [])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.temp} Celsius</div>
      <img src={weather.icon} alt={weather.alt} />
      <div>wind {weather.wind} m/s</div>
    </div>)
}

const FullCountry = ({name, area, capital, flag, languages}) => (
  <div>
    <h2>{name}</h2>
    <div>capital {capital}</div>
    <div>area {area}</div>
    <div>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(x => <li key={x}>{x}</li>)}
      </ul> 
    </div>
    <img src={flag} alt="flag" />
    <Weather capital={capital} />
  </div>
)

const CollapseCountry = ({name, handleShow}) => (
  <div>
    {name} &nbsp;
    <button onClick={handleShow} country={name}>show</button>
  </div>
)

const Countries = ({matches, handleShow}) => {
  if (matches.length === 0) {return <div>No Matches</div>}
  else if (matches.length > 10) {return <div>Too Many Matches</div>}
  else if (matches.length === 1) {
    return <FullCountry 
      key={matches[0].name}
      name={matches[0].name} 
      capital={matches[0].capital}
      area={matches[0].area}
      languages={matches[0].languages}
      flag={matches[0].flag}
    />
  } else {
    return matches.map(x => 
      <CollapseCountry key={x.name} name={x.name} handleShow={handleShow}/>
    )
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const x = response.data.map(c => {
          return {
            name: c.name.common, 
            area: c.area,
            capital: c.capital ? c.capital[0] : undefined,
            languages: c.languages,
            flag: c.flags.png,
            key: c.name.common
          }
        })
        setCountries(x)
      })
  }, [])

  let matches = countries.filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleChange = (event) => {
    setNameFilter(event.target.value)
  }

  // not ideal but it works....
  // will never show eg. Sudan. 
  const handleShow = (event) => {
    setNameFilter(event.target.getAttribute('country'))
  }

  return (
    <div>
      <Filter nameFilter={nameFilter} handleChange={handleChange}/>
      <Countries matches={matches} handleShow={handleShow}/> 
    </div>
  );
}

export default App;
