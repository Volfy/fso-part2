import {useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({nameFilter, handleChange}) => 
<form>
  find country:&nbsp;
    <input value={nameFilter} onChange={handleChange}/>
</form>

const Country = ({single, name, area, capital, flag, languages}) => {
  if (single) {
    return (
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
  } else return (<div>{name}</div>)
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

  const handleChange = (event) => {
    setNameFilter(event.target.value)
  }

  // console.log(countries)
/*persons
  .filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()))
  .map(x => <Number key={x.name} name={x.name} number={x.number}/>)
*/
  const matches = countries.filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <Filter nameFilter={nameFilter} handleChange={handleChange}/>
      {matches.length === 1
            ? <Country single={true} key={matches[0].name}
                name={matches[0].name} 
                capital={matches[0].capital}
                area={matches[0].area}
                languages={matches[0].languages}
                flag={matches[0].flag}/>
            : matches.length < 10 
                    ? matches.map(x => <Country key={x.name} name={x.name} />)
                    : <div>Too Many Matches</div>}
    </div>
  );
}

export default App;
