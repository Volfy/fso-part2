import {useEffect, useState} from 'react'
import axios from 'axios'

const Filter = ({nameFilter, handleChange}) => 
<form>
  find country:&nbsp;
    <input value={nameFilter} onChange={handleChange}/>
</form>


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
            flag: c.flags.png
          }
        })
        setCountries(x)
      })
  }, [])

  const handleChange = (event) => {
    setNameFilter(event.target.value)
  }

  // console.log(countries)
 

  return (
    <div>
      <Filter nameFilter={nameFilter} handleChange={handleChange}/>
    </div>
  );
}

export default App;
