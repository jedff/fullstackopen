import React, { useState , useEffect } from 'react';
import Filter from './Components/Filter';
import Numbers from './Components/Numbers'
import PersonForm from './Components/PersonForm';
import Notification from './Components/Notification';
import { getAll, addNew, deletePerson, updatePerson } from './Services/Persons';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getAll()
    .then(persons => {
      setPersons(persons)
    })
  }, [])

  const addnewName = (event) => {
    event.preventDefault()
    const newNameObject = {
      name:  newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newNameObject.name))
    {
      if(window.confirm(`${newNameObject.name} is already added, replace the number?`))
      {
        const person = persons.find(n => n.name === newNameObject.name)
        const updatedPerson = {...person, number: newNumber}
        console.log(updatedPerson)
        updatePerson(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response)
          if(error.response.status === 404) {
            setErrorMsg(`${person.name} was already deleted from the phonebook`)
            setPersons(persons.filter(p => p.id !== person.id))
          }else {
            setErrorMsg(error.response.data.error)
          }
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })
      }
    }
    else {
      addNew(newNameObject)
      .then(newPerson => {
        setPersons([...persons, newPerson])
        setNewName('')
        setNewNumber('')
        setSuccessMsg(`${newNameObject.name} was successfully added`);
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      }).catch(error => {
        setErrorMsg(error.response.data.error)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
    }
   
  }

  const handleDelete = (event) => {
    if (window.confirm(`Deseas borrar a ${event.target.dataset.name}`))
    {
      deletePerson(event.target.dataset.id)
      setPersons(persons.filter(person => person.id !== event.target.dataset.id))
    }
  }
   
  const handlenNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlenNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification classname='success' message={successMsg} />
      <Notification classname='error' message={errorMsg} />
      <h3>Filter</h3>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h3>Add new</h3>
      <PersonForm addnewName={addnewName} newName={newName} newNumber={newNumber}
      handlenNameChange={handlenNameChange} handlenNumberChange={handlenNumberChange} />
      <h3>Numbers</h3>
      <Numbers persons={persons} newSearch={newSearch} handleDelete={handleDelete}></Numbers>
    </div>
  );
}

export default App;
