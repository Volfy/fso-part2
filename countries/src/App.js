import {useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({nameFilter, handleChange}) => 
<form>
  find country:&nbsp;
    <input value={nameFilter} onChange={handleChange}/>
</form>

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
