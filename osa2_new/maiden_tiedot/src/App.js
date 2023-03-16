import {useEffect, useState} from 'react'
import axios from 'axios'


const Find = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit} >
        Find countries: <input onChange={props.onChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

const App = () => {
  const [newCountry, setCountry] = useState("")
  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])
  const baseUrl = `https://restcountries.com/v3.1/`

  useEffect(() => {
    axios
      .get(baseUrl + "all")
      .then(response => {
        const data = response.data
        //console.log(data[0])
        console.log("saved countries")
      })
      .catch(error => {
        console.log("There was an error in fetching countries:", error)
      })
  }, )

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  return (
    <div>
      <Find onSubmit={onSearch} onChange={handleChange} />
    </div>
  )
}

export default App;
