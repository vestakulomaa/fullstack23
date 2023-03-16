import { useEffect, useState } from 'react'
import axios from 'axios'
import persons from './services/persons'
import personService from './services/persons'


const Name = (props) => {
  return (
    <div>
      {props.name} {props.num} {"\t"}
      <button id={props.name} onClick={props.onClick} type="submit">Delete</button>
    </div>
  )
}

const Show = ({persons, newInput, onClick}) => {
  if(newInput === ""){
    return (
      persons.map(person =>
        <Name key={person.name} name={person.name} num={person.number} onClick={onClick}/>)
    )
  }
  else {
    const temp = persons.filter(person => person.name.toLowerCase().includes(newInput.toLowerCase()))
    return (
      temp.map(person =>
        <Name key={person.name} name={person.name} num={person.number} />)
    )
  }
}

const Find = (props) => {
  return (
    <div> Find: <input type="text" onChange={props.onChange} /> </div>
  )
}

const Error = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className="error">
       {message}
    </div>
  )
}

const Notif = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className="notif">
      {message}
    </div>
  )
}


const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newInput, setNewInput] = useState('')
  const [notifMessage, setNotif] = useState(null)
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(exists)) {
      console.log(newName)
      const id = persons.find(name => name.name === newName).id
      console.log("id", id)
      updateNumber(id)
    }
    else  {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .then(returnedPerson => {
          setNotif(`${newName} added succesfully!`)
          setTimeout(() => {
            setNotif(null)
          }, 2000)
        })
        .catch(error => {
          setError(`Something went wrong with adding ${newName}`)
          setTimeout( () => {
            setError(null)
          }, 2000)
        })
    }

  }

  const deleteName = (event) => {
    const id = persons.find(name => event.target.id === name.name)
    event.preventDefault()
    console.log("delete clicked")
    if(window.confirm(`Delete ${event.target.id} ?`)) {
      personService
        .deletePerson(id.id)
        .then(returned => {
          setPersons(persons.filter(person => person.name !== event.target.id))
        })
        .then(returned => {
          setNotif(`${event.target.id} deleted succesfully!`)
          setTimeout(() => {
            setNotif(null)
          }, 2000)
        })
        .catch(error => {
          setError(`There is no ${event.target.id} on the phonebook`)
          setTimeout( () => {
            setError(null)
          }, 2000)
        })
    }
  }

  const updateNumber = (id) => {
    console.log(persons)
    if(window.confirm(`Update the number for ${newName}`)) {
      const numberChange = {
        name: newName,
        number: newNumber,
        id: id}
      personService
        .update(id, numberChange)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
        .then(returnedPerson => {
          setNotif(`${newName}'s number updated succesfully!`)
          setTimeout(() => {
            setNotif(null)
          }, 2000)
        })
        .catch(error => {
          setError(`Something went wrong with updating ${newName}'s number`)
          setTimeout( () => {
            setError(null)}, 2000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInput = (event) => {
    setNewInput(event.target.value)
  }

  function exists(name) {
    return name.name === newName
  }



  return (
    <div>
      <Notif message={notifMessage} />
      <Error message={errorMessage} />
      <h2>Phonebook</h2>
      <Find onChange={handleInput} newInput={newInput} />
      <h2> Add New </h2>
      <form onSubmit={addName}>
        <div> Name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> Number: <input value={newNumber} onChange={handleNumChange} /> </div>
        <div> <button onClick={addName} type="submit">Add</button> </div>
      </form>
      <h2>Numbers</h2>
      <Show persons={persons} newInput={newInput} onClick={deleteName}/>
    </div>
  )

}

export default App
